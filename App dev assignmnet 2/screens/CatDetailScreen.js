import { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';  // Import Collapsible component
import { Divider } from '@rneui/themed';  // Import Divider component for separating sections

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

    useEffect(() => {
        const uri = `https://api.thecatapi.com/v1/breeds`;
    
        fetch(uri, {
            headers: {
                'x-api-key': apiKey,
            },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((result) => {
            // Find the breed with the correct ID
            const selectedCat = result.find(cat => cat.id === detailId);
            
            if (!selectedCat) {
                throw new Error("Breed not found!");
            }
    
            setCurrCat(selectedCat);
    
            // Fetch image if available
            if (selectedCat.reference_image_id) {
                fetch(`https://api.thecatapi.com/v1/images/${selectedCat.reference_image_id}`, {
                    headers: {
                        'x-api-key': apiKey,
                    },
                })
                .then(res => res.json())
                .then((imageData) => {
                    setCatImageUrl(imageData.url);
                })
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
            setTimeout(() => {
                setLoadingDelay(true); // Show the loading screen after the delay
            }, 1000);
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
            {/* Centered Container for Title and Image */}
            <View style={styles.centeredContainer}>
                <Text style={styles.title}>{currCat.name}</Text>
                {catImageUrl ? (
                    <Image
                        style={styles.catImage}
                        source={{ uri: catImageUrl }}
                    />
                ) : (
                    <Image
                        style={styles.catImage}
                        source={{ uri: 'https://via.placeholder.com/150' }}  // Default image if no image URL
                    />
                )}
            </View>

            {/* Paragraph with cat's description */}
            <Text style={styles.description}>{currCat.description || "No description available"}</Text>

            {/* Divider between Paragraph and Sections */}
            <Divider style={styles.divider} color="#fb8500" width={2} textAlign='left' />
            
            {/* Collapsible Section for Affection Level */}
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

            {/* Collapsible Section for Grooming */}
            <TouchableOpacity onPress={() => setIsGroomingOpen(!isGroomingOpen)}>
                <Text style={styles.sectionTitle}>Grooming</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isGroomingOpen}>
                <Text style={styles.infoText}>{currCat.grooming || "N/A"}</Text>
            </Collapsible>

            {/* Collapsible Section for Energy Level */}
            <TouchableOpacity onPress={() => setIsEnergyOpen(!isEnergyOpen)}>
                <Text style={styles.sectionTitle}>Energy Level</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isEnergyOpen}>
                <Text style={styles.infoText}>{currCat.energy_level || "N/A"}</Text>
            </Collapsible>

            {/* Collapsible Section for Life Span */}
            <TouchableOpacity onPress={() => setIsLifeSpanOpen(!isLifeSpanOpen)}>
                <Text style={styles.sectionTitle}>Life Span</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isLifeSpanOpen}>
                <Text style={styles.infoText}>{currCat.life_span || "N/A"}</Text>
            </Collapsible>

            {/* Back to Cat List Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back to Cat List</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FED8B1",  // Consistent background color
        padding: 20,
    },

    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        paddingTop: 50,
    },

    catImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'cover',
    },

    description: {
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
        textAlign: 'center',
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'left',
        padding: 10,
        backgroundColor: '#ED9121',
        borderRadius: 5,
    },

    infoText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'left',
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    loadingText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    loadingTextStyle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
    },

    divider: {
        marginVertical: 20,
    },

    

    backButtonText: {
        color: '#ED9121',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', 
        width: '100%', 
    },
});