import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AuthLoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Retrieve the JWT token from cache
        const token = await AsyncStorage.getItem('auth');

        if (token) {
          // Verify token with backend
          const response = await axios.get('https://your-api.com/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            // Token is valid, redirect to Home
            navigation.replace('Home');
          } else {
            // Token is invalid, redirect to SignIn
            navigation.replace('SignIn');
          }
        } else {
          // No token found, redirect to SignIn
          navigation.replace('SignIn');
        }
      } catch (error) {
        console.log(error);
        // Redirect to SignIn in case of any error
        navigation.replace('SignIn');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
};

export default AuthLoadingScreen;
