import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../database/firebase'; // Inicializa la conexión

export default function App() {


  const [carnet, setCarnet] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [jvpm, setJvpm] = useState('');
  const [nombre, setNombre] = useState('');


  const guardarMedico = () => {
    firebase.db.collection('Doctor').add({
      carnet: parseInt(carnet),
      especialidad: especialidad,
      celular: parseInt(celular),
      correo: correo,
      jvpm: jvpm,
      nombre: nombre,
    })
    .then(() => {
      console.log('Médico registrado correctamente!');
      // Aquí podrías mostrar un mensaje de éxito o redireccionar a otra pantalla
    })
    .catch((error) => {
      console.error('Error al registrar médico: ', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    });
  };




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
          <Text style={{ marginBottom: 10,fontWeight: 'bold' }}>Carnet del doctor:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={carnet}
            onChangeText={setCarnet}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10,fontWeight: 'bold' }}>Especialidad:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={especialidad}
            onChangeText={setEspecialidad}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10,fontWeight: 'bold' }}>Tel:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={celular}
            onChangeText={setCelular}
          />
        </View>

        <View style={{ marginBottom: 10,fontWeight: 'bold' }}>
          <Text style={{ marginBottom: 10,fontWeight: 'bold' }}>JVPM:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={jvpm}
            onChangeText={setJvpm}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10,fontWeight: 'bold'}}>Correo:</Text>
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

