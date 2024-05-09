import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [tel, setTel] = useState('');
  const [jvpm, setJVPM] = useState('');
  const [correo, setCorreo] = useState('');

  const handleRegistro = () => {
    console.log('Nombre:', nombre);
    console.log('Carnet:', carnet);
    console.log('Especialidad:', especialidad);
    console.log('Tel:', tel);
    console.log('JVPM:', jvpm);
    console.log('Correo:', correo);
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
            value={tel}
            onChangeText={setTel}
          />
        </View>

        <View style={{ marginBottom: 10,fontWeight: 'bold' }}>
          <Text style={{ marginBottom: 10,fontWeight: 'bold' }}>JVPM:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={jvpm}
            onChangeText={setJVPM}
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

        <TouchableOpacity onPress={handleRegistro} style={buttonStyle}>
          <Text style={buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

