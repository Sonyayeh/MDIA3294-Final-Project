import React, { useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useUserState } from '../services/UserState';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import Adoption from '../screens/Adoption';

// Import components
import HeaderIcons from '../components/HeaderIcons';

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
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#440e62',
        tabBarInactiveTintColor: '#cccccc',
        headerShown: false,
      }}
    >
      {/* Adoption Tab */}
      <UserTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="paw"
              type="font-awesome"
              color={color}
              size={size}
            />
          ),
        }}
        name="Adoption"
        component={Adoption}
      />
    </UserTab.Navigator>
  );
}
