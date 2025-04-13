import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from '@rneui/themed';
import { royalTheme } from "./theme/royalTheme";

// Screens and navigators
import HomeScreen from "./screens/HomeScreen";
import PetNavigator from "./navigation/PetNavigator";
import AdoptionHomeScreen from "./screens/HomeScreen";
import UsersNavigation from './navigation/UsersNavigation';
import CatListScreen from "./screens/CatListScreen";
import DogListScreen from "./screens/DogListScreen";
import DogDetailScreen from "./screens/DogDetailScreen";
import DogSearchScreen from "./screens/DogSearchScreen";
import CatDetailScreen from "./screens/CatDetailScreen";
import Adoption from "./screens/Adoption";
import PetScreen from "./screens/PetScreen";
import ShoppingList from "./screens/ShoppingList";

// Context provider
import { AdoptionProvider } from './components/AdoptionContext';
import ShoppingSaved from "./screens/ShoppingSaved";

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AdoptionProvider>
        <NavigationContainer>
          <ThemeProvider theme={royalTheme}>
            <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
              {/* General Screens */}
              <RootStack.Screen name="HomeScreen" component={HomeScreen} />
              <RootStack.Screen name="Adoption" component={Adoption} />
              <RootStack.Screen name="PetScreen" component={PetScreen} />
              <RootStack.Screen 
                  name="CatListScreen" 
                  component={CatListScreen} 
                  options={{ headerShown: true }} 
                />
              <RootStack.Screen name="DogListScreen" component={DogListScreen} />
              <RootStack.Screen name="DogSearchScreen" component={DogSearchScreen} />
              <RootStack.Screen name="CatDetailScreen" component={CatDetailScreen} />
              <RootStack.Screen name="DogDetailScreen" component={DogDetailScreen} />
              <RootStack.Screen name="AdoptionHomeScreen" component={AdoptionHomeScreen} />
              <RootStack.Screen name="UserNav" component={UsersNavigation} options={{ title: 'User Section' }}  />
              {/* PetNavigator for pet-related screens */}
              <RootStack.Screen name="PetNavigator" component={PetNavigator} />
              <RootStack.Screen name="ShoppingList" component={ShoppingList} />
              <RootStack.Screen name="ShoppingSaved" component={ShoppingSaved} />
            </RootStack.Navigator>
          </ThemeProvider>
        </NavigationContainer>
      </AdoptionProvider>
    </SafeAreaProvider>
  );
}
