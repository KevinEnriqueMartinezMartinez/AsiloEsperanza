import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [especialidad, setEspecialidad] = useState('');
  const [estado, setEstado] = useState('');

  const handleFiltrar = () => {
    console.log('Especialidad:', especialidad);
    console.log('Estado:', estado);
    //  lógica para filtrar los datos según la especialidad y el estado
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

  const tableContainerStyle = {
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  };

  // Datos estáticos para la tabla
  const datoEstatico = {
    nombreDoctor: 'Dr. Gerardo',
    apellido: 'Marroquin',
    JVPM: '12345',
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', padding: 20 }}>
      <View style={{ backgroundColor: 'lightgray', borderRadius: 15, padding: 20 }}>
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
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Estado:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={estado}
            onChangeText={setEstado}
          />
        </View>

        <TouchableOpacity onPress={handleFiltrar} style={buttonStyle}>
          <Text style={buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Texto "Lista de Doctores" fuera del formulario y la tabla */}
      <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left', marginTop: 20, marginLeft: 20 }}>Lista de Doctores:</Text>

      {/* Tabla */}
      <View style={tableContainerStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Nombre del Doctor</Text>
          <Text style={{ fontWeight: 'bold' }}>Apellido</Text>
          <Text style={{ fontWeight: 'bold' }}>JVPM</Text>
        </View>
        {/* Fila de datos estáticos */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text>{datoEstatico.nombreDoctor}</Text>
          <Text>{datoEstatico.apellido}</Text>
          <Text>{datoEstatico.JVPM}</Text>
        </View>
      </View>
    </View>
  );
}
