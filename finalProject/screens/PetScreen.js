import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';

export default function PetScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} h1>
        Adoptly
      </Text>

      <View style={styles.bannerTops}>
        <Image
          style={styles.banner}
          source={require('../assets/dog-1.png')}
        />
        <Text h2>About Us:</Text>
      </View>

      <TouchableOpacity
        style={styles.bannerMiddle}
        onPress={() => navigation.navigate('DogListScreen')}
      >
        <Text h2>Dogs</Text>
        <Image
          style={styles.banner}
          source={require('../assets/dog-2.png')}
        />
      </TouchableOpacity>

      {/* Updated Cats Section */}
      <TouchableOpacity
        style={styles.bannerBottom}
        onPress={() => navigation.navigate('CatListScreen')}
      >
        <Image
          style={styles.banner}
          source={require('../assets/dog-3.png')}
        />
        <Text h2>Cats</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F8FF",
  },

  title: {
    marginTop: 50,
  },

  bannerTops: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9c46a',
    padding: 10,
    gap: 50,
    marginTop: 100,
  },

  banner: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  bannerMiddle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#e76f51',
    padding: 10,
    gap: 50,
    marginTop: 30,
  },

  bannerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bc4749',
    padding: 10,
    gap: 50,
    marginTop: 30,
  },

  btnIntro: {
    marginTop: 100,
  },
});
