import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

const HeaderScreen = ({ fullName, onRecordsPress, onProfilePress, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation()

  const handleSearch = () => {
    Keyboard.dismiss(); // Dismiss the keyboard after search
    navigation.push('search', searchText)
  };

  return (
    <View style={{backgroundColor: Colors.PRIMARY, paddingBottom: 10, elevation: 10}}>
      <View style={styles.headerContainer}>
        <FontAwesome name="user-circle" size={55} color={Colors.WHITE} style={styles.profileIcon} onPress={onProfilePress}/>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.fullName}>{fullName}</Text>
        </View>
        <TouchableOpacity onPress={onRecordsPress}>
          <FontAwesome5 name="file-medical" size={35} color={Colors.WHITE} style={styles.recordsIcon} />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search records..."
          placeholderTextColor={Colors.GREY}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // Trigger search on 'Enter' key
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome5 name="search" size={20} color={Colors.PRIMARY_LIGHT} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.PRIMARY
  },
  profileIcon: {
    flex: 1,
  },
  textContainer: {
    flex: 3.8,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    fontSize: 19,
  },
  recordsIcon: {
    flex: 1,
    top: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 25,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.GREY,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 10,
  },
});

export default HeaderScreen;
