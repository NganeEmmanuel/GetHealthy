import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';

const PartialRecordsDetailsScreen = ({ record, onPress, onLongPress }) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.card}>
        <Text style={styles.recordHeading}>{record.illnessName}</Text>
        {record?.illnessStatus  == 'ONGOING'&&<View style={styles.statusContainerOngoing}>
          <Text style={styles.statusText}>{record.illnessStatus}</Text>
        </View>}
        {record?.illnessStatus  == 'ENDED'&&<View style={styles.statusContainerCompleted}>
          <Text style={styles.statusText}>{record.illnessStatus}</Text>
        </View>}
        <Text style={styles.locationText}>{record.illnessLocation}</Text>
        <Text style={styles.startDateText}>Start date: {record.illnessStartDate}</Text>
        <Text style={styles.descriptionText}>{record.illnessDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: Colors.WHITE
  },
  recordHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
  statusContainerOngoing: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statusContainerCompleted: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.SUCCESS,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: Colors.GREY,
  },
  startDateText: {
    fontSize: 14,
    color: Colors.GREY,
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.GREY,
    marginTop: 5,
  },
});

export default PartialRecordsDetailsScreen;
