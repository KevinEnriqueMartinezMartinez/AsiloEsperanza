import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function App() {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [nombreDoctor, setNombreDoctor] = useState('');
  const [edad, setEdad] = useState('');
  const [categoriaCita, setCategoriaCita] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const handleRegistro = () => {
    console.log('Nombre del Paciente:', nombrePaciente);
    console.log('Nombre del Doctor:', nombreDoctor);
    console.log('Edad:', edad);
    console.log('Categoria de cita:', categoriaCita);
    console.log('Fecha seleccionada:', fechaSeleccionada);
  };

  const handleDateSelect = (day) => {
    setFechaSeleccionada(day.dateString);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Calendar
        onDayPress={handleDateSelect}
        style={{ marginBottom: 20 }}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      <View style={{ backgroundColor: 'lightgray', borderRadius: 15, padding: 20 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del Paciente:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            value={nombrePaciente}
            onChangeText={setNombrePaciente}
            key="nombrePaciente"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre del Doctor:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            value={nombreDoctor}
            onChangeText={setNombreDoctor}
            key="nombreDoctor"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Edad:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            value={edad}
            onChangeText={setEdad}
            key="edad"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Categoria de cita:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            value={categoriaCita}
            onChangeText={setCategoriaCita}
            key="categoriaCita"
          />
        </View>

        <TouchableOpacity onPress={handleRegistro} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  inputStyle: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  buttonStyle: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
};
