import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserState } from '../services/UserState';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import Adoption from '../screens/Adoption';

// Create a bottom tab navigator
const UserTab = createBottomTabNavigator();

export default function UsersNavigation() {
  const navigation = useNavigation();
  const userState = useUserState();

  // Check if the user is logged in, and redirect if not
  useEffect(() => {
    if (userState.getUser() === null) {
      // Redirect to the CatNav screen if user is not logged in
      navigation.replace('CatNav', {
        screen: 'Home',
      });
    }
  }, [userState, navigation]);

  return (
    <UserTab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#440e62',
        tabBarInactiveTintColor: '#cccccc',
        headerShown: false,
      }}
    >
      <UserTab.Screen
        name="Adoption"
        component={Adoption}
        options={{
          tabBarLabel: 'Adoptz',
          tabBarIcon: () => null, // Remove the icon
          tabBarLabelStyle: {
            fontSize: 18, // Adjust the font size as needed
            fontWeight: 'bold', // Optional: make the text bold
            marginTop: -20
          },
        }}
      />
    </UserTab.Navigator>
  );
}
