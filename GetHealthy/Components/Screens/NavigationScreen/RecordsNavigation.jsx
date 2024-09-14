import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import RecordDetailsScreen from '../RecordDetailsScreen/RecordDetailsScreen';
import AddEventScreen from '../RecordDetailsScreen/AddEventScreen'
import AddRecordsScreen from '../RecordsScreen/AddRecordsScreen';

const Stack = createStackNavigator();

export default function RecordsNavigation() {
  return (
   <Stack.Navigator screenOptions={{
    headerShown: false
   }}>
    <Stack.Screen name='record' component={AddRecordsScreen}/>
    <Stack.Screen name='recordDetails' component={RecordDetailsScreen}/>
    <Stack.Screen name='addEvent' component={AddEventScreen}/>
   </Stack.Navigator>
  )
}