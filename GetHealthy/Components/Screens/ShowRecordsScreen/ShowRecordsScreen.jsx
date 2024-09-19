import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View} from 'react-native';
import PartialRecordsDetailsScreen from './PartialRecordsDetailsScreen';
import Colors from '../../Utils/Colors';
import RecordActionModal from './RecordActionModal';
import Toast from 'react-native-toast-message';
import GlobalAPI from '../../Utils/GlobalAPI';

const ShowRecordsScreen = ({ records, onRecordPress }) => {
  const [modalRecord, setModalRecord] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  /**
   * Opens the modal for record action
   */
  const openModal = (record) => {
    setModalRecord(record);
    setIsModalVisible(true);
  };

  /**
   * Closes the modal for record action
   */
  const closeModal = () => {
    setIsModalVisible(false);
    setModalRecord(null);
  };

  /**
   * 
   * @param {*} deletRecord Record object to be deleted
   * @throws and error if not successfull
   */
  const handleDeleteRecord = (deleteRecord) => {
    setIsLoading(true)
    GlobalAPI.deleteRecord(deleteRecord?.id).then(resp => {
      if(!resp) {
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong please check internet connection and try again',
        });
        return
      }

      setIsLoading(false)
      closeModal()

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'record deleted successfully!',
      });

    }).catch(err => {
      setIsLoading(false)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong please check internet connection and try again',
      });
    })
  }

  /**
   * Updates the status of the selected record in the database
   * 
   * @param {*} recordToUpdate record object to be updated
   * @param {*} status the new status you want to update to
   * @throws an error if not success full
   */
  const handleRecordStatusChnange = (recordToUpdate, status) => {
    setIsLoading(true)
    Object.defineProperty(recordToUpdate, "illnessStatus", {value: status})
    GlobalAPI.editRecord(recordToUpdate).then(resp => {
      if(!resp){
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong please check internet connection and try again',
        });

        return;
      }
      setIsLoading(false)
      closeModal()
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Record Status changed successfully!',
      });
    }).catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong please check internet connection and try again',
      });
      return;
    })
    setIsLoading(false)
    return;
  }

  return (
      <ScrollView>
        {records? <FlatList
          data={records}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <PartialRecordsDetailsScreen 
              record={item} 
              onPress={() => onRecordPress(item)}
              onLongPress={() => openModal(item)}
            />
          )}
          contentContainerStyle={styles.container}
        />
          :
            <Text style={styles.noRecords}>You have no records yet Add Records to view</Text>
      }

      {/* record action modal section  */}
      <RecordActionModal 
        record={modalRecord}
        isVisible={isModalVisible}
        onClose={closeModal}
        onDelete={handleDeleteRecord}
        onStatusChange={handleRecordStatusChnange}
        isLoading={isLoading}
      />

       {/* Toast for success/error messages */}
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
