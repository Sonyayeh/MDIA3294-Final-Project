import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, Text, Divider, FAB, Overlay, Button, Icon } from 'react-native';
import { useRoute } from '@react-navigation/native';

const apiKey = 'live_yCRmGCRKzQMPxjwnLhsck2tHCvBJZakq5SIrQIv7jXBpgu2WvIXiZwobMlOkMcD6';

export default function CatDetailContainer() {
    const route = useRoute();
    const { detailId } = route.params; 

    const [currCat, setCurrCat] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);

    useEffect(() => {
        if (detailId) {
            fetchCatDetails(detailId);  
        } else {
            console.error('No detailId passed to CatDetailContainer');
        }
    }, [detailId]);

    const fetchCatDetails = async (id) => {
        try {
            const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
                headers: {
                    'x-api-key': apiKey,
                },
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();
                console.error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
                return;
            }
    
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const catData = await response.json();
                if (catData && catData.url) {
                    setCurrCat(catData);  // Set cat data only if the URL exists
                } else {
                    console.error('Received invalid cat data:', catData);
                }
            } else {
                console.error('Expected JSON response, but received:', contentType);
            }
        } catch (error) {
            console.error('Error fetching cat details:', error);
        }
    };

    if (!currCat) {
        return (
            <View style={styles.container}>
                <Text>Loading cat details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {getFeatureImageComponent(currCat)}
                <View style={styles.titleContainer}>
                    <Text h3>{currCat.name || 'Unknown Cat'}</Text>
                    <Icon
                        type='ionicon'
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        color='#cc0000'
                        onPress={() => toggleFav(currCat)}
                    />
                </View>
                <Text>{currCat.description || "No description available"}</Text>
                <Divider inset={true} insetType="middle" />
                <Text h3>Amenities</Text>
                {currCat.amenities && currCat.amenities.length > 0 ? (
                    currCat.amenities.map((amenity, index) => (
                        <Text key={index}>{amenity}</Text>
                    ))
                ) : (
                    <Text>No amenities listed</Text>
                )}
                <Divider inset={true} insetType="middle" />
            </ScrollView>
            <FAB
                onPress={() => setVisibleAlert(true)}
                placement="right"
                icon={{
                    type: 'ionicon',
                    name: 'cart',
                }}
            />
            <Overlay isVisible={visibleAlert}>
                <Text h3>Sorry</Text>
                <Text>The booking feature is currently unavailable</Text>
                <Button title="Close" onPress={() => setVisibleAlert(false)} />
            </Overlay>
        </View>
    );

    function getFeatureImageComponent(currCat) {
        // Safely check if currCat has images
        if (currCat.images && currCat.images.length > 0) {
            return (
                <Image
                    style={styles.catImage}
                    source={{ uri: currCat.images[0].url }}
                />
            );
        }

        // If no images are available, fallback to the main URL
        return (
            <Image
                style={styles.catImage}
                source={{ uri: currCat.url }}
            />
        );
    }

    function toggleFav(currCat) {
        // Handle toggling favorite logic here
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    catImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
});
