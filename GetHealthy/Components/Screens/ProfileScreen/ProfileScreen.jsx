import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors'; // Assuming you have a Colors utility

export default function ProfileScreen({ navigation }) {

  const handleSignOut = () => {
    // Handle sign out logic here (add actual functionality later)
    console.log('User signed out');
    // Navigate to login screen after sign out
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with user's profile image URL if available
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileUsername}>@johndoe</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetails}>
        <View style={styles.row}>
          <FontAwesome name="envelope" size={20} color={Colors.DARK_GREY} />
          <Text style={styles.detailText}>johndoe@example.com</Text>
        </View>
        <View style={styles.row}>
          <Feather name="map-pin" size={20} color={Colors.DARK_GREY} />
          <Text style={styles.detailText}>New York, USA</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="date-range" size={20} color={Colors.DARK_GREY} />
          <Text style={styles.detailText}>Joined on Jan 15, 2024</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  profileUsername: {
    fontSize: 16,
    color: Colors.GREY,
  },
  profileDetails: {
    width: '100%',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    color: Colors.DARK_GREY,
    marginLeft: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: Colors.SECONDARY,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
