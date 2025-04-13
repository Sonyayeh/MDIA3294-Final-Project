// import React from 'react';
import React from 'react';
// import { View, StyleSheet } from 'react-native';
import { View, StyleSheet } from 'react-native';
// import { Text, Avatar, Button } from 'react-native-elements';
import { Text, Avatar, Button } from '@rneui/themed';
// import { Divider } from 'react-native-elements';
import { Divider } from '@rneui/base';

// Profile Component
// shopping list button added
// navigation to shopping list added
export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <Avatar
        size={150}
        rounded
        source={{ uri: 'https://via.placeholder.com/150' }} 
        containerStyle={styles.avatar}
      />
      {/* User Name */}
      <Text h3 style={styles.name}>
        Your Name
      </Text>
        <Divider
            orientation="horizontal"
            style={{ marginTop: 20 }}>
            <Button
                title="Go to Shopping List"
                onPress={() => navigation.navigate('Shopping')} 
                buttonStyle={styles.button}
            />
            
        </Divider> 
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22577a',
  },
  button: {
    backgroundColor: '#22577a',

  },
});