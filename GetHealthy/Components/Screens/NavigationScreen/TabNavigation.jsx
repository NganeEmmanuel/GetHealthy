import {Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeNavigation from './HomeNavigation';
import Colors from '../../Utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import RecordsNavigation from './RecordsNavigation';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        initialRouteName:"Home",
        headerShown: false
    }}>
        <Tab.Screen name='Home' component={HomeNavigation} options={{
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Home</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="home" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='records' component={RecordsNavigation} options={{
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Add Records</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome5 name="file-medical" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='Profile' component={ProfileScreen} options={{
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Profile</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="user-circle" size={size} color={color} />
            )
        }}/>
    </Tab.Navigator>
  )
}