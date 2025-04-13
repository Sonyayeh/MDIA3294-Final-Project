import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { useAdoption } from '../components/AdoptionContext';

export default function AdoptionList({ navigation }) {
  const { adoptions, removeAdoptions } = useAdoption();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>My Adoption List:</Text>

      {adoptions.length === 0 ? (
        <Text style={styles.emptyText}>No adopted pets yet!</Text>
      ) : (
        <FlatList
          data={adoptions}
          keyExtractor={(item) => item.id?.toString() || `pet-${Math.random()}`}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.card, { width: screenWidth * 0.9 }]}>
              <Image
                source={{
                  uri: item.image?.url || `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`,
                }}
                style={styles.petImage}
              />
              <Text style={styles.petName}>{item.name}</Text>
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
        <Button
          title="Back to Search"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.backButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FED8B1',
  },
  title: {
    marginBottom: 20,
    color: '#ED9121',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  petImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ED9121',
    marginBottom: 10,
  },
  removeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnIntro: {
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
});
