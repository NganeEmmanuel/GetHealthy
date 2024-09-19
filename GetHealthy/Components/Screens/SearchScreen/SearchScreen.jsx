import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../Utils/Colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingOverlay from '../../Common/LoadingOverlay';
import GlobalAPI from '../../Utils/GlobalAPI';
import Toast from 'react-native-toast-message';
import EventCard from '../RecordDetailsScreen/EventCard';
import EventModal from '../RecordDetailsScreen/EventModal';
import { ScrollView } from 'react-native-gesture-handler';

export default function SearchScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('');
    const [searchResults, setResults] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const param = useRoute().params;

    useEffect(() => {
        handleSearch(param)
    },[])

    const handleSearches = () => {
      handleSearch(searchText)
    }

    const handleSearch = (term) => {
        if(!term){
          setLoading(false)
           return ;
        }

        setLoading(true)
        GlobalAPI.SearchAll(term).then(resp => {
            setResults(resp)
            setLoading(false)
        }).catch(err => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong. Please check internet connection and try again',
            });
            setLoading(false)
        })
    };

    /**
     * Handles the senario where the click is on a result that is an illness record
     * @param {*} recordResult result from the search whci is from the record database
     */
    const handleRecordClick = (recordResult) => {
        const record = {
            id: recordResult?.id,
            illnessName: recordResult?.title,
            illnessStatus: recordResult?.status,
            illnessDescription: recordResult?.description
        }

        navigation.push('recordDetails', {record})
    }

    const handleEventClick = (eventResult) => {
        const event = {
          id: eventResult?.id,
          title: eventResult?.title,
          status: eventResult?.status,
          description: eventResult?.description,
          type: eventResult?.eventType
        }

        openModal(event)
    }

    const openModal = (event) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedEvent(null);
    };

  return (
    <View>
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                <FontAwesome name="arrow-left" size={24} color={Colors.WHITE} />
                </TouchableOpacity>
                <Text style={styles.headTitle}>Search Your Health Records</Text>
            </View>

            {/* Search Section */}
            <View style={styles.searchContainer}>
                <TextInput
                style={styles.searchInput}
                placeholder="Search records..."
                placeholderTextColor={Colors.GREY}
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearches} // Trigger search on 'Enter' key
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearches}>
                <FontAwesome5 name="search" size={20} color={Colors.PRIMARY_LIGHT} />
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView style={{ paddingHorizontal: 16 }}>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <EventCard
                key={index}
                title={result?.title}
                type={result?.eventType}
                status={result?.status}
                description={result?.description}
                startDate={result?.dateStarted}
                onEventPress={result?.source === 'EVENT'?() => handleEventClick(result): () => handleRecordClick(result)}
              />
            ))
          ) : (
            <Text style={styles.noEventText}>Search returned no records</Text>
          )}
        </ScrollView>

        {selectedEvent && (
            <EventModal
            isVisible={isModalVisible}
            event={selectedEvent}
            onClose={closeModal}
            onDelete={() => console.log('Delete action')}
            />
        )}
        <LoadingOverlay visible={loading} />
        <Toast />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 5,
        backgroundColor: Colors.PRIMARY, 
    },

    mainContainer: {
        paddingHorizontal: 16, 
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },

    headTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: Colors.WHITE
    },

    backArrow: {
        marginVertical: 10
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginHorizontal: 20,
        marginTop: 5,
        borderRadius: 25,
        elevation: 2,
      },

      searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'grey',
        paddingHorizontal: 10,
      },

      searchButton: {
        paddingHorizontal: 10,
      },

      noEventText: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 200,
        color: Colors.GREY,
      }
  })