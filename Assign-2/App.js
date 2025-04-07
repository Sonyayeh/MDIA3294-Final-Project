// Ensures safe area usage for different devices
import { SafeAreaProvider } from "react-native-safe-area-context";
// Manages navigation in the app
import { NavigationContainer } from "@react-navigation/native";
// Creates a stack-based navigation flow
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ---Styles----
// Provides a custom theme for UI components
import { ThemeProvider } from '@rneui/themed';
// Custom theme for styling
import { DogTheme } from "./Theme/DogTheme"; 

// Main navigation structure
import DogNavigation from "./Navigation/DogNavigation";
// Context to manage favorite dogs 
import { AdoptionProvider } from './Components/AdoptionContext'; 

// Creates the root stack navigator
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider >
      <AdoptionProvider> 
        <NavigationContainer >
          <ThemeProvider theme={DogTheme}>
            <RootStack.Navigator>
              <RootStack.Screen
                name="DogNavigation"
                component={DogNavigation}
                options={{
                  headerShown: false,
                }}
              />
            </RootStack.Navigator>
          </ThemeProvider>
        </NavigationContainer>
      </AdoptionProvider>
    </SafeAreaProvider>
  );
}

