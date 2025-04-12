import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useUserState } from '../services/UserState';
import { Icon } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';

const apiKey = 'live_yCRmGCRKzQMPxjwnLhsck2tHCvBJZakq5SIrQIv7jXBpgu2WvIXiZwobMlOkMcD6';  // Replace with your actual API key

export default function CatListScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [initialLetterFilter, setInitialLetterFilter] = useState('');
  const currUser = useUserState().getUser();
  const navRef = navigation;

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

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds', {
        headers: { 'x-api-key': apiKey },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setDataResult(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoaded(true);
    }
  };

  const filteredCats = dataResult.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (initialLetterFilter ? cat.name.toLowerCase().startsWith(initialLetterFilter.toLowerCase()) : true)
  );

  const handleInitialLetterFilter = (letter) => {
    setInitialLetterFilter(letter);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('PetScreen')}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text h2 style={styles.heading}>Available Cats:</Text>
        <View style={styles.navRight}>
          {displayHeaderRight(currUser, navRef)}
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a cat breed..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

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
            name={isCollapsed ? 'add' : 'remove'} 
            size={20} 
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

      {/* Loading Indicator or Cat List */}
      {isLoaded ? (
        <FlatList
          data={filteredCats}
          renderItem={({ item }) => (
            <View style={styles.catWrapper}>
              <TouchableOpacity
                style={styles.catCube}
                onPress={() =>
                  navigation.navigate('CatDetailScreen', { detailId: item.id })
                }
              >
                <Image
                  source={{ uri: item.image?.url || 'https://via.placeholder.com/150' }}
                  style={styles.catImage}
                />
                <Text style={styles.catName}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.rowWrapper}
        />
      ) : (
        <ActivityIndicator size="large" color="#ED9121" />
      )}

      {/* Error Handling */}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED8B1',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  backButtonText: {
    color: '#ED9121',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  navRight: {
    paddingRight: 10,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchBar: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterToggle: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterToggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleFilterText: {
    fontSize: 16,
    color: '#22577a',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#555',
  },
  selectedFilterButton: {
    backgroundColor: '#ED9121',
    borderColor: '#ED9121',
  },
  selectedFilterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  catWrapper: {
    width: '48%',
    marginTop: 10,
  },
  catCube: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  catImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  catName: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  rowWrapper: {
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});
