import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/HomeScreen';
import RecordDetailsScreen from '../RecordDetailsScreen/RecordDetailsScreen';
import AddEventScreen from '../RecordDetailsScreen/AddEventScreen'
import SearchScreen from '../SearchScreen/SearchScreen';
import EditRecordScreen from '../ShowRecordsScreen/EditRecordScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
   <Stack.Navigator screenOptions={{
    headerShown: false
   }}>
    <Stack.Screen name='home' component={HomeScreen}/>
    <Stack.Screen name='recordDetails' component={RecordDetailsScreen}/>
    <Stack.Screen name='addEvent' component={AddEventScreen}/>
    <Stack.Screen name='search' component={SearchScreen}/>
    <Stack.Screen name='edit-record' component={EditRecordScreen}/>
   </Stack.Navigator>
  )
}