import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import GlobalAPI from '../../Utils/GlobalAPI';

export default function AddRecordsScreen() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation()

  // For dropdown state
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Ongoing', value: 'ONGOING' },
    { label: 'Ended', value: 'ENDED' }
  ]);

  const handleConfirmDate = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setStartDate(format(date, 'dd MMM yyyy')); // Set formatted date
    } else {
      console.error('Invalid date selected');
    }
    hideDatePicker()
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSubmit = () => {
    // setLoading(true);
    // Validation
    if (!name || !startDate || !location || !status || !description) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required!',
      });
      return;
    }

    const recordData = {
      illnessName: name,
      illnessStartDate: startDate,
      illnessDescription: description,
      illnessStatus: status,
      illnessLocation: location
    }
    
    GlobalAPI.addRecord(recordData).then(resp => {
      Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'record added successfully!',
        });
        // clearForm()
        setLoading(false)
        navigation.push('recordDetails', {record: resp})

  }).catch(err => {
      Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong! Please check internet connection and try again',
      });
      setLoading(false)
      return;
  })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Record</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text>{startDate ? `Start Date: ${startDate}` : 'Select Start Date'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <DropDownPicker
        open={open}
        value={status}
        items={items}
        setOpen={setOpen}
        setValue={setStatus}
        setItems={setItems}
        placeholder="Select Status"
        style={styles.dropdown}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {loading && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        </Modal>
      )}

      {/* Toast for success/error messages */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
  dropdown: {
    marginVertical: 10,
    borderColor: Colors.LIGHT_GREY,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
