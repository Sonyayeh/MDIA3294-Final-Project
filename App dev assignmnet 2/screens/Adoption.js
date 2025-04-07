 // Import react from react
 import React from 'react';
//  Import View, FlatList, Image, StyleSheet from react-native
import { View, FlatList, Image, StyleSheet } from 'react-native';
// Import Text, Button from @rneui/themed
import { Text, Button } from '@rneui/themed';
// Import useAdoption from '../Components/AdoptionContext'
import { useAdoption } from '../components/AdoptionContext';

// Adoption
// This component displays a list of adopted dogs
// It allows users to remove dogs from the adoption list
// It uses the useAdoption hook to manage adoption state
// It uses the FlatList component to display a list of adopted dogs
// It uses the Image component to display dog images
// It uses the Button component to remove dogs from the adoption list
// It uses the Text component to display a message when there are no adopted dogs
// It uses the Button component to navigate back to the Search screen
export default function Adoption({ navigation }) {
  const { adoptions, removeAdoptions } = useAdoption();  

  return (
    <View style={styles.container}>
      <Text h3>My Adoption Dog</Text>

      {adoptions.length === 0 ? (  
        <Text style={styles.emptyText}>No dogs added for adoption yet!</Text>
      ) : (
        <FlatList
          data={adoptions}  
          keyExtractor={(item) => item.id?.toString() || `dog-${Math.random()}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.image?.url || `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg` }}
                style={styles.dogImage}
              />
              <Text style={styles.dogName}>{item.name}</Text>
              <Button
                title="Remove"
                onPress={() => removeAdoptions(item.id)}  
                buttonStyle={styles.removeButton}
              />
            </View>
          )}
        />
      )}

      <View style={styles.btnIntro}>
        <Button title="Back to Search" 
        onPress={() => navigation.navigate('Search')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#22577a',
    width: '90%',
    alignSelf: 'center',
  },
  dogImage: {
    width: 280,
    height: 300,
    margin: 30,
  },
  dogName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  removeButton: {
    backgroundColor: '#e76f51',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnIntro: {
    marginBottom: 80,
    width: 200,
  },
});
