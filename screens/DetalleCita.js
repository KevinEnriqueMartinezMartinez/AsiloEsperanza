import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

//import firebase from '../database/firebase'; // Inicializa la conexión

export default function App() {

  const [nombrePaciente, setNombrePaciente] = useState('');
  const [nombreDoctor, setNombreDoctor] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaLlegada, setHoraLlegada] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [estadoCita, setEstadoCita] = useState('En proceso');

  const guardarMedico = () => {
    // Aquí deberías añadir la lógica para guardar en Firebase
  };

  const reagendar = () => {
    // Aquí puedes agregar la lógica para reagendar la cita
  };

  const salir = () => {
    // Aquí puedes agregar la lógica para salir
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

  const estadoCitaStyle = {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    alignItems: 'center',
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', padding: 20 }}>
      {/* Contenedor gris para el formulario */}
      <View style={{ backgroundColor: 'lightgray', borderRadius: 15, padding: 20 }}>
        {/* Campo para el nombre del paciente */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del paciente:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={nombrePaciente}
            onChangeText={setNombrePaciente}
          />
        </View>

        {/* Campo para el nombre del doctor */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del doctor:</Text>
          <TextInput
            style={inputStyle}
            placeholder=""
            value={nombreDoctor}
            onChangeText={setNombreDoctor}
          />
        </View>

        {/* Campo para la fecha de la cita */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Fecha de cita:</Text>
          <TextInput
            style={inputStyle}
            placeholder="DD/MM/AAAA"
            value={fechaCita}
            onChangeText={(text) => setFechaCita(text)}
          />
        </View>

        {/* Campo para la hora de llegada */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Hora de llegada:</Text>
          <TextInput
            style={inputStyle}
            placeholder="HH:MM AM/PM"
            value={horaLlegada}
            onChangeText={(text) => setHoraLlegada(text)}
          />
        </View>

        {/* Campo para la hora de salida */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Hora de salida:</Text>
          <TextInput
            style={inputStyle}
            placeholder="HH:MM AM/PM"
            value={horaSalida}
            onChangeText={(text) => setHoraSalida(text)}
          />
        </View>

        {/* Campo para el estado de la cita */}
        <View style={estadoCitaStyle}>
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Estado de la cita:</Text>
          <Text>{estadoCita}</Text>
        </View>

        {/* Botones de reagendar y salir */}
        <TouchableOpacity onPress={reagendar} style={buttonStyle}>
          <Text style={buttonText}>Reagendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={salir} style={[buttonStyle, { marginTop: 10 }]}>
          <Text style={buttonText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );  
}

