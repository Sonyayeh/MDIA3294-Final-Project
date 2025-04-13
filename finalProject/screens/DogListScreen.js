import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useUserState } from '../services/UserState';
import Collapsible from 'react-native-collapsible'; 
import { Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons'; // Correct import for Ionicons
import { SearchBar } from 'react-native-elements';

export default function DogSearch() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dogResult, setDogResult] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [initialLetterFilter, setInitialLetterFilter] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true); // state to control collapsible filter
  const navigation = useNavigation();
  const navRef = navigation; // Get the navigation reference

  const currUser = useUserState().getUser();

  // Function to display the right side of the header based on user
  function displayHeaderRight(user, navRef) {
    if (user !== null && user.first) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{user.first}</Text>
          <Icon name="person-circle" type="ionicon" onPress={() => navRef.navigate('Adoption')} />
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => navRef.replace('CatNav', { screen: 'Home' })}>
          <Text>Login</Text>
        </TouchableOpacity>
      );
    }
  }

  const handleDogPress = (dog) => {
    navigation.navigate('DogDetailScreen', { dog });
  };

  // Fetch dog breed data from The Dog API whenever the search input or filter changes
  useEffect(() => {
    setIsLoaded(false);
    const uri = `https://api.thedogapi.com/v1/breeds`;  

    fetch(uri)
      .then(res => res.json())
      .then(
        (result) => {
          // Filter results based on search input and selected initial letter
          let filteredDogs = result.filter(dog =>
            dog.name.toLowerCase().includes(searchInputVal.toLowerCase())
          );

          if (initialLetterFilter) {
            filteredDogs = filteredDogs.filter(dog =>
              dog.name[0].toLowerCase() === initialLetterFilter.toLowerCase()
            );
          }

          setDogResult(filteredDogs);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, [searchInputVal, initialLetterFilter]);

  // Handle filtering by initial letter
  const handleInitialLetterFilter = (letter) => {
    setInitialLetterFilter(letter);
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('PetScreen')}>
          <Text style={styles.backButtonText}>Back</Text>
         </TouchableOpacity>
        <Text style={styles.navTitle}>Dog Search</Text>
        <View style={styles.navRight}>
          {displayHeaderRight(currUser, navRef)}
        </View>
      </View>

      {/* Search Bar */}
      <SearchBar
        containerStyle={{ 
          margin: 10,
          backgroundColor: 'transparent', 
          borderTopWidth: 0, 
          borderBottomWidth: 0, 
          
        }}
        inputContainerStyle={{
          backgroundColor: '#ffffff', 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },  // Horizontal and vertical offset
          shadowOpacity: 0.1,  // The opacity of the shadow
          shadowRadius: 6,  // How blurred the shadow is
          elevation: 5,  // Required for Android shadow effect
          borderRadius: 10,
        }}
        inputStyle={{
          color: '#ffffff', 
        }}
        placeholder="Search dog breeds..."
        placeholderTextColor="#22577a" 
        onChangeText={(newText) => setSearchInputVal(newText)}
        value={searchInputVal}
      />

      {/* Filter by initial letter A to Z */}
      <TouchableOpacity 
        onPress={() => setIsCollapsed(!isCollapsed)} 
        style={styles.filterToggle}
      >
        <View style={styles.filterToggleContent}>
          <Text style={styles.toggleFilterText}>
            {isCollapsed ? 'Sort by' : 'Hide'}
          </Text>
          <Ionicons 
            name={isCollapsed ? 'add' : 'remove'} // Use Ionicons here
            size={20} // Adjust size accordingly
            color="#22577a" 
          />
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        <View style={styles.filterContainer}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <TouchableOpacity 
              key={letter} 
              onPress={() => handleInitialLetterFilter(letter)} 
              style={[
                styles.filterButton,
                initialLetterFilter === letter ? styles.selectedFilterButton : null
              ]}
            >
              <Text style={[
                styles.filterButtonText,
                initialLetterFilter === letter ? styles.selectedFilterButtonText : null
              ]}>
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            onPress={() => setInitialLetterFilter('')} 
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>Clear Filter</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      <Text h3>Availabilities</Text>
      <Divider style={{ marginVertical: 10 }} />

      {displayDogData(error, isLoaded, dogResult, handleDogPress)}
    </View>
  );
}

// Function to handle displaying search results based on API response
function displayDogData(error, isLoaded, dogResult, handleDogPress) {
  const renderItem = ({ item }) => (
    <View style={styles.dogContainer}>
      <TouchableOpacity 
        style={styles.dog} 
        key={item.id}  
        onPress={() => handleDogPress(item)}
        activeOpacity={0.7}
      >      
        <Avatar 
          source={{ uri: item.reference_image_id 
            ? `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg` 
            : 'https://via.placeholder.com/100' }}
          style={styles.dogImg} 
        />
        <Text style={styles.dogName}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return <Text>Error: {error.message}</Text>;
  } else if (!isLoaded) {
    return <ActivityIndicator size="large" />;
  } else if (dogResult.length === 0) {
    return <Text>No dogs found</Text>;
  } else {
    return (
      <FlatList
        data={dogResult}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row} 
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F0F8FF",
    marginTop: 50, // Adjust for the top bar
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navTitle: {
    color: '#22577a',
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-around',
    marginVertical: 5,
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    margin: 2,
    backgroundColor: '#22577a',
    width: 'auto',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#e76f51',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  selectedFilterButtonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
  },
  dogContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  dog: {
    width: '48%',
    alignItems: 'center',
  },  
  dogImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain', 
    backgroundColor: '#f0f0f0',
    marginTop: 20,
  },
  dogName: {
    marginTop: 5,
    width: 150,
  },
  filterToggle: {
    padding: 20,
  },
  filterToggleContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  toggleFilterText: {
    color: '#22577a',
    fontWeight: 'bold',
    marginBottom: 2,
    flex: 1, 
  },
  backButtonText: { 
    color: '#22577a', 
    fontSize: 16, 
    fontWeight: 'bold', 
    paddingRight: 10 },
});
