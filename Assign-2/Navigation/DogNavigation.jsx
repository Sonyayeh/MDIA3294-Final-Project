// import React from 'react';
import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import all screens
import DogHome from '../Screens/DogHome';
import DogDetail from '../Screens/DogDetail';
import DogSearch from '../Screens/DogSearch';
import Adoption from '../Screens/Adoption';
import Profile from '../Screens/Profile';

// import components
import HeaderIcons from '../Components/HeaderIcons';
import Shopping from '../Components/ShoppingList';

// create a stack navigator
const DogStack = createNativeStackNavigator();

// DogNavigation
// DogNavigation component is used to navigate between different screens in the Dog Navigation
// It uses DogStack Navigator to navigate between different screens
// It uses HeaderIcons component to display the icons on the header
// It uses DogHome, DogDetail, DogSearch, Adoption, Profile, Shopping components
export default function DogNavigation() {
  return (
    <DogStack.Navigator initialRouteName="Home">
      <DogStack.Screen
        name="Home"
        component={DogHome}
        options={{ headerShown: false }}
      />
      <DogStack.Screen
        name="Search"
        component={DogSearch}
        options={({ navigation }) => ({
          title: 'Find your Dog',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Use HeaderIcons
        })}
      />
      <DogStack.Screen
        name="Detail"
        component={DogDetail}
        options={({ navigation }) => ({
          title: 'Dog Details',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Use HeaderIcons
        })}
      />
      <DogStack.Screen
        name="Adoption"
        component={Adoption}
        options={({ navigation }) => ({
          title: 'Your Adoption List',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Use HeaderIcons
        })}
      />
      <DogStack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: 'Your Profile',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Use HeaderIcons
        })}
      />
      <DogStack.Screen
        name="Shopping"
        component={Shopping}
        options={({ navigation }) => ({
          title: 'Your Shopping List',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: '#22577a',
          },
          headerRight: () => <HeaderIcons navigation={navigation} />, // Use HeaderIcons
        })}
      />
    </DogStack.Navigator>
  );
}
