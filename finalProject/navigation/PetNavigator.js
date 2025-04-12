import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Dog Screens
import DogHomeScreen from '../screens/DogHomeScreen';
import DogDetailScreen from '../screens/DogDetailScreen';
import DogSearchScreen from '../screens/DogSearchScreen';
import Adoption from '../screens/Adoption';
import Profile from '../screens/ProfileScreen';
import HeaderIcons from '../components/HeaderIcons';
import Shopping from '../components/ShoppingList';

// Cat Screens
import HomeScreen from '../screens/HomeScreen';
import PetScreen from '../screens/PetScreen'; // Add PetScreen here
import CatListScreen from '../screens/CatListScreen';
import CatDetailScreen from '../screens/CatDetailScreen';

const Stack = createNativeStackNavigator();

export default function PetNavigator() {
  return (
    <Stack.Navigator initialRouteName="PetScreen"> {/* Ensure initial screen is PetScreen */}
      {/* PetScreen: Entry Point */}
      <Stack.Screen
        name="PetScreen"
        component={PetScreen} // This should be the first screen in the navigator
        options={{ headerShown: false }} // If you want to hide the header on this screen
      />
      
      {/* Dog Screens */}
      <Stack.Screen
        name="DogHome"
        component={DogHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DogSearch"
        component={DogSearchScreen}
        options={({ navigation }) => ({
          title: 'Find your Dog',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Dog icons
        })}
      />
      <Stack.Screen
        name="DogDetail"
        component={DogDetailScreen}
        options={({ navigation }) => ({
          title: 'Dog Details',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Dog icons
        })}
      />
      <Stack.Screen
        name="Adoption"
        component={Adoption}
        options={({ navigation }) => ({
          title: 'Your Adoption List',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Dog icons
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: 'Your Profile',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Dog icons
        })}
      />
      <Stack.Screen
        name="Shopping"
        component={Shopping}
        options={({ navigation }) => ({
          title: 'Your Shopping List',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Dog icons
        })}
      />

      {/* Cat Screens */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }} // If you don't want the header here as well
      />
      <Stack.Screen
        name="CatList"
        component={CatListScreen}
        options={{ title: 'Find your cat!' }}
      />
      <Stack.Screen
        name="CatDetail"
        component={CatDetailScreen}
        options={{ title: 'Cat Info' }}
      />
    </Stack.Navigator>
  );
}
