import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';

export default function StatusTag({ status }) {
    let backgroundColor;
    
    switch(status) {
      case 'ONGOING':
        backgroundColor = Colors.SECONDARY;
        break;
      case 'ENDED':
        backgroundColor = Colors.SUCCESS;
        break;
      case 'Chronic':
        backgroundColor = 'red';
        break;
      case 'BETTER':
        backgroundColor = Colors.PRIMARY;
        break;
      case 'MILDLY_BAD':
        backgroundColor = Colors.WARNING;
        break;
      default:
        backgroundColor = 'gray';
    }
  
    return (
      <View style={{ backgroundColor, padding: 8, paddingVertical: 5, borderRadius: 5, alignSelf: 'flex-start' }}>
        <Text style={{ color: 'white' }}>{status}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    
  })
  