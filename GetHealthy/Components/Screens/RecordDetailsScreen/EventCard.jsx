import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import StatusTag from './StatusTag';
import Colors from '../../Utils/Colors';

export default function EventCard({ title, type, location, status, description, startDate, onEventPress }) {
    const [showMore, setShowMore] = useState(false);
  
    const truncatedDescription = description.length > 100 && !showMore
      ? `${description.substring(0, 100)}... `
      : description;
  
    return (
      <TouchableOpacity onPress={onEventPress} style={styles.eventContainer}>
        <View style={{ borderBottomWidth: 1, borderColor: '#ddd', padding: 20 }}>
          <Text style={styles.eventTitle}>{title}</Text>
          {type&&<Text style={styles.otherText}>Type: {type}</Text>}
          {location&&<Text style={styles.otherText}>Location: {location}</Text>}
          <Text style={styles.otherText}>Start: {startDate}</Text>
          <Text style={styles.otherText}>
            {truncatedDescription}
            {description.length > 100 && !showMore && (
              <Text onPress={() => setShowMore(true)} style={{ color: Colors.PRIMARY }}>Read more</Text>
            )}
          </Text>
          <View style={styles.eventStatusContainer}>
            <Text style={styles.otherText}>Health Status:</Text>
            <StatusTag status={status} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    eventContainer: {
        backgroundColor: Colors.WHITE,
        marginVertical: 10,
        borderRadius: 10
    },

    eventTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        color: 'black'
    },

    otherText: {
        fontFamily: 'outfit',
        fontSize: 15,
        color: Colors.GREY
    },

    eventStatusContainer : {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
  })
  