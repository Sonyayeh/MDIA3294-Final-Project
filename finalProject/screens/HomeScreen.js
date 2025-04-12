import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, ScrollView } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInputControl from '../components/TextInputControl';
import { authenticate } from '../services/LoginManager';
import { useUserState } from '../services/UserState';
import { themePalette } from '../theme/royalTheme';

const schema = yup.object({
  username: yup.string().trim().required("required"),
  password: yup.string().trim().required("required")
});

export default function AdoptionHomeScreen({ navigation }) {
  const userState = useUserState();
  const [loginError, setLoginError] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "A00000001",
      password: "password01",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    userState.clearUser();
  }, []);

  const onLogin = (data) => {
    const status = authenticate(data);
    if (status !== false) {
      userState.setUser(status);
      navigation.replace('CatListScreen');
    } else {
      setLoginError(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: 'https://i.imgur.com/HnJJQjD.jpeg' }}
        resizeMode="cover"
      />

      <View style={styles.container}>
        <Text h1 style={styles.title}>Adoptly 🐾</Text>

       

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text h3 style={{ marginBottom: 10 }}>Find Your Best Friend</Text>

          <TextInputControl
            control={control}
            errors={errors}
            inputMode="text"
            placeholder="username"
            fieldname="username"
          />

          <TextInputControl
            control={control}
            errors={errors}
            inputMode="text"
            secureEntry={true}
            placeholder="password"
            fieldname="password"
          />

        <Button
          title="Login"
          raised
          onPress={() => {
            handleSubmit((data) => {
              onLogin(data);
              navigation.navigate('PetScreen');
            })();
          }}
          containerStyle={{ marginVertical: 10 }}
        />


          {loginError && (
            <Text style={{ color: themePalette.error, fontWeight: 'bold' }}>
              Login error, try again or continue as guest
            </Text>
          )}

          <View style={styles.buttonRow}>
            <Button
              title="Sign Up"
              raised
              onPress={() => {
                handleSubmit(onLogin)();
                navigation.navigate('PetScreen');
              }}              
            />
            <Button
              title="Continue as Guest"
              raised
              onPress={() => navigation.navigate('PetScreen')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(60, 162, 235, 0.5)',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginTop: 150,
    marginBottom: 20,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9c46a',
    padding: 10,
    marginTop: 30,
    gap: 30,
    borderRadius: 10,
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    marginTop: 100,
    backgroundColor: 'rgba(60, 162, 235, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
});
