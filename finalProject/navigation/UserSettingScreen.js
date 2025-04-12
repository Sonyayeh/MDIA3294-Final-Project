import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { useUserState } from '../services/UserState';

export default function UserSettingScreen({ navigation }) {
    // get the current user
    const currUser = useUserState().getUser();

    // Check if currUser is defined
    if (!currUser) {
        return (
            <View style={styles.container}>
                <Text h2 style={styles.heading}>User not logged in</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text h2 style={styles.heading}>User Settings</Text>

            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>User id</Text>
                <Input
                    value={currUser.userId}
                    disabled={true}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>First Name</Text>
                <Input
                    value={currUser.first}
                    disabled={true}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Last Name</Text>
                <Input
                    value={currUser.last}
                    disabled={true}
                />
            </View>

            <View style={styles.logoutContainer}>
                <Button
                    title="Logout"
                    raised={true}
                    onPress={() => {
                        navigation.replace('CatNav', {
                            screen: 'Home'
                        });
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    fieldContainer: {
        width: '100%',
        padding: 5,
        alignItems: 'flex-start',
    },
    fieldLabel: {
        marginLeft: 15,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    logoutContainer: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10,
        flexShrink: 1,
    },
});