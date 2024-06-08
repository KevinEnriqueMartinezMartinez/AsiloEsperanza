import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Alert
} from 'react-native';

import firebase from '../database/firebase'; // Inicializa la conexion

const RegistroPacientes = () => {

  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [dui, setDui] = useState('');
  const [direccion, setDireccion] = useState('');
  const [peso, setPeso] = useState('');
  const [nombreContacto, setNombreContacto] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');


  const guardarPaciente = () => {
    // Validar que todos los campos tengan datos
    if (!dui || !nombre || !edad || !direccion || !peso || !nombreContacto || !numeroContacto) {
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios',
        [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
        { cancelable: false }
      );
      return;
    }
  
    // Validar que los campos numericos realmente sean números
    const parsedEdad = parseInt(edad);
    const parsedPeso = parseInt(peso);
    const parsedNumeroContacto = parseInt(numeroContacto);
  
    if (isNaN(parsedEdad) || isNaN(parsedPeso) || isNaN(parsedNumeroContacto)) {
      Alert.alert(
        'Error',
        'Edad, Peso y Número de contacto deben ser valores numericos',
        [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
        { cancelable: false }
      );
      return;
    }
  
    // Verificar si el DUI ya existe en la base de datos
    firebase.db.collection('Paciente').where('dui', '==', dui).get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // El DUI ya existe, mostrar mensaje de error
          Alert.alert(
            'Error',
            'Ya existe un paciente con este DUI',
            [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
            { cancelable: false }
          );
          return Promise.reject('DUI repetido');
        }
  
        // El DUI no existe, proceder con el registro del paciente
        return firebase.db.collection('Paciente').add({
          dui: dui,
          nombre: nombre,
          edad: parsedEdad, // Usa los valores convertidos
          direccion: direccion, // Corrige el nombre del campo
          peso: parsedPeso, // Usa los valores convertidos
          familiar: nombreContacto, // Nombre de contacto
          numero: parsedNumeroContacto, // Usa los valores convertidos
          fechaexp: new Date().toLocaleDateString(), // Usar la fecha actual
          estado: 'en proceso', // Estado por defecto
          codicion: 'En tratamiento',
        });
      })
      .then(() => {
        Alert.alert(
          '',
          'Registro Correcto',
          [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
          { cancelable: false }
        );
        navigation.navigate('Home');
        console.log('Paciente registrado correctamente!');
      })
      .catch((error) => {
        if (error !== 'DUI repetido') {
          console.error('Error al registrar paciente: ', error);
          Alert.alert(
            'Error',
            'Hubo un problema al registrar el paciente',
            [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
            { cancelable: false }
          );
        }
      });
  };
  

  



  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Edad:</Text>
      <TextInput
        style={styles.input}
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric" // muestra el teclado numerico
      />
 <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>DUI:</Text>
<TextInput
  style={styles.input}
  value={dui}
  onChangeText={text => {
    // Aplicar la validacion utilizando una expresion regular
    const formattedText = text.replace(/\D/g, '').substring(0, 9); // Elimina caracteres no numericos y limita a 9 digitos
    setDui(formattedText);
  }}
  keyboardType="numeric" // Muestra el teclado numerico
/>
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Direccion:</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
      />
<Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Peso:</Text>
<TextInput
  style={styles.input}
  value={peso}
  onChangeText={text => {
    // Aplicar la validacion utilizando una expresion regular y un rango máximo
    const formattedText = text.replace(/[^0-9.]/g, ''); // Elimina caracteres no numericos excepto puntos decimales
    const numericValue = parseFloat(formattedText); // Convierte el texto a un número flotante
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 300) {
      setPeso(formattedText); // Establece el nuevo valor si está dentro del rango permitido
    }
  }}
  keyboardType="numeric" // Muestra el teclado numerico
/>

      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Nombre del contacto:
      </Text>
      <TextInput
        style={styles.input}
        value={nombreContacto}
        onChangeText={setNombreContacto}
      />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Numero del contacto:
      </Text>
      <TextInput
        style={styles.input}
        value={numeroContacto}
        onChangeText={setNumeroContacto}
        keyboardType="phone-pad" // muestra el teclado numerico con una opcion de marcasion
      />

      <Pressable style={styles.button} onPress={guardarPaciente}>
        <Text style={styles.text}>Registrar</Text>
      </Pressable>
    </View>
  );
};

// estilos
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'orange',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});

export default RegistroPacientes;
