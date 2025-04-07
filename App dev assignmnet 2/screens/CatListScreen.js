import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import { useUserState } from '../services/UserState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavArrayByUser, addFavorite, delFavorite, checkFavorite } from '../services/FavoriteManager';

const apiKey = 'live_yCRmGCRKzQMPxjwnLhsck2tHCvBJZakq5SIrQIv7jXBpgu2WvIXiZwobMlOkMcD6';

export default function CatListScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [likedCats, setLikedCats] = useState([]);
  const currUser = useUserState().getUser();

  useEffect(() => {
    fetchCats();
    loadSearchHistory();
  }, []);

  useEffect(() => {
    if (currUser) {
      loadLikedCats();
    }
  }, [currUser]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => displayHeaderRight(currUser, navigation),
    });
  }, [currUser, navigation]);

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

  const loadLikedCats = async () => {
    if (!currUser?.id) return;

    try {
      const storedLikes = await getFavArrayByUser(currUser.id);
      setLikedCats(storedLikes);
    } catch (error) {
      console.error('Error loading liked cats:', error);
    }
  };

  const toggleLike = async (cat) => {
    let updatedLikes;
    if (checkFavorite(cat.id, likedCats)) {
      updatedLikes = await delFavorite(cat, likedCats, currUser.id);
    } else {
      updatedLikes = await addFavorite(cat, likedCats, currUser.id);
    }
    setLikedCats([...updatedLikes]); // Ensures UI updates properly
  };

  const loadSearchHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      setSearchHistory(storedHistory ? JSON.parse(storedHistory) : []);
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowHistoryDropdown(!!query.trim());
  };

  const handleSearchSubmit = async () => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery)) {
      const updatedHistory = [...searchHistory, searchQuery];
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
    setShowHistoryDropdown(false);
  };

  const clearSearchHistory = async () => {
    await AsyncStorage.removeItem('searchHistory');
    setSearchHistory([]);
    setShowHistoryDropdown(false);
  };

  const dismissDropdown = () => {
    setShowHistoryDropdown(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissDropdown}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('PetScreen')}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text h2 style={styles.heading}>Available Cats:</Text>
        </View>

        {/* Search Bar and Dropdown */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for a cat breed..."
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
            onFocus={() => setShowHistoryDropdown(true)}
          />

          {showHistoryDropdown && (
            <View style={styles.historyDropdown}>
              <FlatList
                data={searchHistory}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setSearchQuery(item)} style={styles.dropdownItem}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <TouchableOpacity onPress={clearSearchHistory} style={styles.clearHistoryButton}>
                <Text style={styles.clearHistoryText}>Clear History</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Cat List */}
        {isLoaded ? (
          <FlatList
            data={dataResult.filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))}
            renderItem={({ item }) => (
              <View style={styles.catWrapper}>
                <TouchableOpacity style={styles.catCube} onPress={() => navigation.navigate('CatDetailScreen', { detailId: item.id, catData: item })}>
                  <Image source={{ uri: item.image?.url || 'https://via.placeholder.com/150' }} style={styles.catImage} />
                  <Text style={styles.catName}>{item.name}</Text>
                  <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item)}>
                    <Icon name={checkFavorite(item.id, likedCats) ? 'heart' : 'heart-o'} type="font-awesome" color="red" size={20} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.rowWrapper}
          />
        ) : (
          <ActivityIndicator size="large" color="#ED9121" />
        )}
        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

function displayHeaderRight(user, navRef) {
  if (user !== null && user.first) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{user.first}</Text>
        <Icon name="person-circle" type="ionicon" onPress={() => navRef.navigate('UserNav', { screen: 'Favorites' })} />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FED8B1", alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 100, width: '100%', paddingHorizontal: 10 },
  backButtonText: { color: '#ED9121', fontSize: 16, fontWeight: 'bold', paddingRight: 30 },
  heading: { fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  searchContainer: { width: '100%', paddingHorizontal: 20, marginBottom: 10 },
  searchBar: { padding: 12, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  historyDropdown: { width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 5, marginTop: 5 },
  clearHistoryText: { padding: 10, alignItems: 'center', color:'#ff0000' },
  dropdownItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  catWrapper: { width: '48%', marginTop: 10 },
  catCube: { backgroundColor: '#fff', borderRadius: 10, padding: 10, alignItems: 'center' },
  catImage: { width: 150, height: 150, borderRadius: 10 },
  catName: { marginTop: 10, fontWeight: 'bold' },
  likeButton: { position: 'absolute', bottom: 10, right: 10 },
  rowWrapper: { justifyContent: 'space-between' },
});