import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { firebase, auth } from '../database/authbd';
import { StatusBar } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const config = {
  clientId: "807110312225-m4kce52n9oaomj17caehpo2qis8q7ogq.apps.googleusercontent.com",
  redirectUri: Platform.select({
    web: 'http://localhost:8081',
    ios: 'com.yourapp://redirect',
    android: 'com.yourapp://redirect'
  }),
  scopes: ['openid', 'profile', 'email'],
};

export default function App() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === 'success') {
      const { params } = response;
      console.log('Response Params:', params);

      const { access_token } = params;

      if (access_token) {
        
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${access_token}` }
        })
          .then(response => response.json())
          .then(userInfo => {
            const credential = firebase.auth.GoogleAuthProvider.credential(null, access_token);
            auth.signInWithCredential(credential)
              .then(() => {
                Alert.alert('Login Successful', `Welcome ${userInfo.name}!`);
                navigation.navigate('Home');
              })
              .catch((error) => {
                console.error('Failed to log in with Google', error);
                Alert.alert('Login Error', 'Failed to log in with Google!');
              });
          })
          .catch((error) => {
            console.error('Failed to fetch user info', error);
            Alert.alert('Login Error', 'Failed to fetch user info!');
          });
      } else {
        console.error('Missing access_token');
        Alert.alert('Login Error', 'Failed to retrieve access_token from Google!');
      }
    }
  }, [response]);

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        Alert.alert('', 'Bienvenido Asilo Nueva Esperanza', [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }], { cancelable: false });
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error al iniciar sesión: ', error);
        Alert.alert('Login Error', 'Failed to log in with email and password!');
      }
    } else {
      console.error('Error al iniciar sesión: no datos');
      Alert.alert('Login Error', 'Please enter email and password!');
    }
  };

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/background.jpg')} style={styles.backgroundImage} />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Asilo Nueva Esperanza</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.googleButton, { marginTop: 20 }]} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
