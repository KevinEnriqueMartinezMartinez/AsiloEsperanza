import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import firebase from '../database/firebase'; // Inicializa la conexion

export default function App() {

  const navigation = useNavigation();

  const [carnet, setCarnet] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [jvpm, setJvpm] = useState('');
  const [nombre, setNombre] = useState('');

  const guardarMedico = () => {
    // Validacion de campos obligatorios
    if (!nombre || !carnet || !especialidad) {
      Alert.alert('Error', 'Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Validacion de campos numericos
    if (isNaN(parseInt(carnet)) || isNaN(parseInt(celular))) {
      Alert.alert('Error', 'El carnet y el telefono celular deben ser números válidos.');
      return;
    }

    // Envio de datos a Firebase
    firebase.db.collection('Doctor').add({
      carnet: parseInt(carnet),
      especialidad: especialidad,
      celular: parseInt(celular),
      correo: correo,
      jvpm: jvpm,
      nombre: nombre,
    })
    .then(() => {
      console.log('Medico registrado correctamente!');
      // Limpiar campos despues del registro exitoso
      setCarnet('');
      setEspecialidad('');
      setCelular('');
      setCorreo('');
      setJvpm('');
      setNombre('');
      Alert.alert('exito', 'Medico registrado correctamente!');
      navigation.navigate('Home');
    })
    .catch((error) => {
      console.error('Error al registrar medico: ', error);
      // Manejo de errores de Firebase
      Alert.alert('Error', 'Error al registrar medico. Por favor, intentelo de nuevo más tarde.');
    });
  };

  // estilos
  const inputStyle = {
    padding: 5,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  };

  const buttonStyle = {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  };

  const buttonText = {
    color: 'black',
    fontWeight: 'bold',
  };

  // Retorna a la vista
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', padding: 20 }}>
      <View style={{ backgroundColor: 'lightgray', borderRadius: 15, padding: 20 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del doctor:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Carnet del doctor:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={carnet}
            onChangeText={setCarnet}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Especialidad:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={especialidad}
            onChangeText={setEspecialidad}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Tel:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={celular}
            onChangeText={setCelular}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>JVPM:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={jvpm}
            onChangeText={setJvpm}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Correo:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={correo}
            onChangeText={setCorreo}
          />
        </View>

        <TouchableOpacity onPress={guardarMedico} style={buttonStyle}>
          <Text style={buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
