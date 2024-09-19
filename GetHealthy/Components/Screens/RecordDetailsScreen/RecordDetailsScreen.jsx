import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import IllnessRecord from './IllnessRecord';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { useRoute } from '@react-navigation/native';
import GlobalAPI from '../../Utils/GlobalAPI';
import Colors from '../../Utils/Colors';
import LoadingOverlay from '../../Common/LoadingOverlay';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the add button

// Main Screen Component
export default function RecordDetailsScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const param = useRoute().params;
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleDeleteEvent = (id) => {
    GlobalAPI.dealetEvent(id).then(resp => {
      if(!resp){
        throw new Error('Failed to delete event Please try again')
      }

      closeModal()

    }).catch(err => {
      //toat android message here
    })
  }

  const getEventsByRecordID = () => {
    GlobalAPI.geteventsByRecordID(param?.record?.id)
      .then((resp) => {
        if(Array.isArray(resp) && resp.length > 0){
          setEvents(resp);
          setLoading(false);
        }else if(Array.isArray(resp) && resp.length == 0){
          setEvents(resp);
          setLoading(false);
        }else{
          setLoading(false);
          return
        }
      })
      .catch((err) => {
        // Add toast message for errors
        setLoading(false);
        return
      });
  };

  useEffect(() => {
    getEventsByRecordID();
  }, [events]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <IllnessRecord
        title={param?.record?.illnessName}
        status={param?.record?.illnessStatus}
        description={param?.record?.illnessDescription}
      />
      <ScrollView
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
      >
        <View style={{ paddingHorizontal: 16 }}>
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                type={event.eventType}
                location={event.location}
                status={event.healthStatus}
                description={event.description}
                startDate={event.startDate}
                onEventPress={() => openModal(event)}
              />
            ))
          ) : (
            <Text style={styles.noEventText}>No Events for this record. Add events to view</Text>
          )}
        </View>
        <LoadingOverlay visible={loading} />
      </ScrollView>

      {selectedEvent && (
        <EventModal
          isVisible={isModalVisible}
          event={selectedEvent}
          onClose={closeModal}
          onDelete={handleDeleteEvent}
        />
      )}

      {/* Floating Add Event Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('addEvent', {recordID: param?.record?.id})}
      >
        <FontAwesome name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noEventText: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 200,
    color: Colors.GREY,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
