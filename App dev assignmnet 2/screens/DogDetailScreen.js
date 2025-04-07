import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Icon, Button } from '@rneui/themed';
import { useAdoption } from '../components/AdoptionContext'; 
import Collapsible from 'react-native-collapsible'; 

export default function DogDetail({ route, navigation }) {
  const { dog } = route.params;
  const { adoptions = [], addAdoption, removeAdoptions } = useAdoption() || {};  // Ensure that adoptions is defaulted to an empty array if undefined

  if (!adoptions) {
    console.error("Adoptions context is not available.");
    return <Text>Error loading adoption data.</Text>;  // Handle the error gracefully
  }

  const isAdopted = adoptions.some((adoptedDog) => adoptedDog.id === dog.id); 
  const toggleAdoption = () => {
    if (isAdopted) {
      removeAdoptions(dog.id); 
    } else {
      addAdoption(dog); 
    }
  };

  const [collapsed, setCollapsed] = useState({
    temperament: true,
    lifeSpan: true,
    weight: true,
    height: true,
    origin: true,
    bredFor: true,
    breedGroup: true,
  });

  const toggleAccordion = (key) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Image 
        source={{ uri: dog.image?.url || `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` }} 
        style={styles.dogImage} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{dog.name}</Text>
        <TouchableOpacity onPress={toggleAdoption} style={styles.favoriteAdoption}>
          <Icon
            name="paw"
            type="font-awesome"
            color={isAdopted ? '#e76f51' : 'gray'} 
            size={30}
          />
        </TouchableOpacity>
      </View>

      {/* Collapsible Info Sections */}
      <View style={styles.infoIntro}>
        {[
          { label: 'Temperament', key: 'temperament', value: dog.temperament || 'Unknown' },
          { label: 'Life Span', key: 'lifeSpan', value: dog.life_span || 'Unknown' },
          { label: 'Weight', key: 'weight', value: typeof dog.weight === 'string' ? dog.weight : `${dog.weight?.imperial} lbs (${dog.weight?.metric} kg)` },
          { label: 'Height', key: 'height', value: typeof dog.height === 'string' ? dog.height : `${dog.height?.imperial} in (${dog.height?.metric} cm)` },
          { label: 'Origin', key: 'origin', value: dog.origin || 'Unknown' },
          { label: 'Bred For', key: 'bredFor', value: dog.bred_for || 'Unknown' },
          { label: 'Breed Group', key: 'breedGroup', value: dog.breed_group || 'Unknown' },
        ].map(({ label, key, value }) => (
          <View key={key}>
            <TouchableOpacity onPress={() => toggleAccordion(key)} style={styles.accordionHeader}>
              <Text style={styles.label}>{label}</Text>
              <Icon 
                name={collapsed[key] ? 'chevron-down' : 'chevron-up'} 
                type="font-awesome" 
                color="#e76f51"
                padding={10} 
              />
            </TouchableOpacity>
            <Collapsible collapsed={collapsed[key]}>
              <View style={styles.accordionContent}>
                <Text>{value}</Text>
              </View>
            </Collapsible>
          </View>
        ))}
      </View>

      <View style={styles.btnIntro}>
        <Button title="Back to Search" onPress={() => navigation.navigate('DogListScreen')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  container: { padding: 10, alignItems: 'center', backgroundColor: '#F0F8FF' },
  dogImage: { width: 330, height: 330, marginBottom: 20, alignSelf: 'center' },
  infoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  infoIntro: { width: '85%', backgroundColor: '#22577a' },
  label: { padding: 5, fontSize: 16, fontWeight: 'bold', color: '#e9c46a' },
  accordionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: 'white', padding: 5, borderWidth: 1 },
  accordionContent: { marginTop: 10, padding: 10, backgroundColor: '#e9c46a' },
  btnIntro: { marginTop: 50, width: 200 },
});
