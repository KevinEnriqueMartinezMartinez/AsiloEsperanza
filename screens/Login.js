import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';


import * as Google from 'expo-auth-session/providers/google';


import firebase from '../database/firebase'; // Inicializa la conexion
import { AuthSession } from 'expo';

export default function App() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



// funcion sincrona para loguearse al metodo auth de firebase
  const handleLogin = async () => {
    if (email !== '' || password !== '') {
    try {
      await firebase.firebase.auth().signInWithEmailAndPassword(email, password);
      
      Alert.alert(
        '',
        'Bienvenido Asilo Nueva Esperanza',
        [
         
          { text: 'Aceptar', onPress: () => console.log('Aceptar') }
        ],
        { cancelable: false }
      );
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al iniciar sesion: no datos', error);
    }
    }else{
      console.error('Error al iniciar sesion: no datos');
    }
  };


  const handleGoogleLogin = async () => {
    try {
      // Configuraracion del cliente con Google
      Google.setClientId('186549304054-fl8898qg611oc6ileqpkln8c60b67ifs.apps.googleusercontent.com');
  
      // Abre la ventana de inicio de sesion de Google
      const redirectUrl = await WebBrowser.openAuthSessionAsync(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Google.clientId}&redirect_uri=${encodeURIComponent(
          WebBrowser.maybeCompleteAuthSession().url
        )}&response_type=token&scope=openid%20profile%20email`
      );
  
      if (redirectUrl.type === 'success') {
        // Analiza el token de acceso de la URL de redireccionamiento
        const accessToken = redirectUrl.params.access_token;
  
        // Autenticacion con Firebase usando el token de acceso
        const credential = firebase.firebase.auth.GoogleAuthProvider.credential(null, accessToken);
        await firebase.firebase.auth().signInWithCredential(credential);
        console.error('Inicio de sesion con Google exitoso');
        navigation.navigate('Home');
      } else {
        console.error('Inicio de sesion con Google cancelado');
      }
    } catch (error) {
      console.error('Error al iniciar sesion con Google:', error);
    }
  };
  
  
  
  



  return (
    <View style={styles.container}>
      <Image source={require('../assets/background.jpg')} style={styles.backgroundImage} />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Asilo Nueva Esperanza</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electronico"
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
          <Text style={styles.buttonText}>Iniciar sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.googleButton, { marginTop: 20 }]} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Iniciar sesion con Google</Text>
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
    marginBottom: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
