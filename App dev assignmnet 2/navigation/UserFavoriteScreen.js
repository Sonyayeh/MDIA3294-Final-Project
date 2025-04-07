import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Text } from '@rneui/themed';
import MyListItem from '../components/MyListItem';
import { getFavArrayByUser } from '../services/FavoriteManager';

// Use the cat API or the method you've written to fetch cat data
import { getCatArray } from '../services/CatManager'; // This is the cat data fetching method

export default function CatFavoriteScreen({ navigation }) {
  // state variables for getting favorite cats
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataResult, setDataResult] = useState([]);

  // You can skip user fetching if you're displaying all cats or use a similar hook for user-specific favorites
  // const cUser = useUserState().getUser();  // Example if you are fetching favorites by a user

  // useEffect to get cat data from an API or database
  useEffect(() => {
    getFavArrayByUser()  // Update this to your actual method of fetching cats
      .then(
        (result) => {
          setIsLoaded(true);
          setDataResult(result); // Assuming result is already in an array format
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []); // Empty dependency array to run once when the component mounts

  // Reset data when the screen is focused
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      setDataResult([]); // Clear previous data when screen is focused
      setIsLoaded(false); // Reset loading state
    });

    return willFocusSubscription;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text h2 style={styles.heading}>Cat Favorites</Text>

      {displayDataContainer(error, isLoaded, dataResult, navigation)}
    </View>
  );
}

function displayDataContainer(error, isLoaded, dataResult, navigation) {
  // Flatlist render item
  const renderItem = ({ item }) => (
    <MyListItem itemData={item} navigatorRef={navigation} />
  );

  if (error) {
    // Show an error message    
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  else if (!isLoaded) {
    // Show the ActivityIndicator (spinner)
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  else if (dataResult === null || dataResult.length === 0) {
    // Show message when no cats are found
    return (
      <View>
        <Text>No favorite cats found</Text>
      </View>
    );
  }
  else {
    // Show the data in a FlatList
    return (
      <FlatList
        style={styles.catList}
        data={dataResult}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Assuming 'id' exists in each item
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  heading: {
    marginTop: 10,
    marginBottom: 10,
  },

  catList: {
    width: '100%',
  }
});
