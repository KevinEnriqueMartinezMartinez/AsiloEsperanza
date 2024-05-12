import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';

import firebase from '../database/firebase'; // Inicializa la conexión

const RegistroPacientes = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [dui, setDui] = useState('');
  const [direccion, setDireccion] = useState('');
  const [peso, setPeso] = useState('');
  const [nombreContacto, setNombreContacto] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');


  const guardarPaciente = () => {
    firebase.db.collection('Paciente').add({
      dui: dui,
      nombre: nombre,
      edad: parseInt(edad), // Convertir a número
      dirrecion: direccion, // Corregir el nombre del campo
      peso: parseInt(peso), // Convertir a número
      familiar: nombreContacto, // Utilizar el campo 'familiar' para nombre del contacto
      numero: parseInt(numeroContacto), // Convertir a número
      fechaexp: new Date().toLocaleDateString(), // Usar la fecha actual
      estado: 'en proceso', // Estado por defecto
      codicion: 'En tratamiento', // Condición por defecto
    })
    .then(() => {
      console.log('Paciente registrado correctamente!');
      // Aquí podrías mostrar un mensaje de éxito o redireccionar a otra pantalla
    })
    .catch((error) => {
      console.error('Error al registrar paciente: ', error);
      // Aquí podrías mostrar un mensaje de error al usuario
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
        keyboardType="numeric" // Esto mostrará el teclado numérico
      />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>DUI:</Text>
      <TextInput
        style={styles.input}
        value={dui}
        onChangeText={setDui}
        keyboardType="numeric" // Esto mostrará el teclado numérico
      />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Dirección:</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
      />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Peso:</Text>
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric" // Esto mostrará el teclado numérico
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
        Número del contacto:
      </Text>
      <TextInput
        style={styles.input}
        value={numeroContacto}
        onChangeText={setNumeroContacto}
        keyboardType="phone-pad" // Esto mostrará el teclado numérico con opción de marcación
      />

      <Pressable style={styles.button} onPress={guardarPaciente}>
        <Text style={styles.text}>Registrar</Text>
      </Pressable>
    </View>
  );
};


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
