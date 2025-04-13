import { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, Alert, Platform, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { Divider, Icon } from '@rneui/themed';
import { useAdoption } from '../components/AdoptionContext';

const apiKey = 'live_yCRmGCRKzQMPxjwnLhsck2tHCvBJZakq5SIrQIv7jXBpgu2WvIXiZwobMlOkMcD6';

export default function CatDetailScreen({ route, navigation }) {
    const { detailId } = route.params;
    const [currCat, setCurrCat] = useState(null);
    const [catImageUrl, setCatImageUrl] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingDelay, setLoadingDelay] = useState(false); 
    const [error, setError] = useState(null);
    const [isAffectionOpen, setIsAffectionOpen] = useState(false);
    const [isGroomingOpen, setIsGroomingOpen] = useState(false);
    const [isEnergyOpen, setIsEnergyOpen] = useState(false);
    const [isLifeSpanOpen, setIsLifeSpanOpen] = useState(false);

    const { adoptions = [], addAdoption, removeAdoptions } = useAdoption() || {};

    const isAdopted = adoptions.some((adoptedCat) => adoptedCat.id === currCat?.id);


    // added a little notification section so users know what happens when toggling with the button
    const toggleAdoption = () => {
        if (!currCat) return;

        if (isAdopted) {
            removeAdoptions(currCat.id);
            showToast(`${currCat.name} was removed from your list 💔`);
        } else {
            addAdoption(currCat);
            showToast(`${currCat.name} is in your adoption list ❤️🐾`);
        }
    };

    const showToast = (message) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert('Adoption Update', message);
        }
    };

    useEffect(() => {
        const uri = `https://api.thecatapi.com/v1/breeds`;
    
        fetch(uri, {
            headers: {
                'x-api-key': apiKey,
            },
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then((result) => {
            const selectedCat = result.find(cat => cat.id === detailId);
            if (!selectedCat) throw new Error("Breed not found!");
            setCurrCat(selectedCat);

            if (selectedCat.reference_image_id) {
                fetch(`https://api.thecatapi.com/v1/images/${selectedCat.reference_image_id}`, {
                    headers: { 'x-api-key': apiKey },
                })
                .then(res => res.json())
                .then((imageData) => setCatImageUrl(imageData.url))
                .catch(error => {
                    setError(error);
                    setIsLoaded(true);
                });
            }

            setIsLoaded(true);
        })
        .catch(error => {
            setError(error);
            setIsLoaded(true);
        });
    }, [detailId]);

    useEffect(() => {
        if (!isLoaded) {
            setTimeout(() => setLoadingDelay(true), 1000);
        }
    }, [isLoaded]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error.message || error}</Text>
            </View>
        );
    }

    if (!isLoaded || !loadingDelay) {
        return (
            <View style={styles.loadingText}>
                <ActivityIndicator size="large" color="#ED9121" />
                <Text style={styles.loadingTextStyle}>Let's learn about this fella...</Text>
            </View>
        );
    }

    if (!currCat) {
        return (
            <View style={styles.container}>
                <Text>No cat data available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{currCat.name}</Text>
            </View>

            <View style={styles.centeredContainer}>
                {catImageUrl ? (
                    <Image style={styles.catImage} source={{ uri: catImageUrl }} />
                ) : (
                    <Image style={styles.catImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                )}
                <TouchableOpacity onPress={toggleAdoption} style={styles.favoriteAdoption}>
                    <Icon 
                        name="paw"
                        type="font-awesome"
                        color={isAdopted ? '#e76f51' : 'gray'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.description}>{currCat.description || "No description available"}</Text>
            <Divider style={styles.divider} color="#fb8500" width={2} textAlign='left' />

            <TouchableOpacity onPress={() => setIsAffectionOpen(!isAffectionOpen)}>
                <Text style={styles.sectionTitle}>Affection Level</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isAffectionOpen}>
                <Text style={styles.infoText}>
                    {currCat.affection_level 
                        ? `Affection Level: ${currCat.affection_level}` 
                        : "No affection level available"}
                </Text>
            </Collapsible>

            <TouchableOpacity onPress={() => setIsGroomingOpen(!isGroomingOpen)}>
                <Text style={styles.sectionTitle}>Grooming</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isGroomingOpen}>
                <Text style={styles.infoText}>{currCat.grooming || "N/A"}</Text>
            </Collapsible>

            <TouchableOpacity onPress={() => setIsEnergyOpen(!isEnergyOpen)}>
                <Text style={styles.sectionTitle}>Energy Level</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isEnergyOpen}>
                <Text style={styles.infoText}>{currCat.energy_level || "N/A"}</Text>
            </Collapsible>

            <TouchableOpacity onPress={() => setIsLifeSpanOpen(!isLifeSpanOpen)}>
                <Text style={styles.sectionTitle}>Life Span</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isLifeSpanOpen}>
                <Text style={styles.infoText}>{currCat.life_span || "N/A"}</Text>
            </Collapsible>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        paddingTop: 60, 
        backgroundColor: '#fefae0' 
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    backButton: {
        backgroundColor: '#f4a261',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#ED9121' 
    },
    centeredContainer: { 
        alignItems: 'center', 
        marginBottom: 20 
    },
    catImage: { 
        width: 300, 
        height: 300, 
        borderRadius: 10, 
        marginVertical: 10, 
        borderColor: '#f4a261', 
        borderWidth: 2 
    },
    description: { 
        fontSize: 16, 
        marginVertical: 10, 
        textAlign: 'center', 
        color: '#333' 
    },
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#fb8500', 
        marginTop: 15 
    },
    infoText: { 
        fontSize: 16, 
        padding: 10, 
        backgroundColor: '#e9c46a', 
        borderRadius: 8, 
        color: '#5a3e1b' 
    },
    loadingText: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    loadingTextStyle: { 
        fontSize: 16, 
        marginTop: 10, 
        color: '#ED9121' 
    },
    divider: { 
        marginVertical: 10 
    },
    favoriteAdoption: {
        position: 'absolute',
        bottom: -10,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
