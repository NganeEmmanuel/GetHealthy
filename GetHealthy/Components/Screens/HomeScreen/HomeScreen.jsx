import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderScreen from '../HeaderScreen/HeaderScreen';
import ShowRecordsScreen from '../ShowRecordsScreen/ShowRecordsScreen';
import GlobalAPI from '../../Utils/GlobalAPI'; // Import the API functions
import * as SecureStore from 'expo-secure-store';
import Colors from '../../Utils/Colors';
import Toast from 'react-native-toast-message';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null); // State to store user data
  const [illnessRecords, setIllnessRecords] = useState([])

  const fetchUserData = async () => {
    try {
      const userData = await GlobalAPI.getLoggedInUser(); // Fetch the logged-in user
      
      // Save the user data in secure storage for access throughout the app
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
      
      // Set user data in the component state
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getIlnnesRecordsForUser = async () => {
    try {
      const recordData = await GlobalAPI.getIllnessRecordsForUser().then(resp => {
        // Check if resp is an array and has data
        if (Array.isArray(resp) && resp.length > 0) {
          setIllnessRecords(resp);
        } else if(Array.isArray(resp) && resp.length == 0){
          setIllnessRecords(resp);
        } else {
          return;
        }
      }).catch(error => {
        return;
      });
    } catch (error) {
      console.error('Error getting illness records:', error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
    getIlnnesRecordsForUser();
  }, [illnessRecords]);


  return (
    <View style={styles.container}>
      <HeaderScreen
        fullName={user ? user?.name : 'John Doe'} // Display user's full name if available
        onRecordsPress={() => navigation.navigate('records')}
        onProfilePress={() => navigation.navigate('Profile')}
      />

      {
        illnessRecords.length > 0?
          <ShowRecordsScreen 
            records={illnessRecords} 
            onRecordPress={(record) => navigation.navigate('recordDetails', { record })} 
          />
        : 

        <Text style={{color: Colors.GREY, marginTop: 50, textAlign: 'center'}}>No record to display please add record</Text>
      }

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
