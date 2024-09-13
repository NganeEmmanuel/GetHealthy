import { Text, Animated, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons'; // For back and close icons
import StatusTag from './StatusTag';
import { useNavigation } from '@react-navigation/native';

export default function IllnessRecord({ title, status, description }) {
    const [collapsed, setCollapsed] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
  

  
    return (
      <Animated.View style={{paddingHorizontal: 16, padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#ddd'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>
            <StatusTag status={status} />
        </View>
        {!collapsed && <Text>{description}</Text>}
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },

    backArrow: {
        marginVertical: 10
    }
  })
  