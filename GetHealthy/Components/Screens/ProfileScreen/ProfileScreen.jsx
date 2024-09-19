import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useAuth } from '../AuthenticationScreen/AuthProvider';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen({ navigation }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await SecureStore.getItemAsync('userData'); // Get user data from SecureStore
        if (userData) {
          setUser(JSON.parse(userData)); // Parse and set user data
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData(); // Call the function to load user data when the component mounts
  }, []); // Empty dependency array to ensure it only runs once on mount

  const handleSignOut = () => {
    SecureStore.setItemAsync('authToken', '');
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user?.profileImage || 'https://via.placeholder.com/150' }} // Use user's profile image or placeholder
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.name || 'John Doe'}</Text>
        <Text style={styles.profileUsername}>@{user?.username || 'johndoe'}</Text>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.row}>
          <FontAwesome name="envelope" size={20} color={Colors.DARK_GREY} />
          <Text style={styles.detailText}>{user?.email || 'johndoe@example.com'}</Text>
        </View>
        <View style={styles.row}>
          <Feather name="map-pin" size={20} color={Colors.DARK_GREY} />
          <Text style={styles.detailText}>{user?.location || 'Cameroon'}</Text>
        </View>
      </View>

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
