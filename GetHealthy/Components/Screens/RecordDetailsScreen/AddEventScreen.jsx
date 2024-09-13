import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { Picker } from '@react-native-picker/picker'; // For dropdown selection
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import DateTimePickerModal
import { format } from 'date-fns'; // Import format from date-fns
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import GlobalAPI from '../../Utils/GlobalAPI';

export default function AddEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const param = useRoute().params;

  const handleAddEvent = () => {
    setLoading(true);
    
    if(!title || !type || !description || ! location || !startDate || ! healthStatus){
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'All fields are required!',
        });
        setLoading(false)
        return;
    }
  
    const eventData = {
      recordID: param?.recordID,
      title,
      eventType: type,
      description,
      location,
      startDate,
      healthStatus,
    };
  
    GlobalAPI.addEvent(eventData).then(resp => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Event added successfully!',
          });
          clearForm()
          setLoading(false)
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

  const clearForm = () => {
    setTitle('')
    setType('')
    setLocation('')
    setStartDate('')
    setDescription('')
    setHealthStatus('')
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setStartDate(format(date, 'dd MMM yyyy')); // Set formatted date
    } else {
      console.error('Invalid date selected');
    }
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Event</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
        <View style={styles.picker}>
          <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)} style={{ color: Colors.GREY }}>
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="SYMPTOM" value="SYMPTOM" />
            <Picker.Item label="HOSPITAL_VISIT" value="HOSPITAL_VISIT" />
            <Picker.Item label="MEDICATION_ADMINISTRATION" value="MEDICATION_ADMINISTRATION" />
            <Picker.Item label="FIRST_AID" value="FIRST_AID" />
          </Picker>
        </View>
        <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text>{startDate || "Select Start Date"}</Text>
        </TouchableOpacity>
        <View style={styles.picker}>
          <Picker selectedValue={healthStatus} onValueChange={(itemValue) => setHealthStatus(itemValue)} style={{ color: Colors.GREY }}>
            <Picker.Item label="Select Health Status" value="" />
            <Picker.Item label="MILDLY_BAD" value="MILDLY_BAD" />
            <Picker.Item label="BAD" value="BAD" />
            <Picker.Item label="CHRONIC" value="CHRONIC" />
            <Picker.Item label="MILDLY_BETTER" value="MILDLY_BETTER" />
            <Picker.Item label="BETTER" value="BETTER" />
            <Picker.Item label="WELL" value="WELL" />
            <Picker.Item label="FULLY_RECOVERED" value="FULLY_RECOVERED" />
          </Picker>
        </View>
        <TextInput multiline={true} numberOfLines={5} style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleAddEvent} style={styles.addButton}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.addButtonText}>Add Event</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* Toast for success/error messages */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 45,
    backgroundColor: Colors.PRIMARY,
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: 'outfit-bold',
    marginLeft: 10,
  },
  body: {
    padding: 20,
    paddingBottom: 100, // To prevent overlap with fixed footer
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GREY,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.GREY,
    padding: 1,
    marginVertical: 10,
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderColor: Colors.GREY,
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
