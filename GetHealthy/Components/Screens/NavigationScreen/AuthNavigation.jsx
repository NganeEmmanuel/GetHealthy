import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../AuthenticationScreen/LoginScreen';
import SignupScreen from '../AuthenticationScreen/SignupScreen';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
