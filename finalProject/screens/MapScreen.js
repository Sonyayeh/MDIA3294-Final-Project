import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const adoptionAgencies = [
    {
        name: 'BC SPCA Vancouver',
        descrption: '1205 E 7th Ave, Vancouver, BC',
        latitude: 49.2636,
        longitude: -123.0785,
    },

    {
        name: 'BC SPCA Burnaby',
        descrption: '3202 Norland Ave, Burnaby, BC',
        latitude: 49.2609,
        longitude: -122.9937,
    },
    {
        name: 'BC SPCA Richmond',
        descrption: '12071 No. 5 Rd, Richmond, BC',
        latitude: 49.1226,
        longitude: -123.0790,
    },
];

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 49.25,
                    longitude: -123.1,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
            >
            {adoptionAgencies.map((agency, index) => (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: agency.latitude,
                        longitude: agency.longitude,
                    }}
                    title={agency.name}
                    description={agency.description}
                />
            ))}
          </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

export default MapScreen;