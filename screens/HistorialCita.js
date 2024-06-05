import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,} from 'react-native';
import { Picker } from '@react-native-picker/picker';


//import firebase from '../database/firebase'; // Inicializa la conexión

export default function App() {

  const [nombrePaciente, setNombrePaciente] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [categoria, setCategoria] = useState('');
  const [detalle, setDetalle] = useState('');

  const guardarMedico = () => {
    // Aquí deberías añadir la lógica para guardar en Firebase
  };

  // Función para formatear la fecha
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript empiezan en 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
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

  // retorna a la vista
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', padding: 20 }}>
      {/* Campo para el nombre del paciente fuera del contenedor gris */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del paciente:</Text>
        <TextInput
          style={inputStyle}
          placeholder=""
          value={nombrePaciente}
          onChangeText={setNombrePaciente}
        />
      </View>
      
      <View style={{ backgroundColor: 'lightgray', borderRadius: 15, padding: 20 }}>
        {/* Campos para el detalle de la cita */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Fecha de cita:</Text>
          <TextInput
            style={inputStyle}
            placeholder="DD/MM/AAAA"
            value={fechaCita}
            onChangeText={(text) => setFechaCita(text)}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
  <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Categoría:</Text>
  <Picker
    selectedValue={categoria}
    style={inputStyle}
    onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
  >
    <Picker.Item label="Enfermedades Cardiovasculares" value="Enfermedades Cardiovasculares" />
    <Picker.Item label="Trastornos Neurológicos" value="Trastornos Neurológicos" />
    <Picker.Item label="Problemas Respiratorios" value="Problemas Respiratorios" />
  </Picker>
</View>


        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Detalle:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={detalle}
            onChangeText={setDetalle}
          />
        </View>

        <TouchableOpacity onPress={guardarMedico} style={buttonStyle}>
          <Text style={buttonText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
