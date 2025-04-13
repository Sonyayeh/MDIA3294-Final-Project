import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { themePalette } from '../theme/royalTheme';
import { Button, Text } from '@rneui/themed';

const background = require('../assets/background.jpg');

const OnboardingScreen = ({ navigation }) => {
    return (
        <ImageBackground source={background} style={styles.background} resizeMode='cover'>
        <View style={styles.overlay}>
        <View style={styles.container}>
            <Text h3 style={styles.title}> Welcome to Adoptly 🐾</Text>
            <Text style={[styles.description, {color: themePalette.text}]}>
                Adopt your next best friend with just a few clicks!
            </Text>
               <Button
                title="Get Started"
                onPress={() => navigation.replace('HomeScreen')}
                
            />
        </View>
      </View>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 32,

    },

    button: {
        
        backgroundColor: themePalette.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
    },

    buttonText: {
        color: themePalette.white,
        fontSize: 16,
    },
});


export default OnboardingScreen