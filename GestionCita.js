import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [fechaCita, setFechaCita] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [nombreDoctor, setNombreDoctor] = useState('');
  const [edad, setEdad] = useState('');
  const [categoriaCita, setCategoriaCita] = useState('');
  const [observacion, setObservacion] = useState('');

  const handleRegistro = () => {
    console.log('Fecha de Cita:', fechaCita);
    console.log('Nombre del paciente:', nombrePaciente);
    console.log('Nombre del Doctor:', nombreDoctor);
    console.log('Edad:', edad);
    console.log('Categoria de Cita:', categoriaCita);
    console.log('Observacion:', observacion);
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
        {}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Fecha de Cita:</Text>
          <TextInput
            style={inputStyle}
            placeholder="DD/MM/AAAA"
            value={fechaCita}
            onChangeText={setFechaCita}
          />
        </View>

        {}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del paciente:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={nombrePaciente}
            onChangeText={setNombrePaciente}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del Doctor:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={nombreDoctor}
            onChangeText={setNombreDoctor}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Edad:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={edad}
            onChangeText={setEdad}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Categoria de Cita:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={categoriaCita}
            onChangeText={setCategoriaCita}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Observacion:</Text>
          <TextInput
            style={{ ...inputStyle, height: 100 }} 
            placeholder=""
            value={observacion}
            onChangeText={setObservacion}
            multiline={true}
            numberOfLines={6}
          />
        </View>

        <TouchableOpacity onPress={handleRegistro} style={buttonStyle}>
          <Text style={buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
