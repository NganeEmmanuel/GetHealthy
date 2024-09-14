import React from 'react';
import { FlatList, ScrollView, StyleSheet, View} from 'react-native';
import PartialRecordsDetailsScreen from './PartialRecordsDetailsScreen';
import Colors from '../../Utils/Colors';

const ShowRecordsScreen = ({ records, onRecordPress }) => {
  return (
    <ScrollView>
      {records? <FlatList
        data={records}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <PartialRecordsDetailsScreen 
            record={item} 
            onPress={() => onRecordPress(item)} 
          />
        )}
        contentContainerStyle={styles.container}
      />
        :
          <Text style={styles.noRecords}>You have no records yet Add Records to view</Text>
    }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
  },

  noRecords: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    color: Colors.GREY
  }
});

export default ShowRecordsScreen;
