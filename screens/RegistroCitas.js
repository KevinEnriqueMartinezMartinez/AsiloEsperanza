import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, TouchableHighlight, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import firebase from '../database/firebase';

export default function App() {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [nombreDoctor, setNombreDoctor] = useState('');
  const [idDoctor, setIdDoctor] = useState('');
  const [edad, setEdad] = useState('');
  const [categoriaCita, setCategoriaCita] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [modalVisiblePaciente, setModalVisiblePaciente] = useState(false);
  const [modalVisibleDoctor, setModalVisibleDoctor] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [filteredDoctores, setFilteredDoctores] = useState([]);

  const horasDisponibles = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const categoriasDisponibles = [
    'Consulta General', 'Pediatria', 'Cardiologia', 'Dermatologia',
    'Ginecologia', 'Neurologia', 'Odontologia', 'Oftalmologia', 'Ortopedia'
  ];

  useEffect(() => {
    // Obtener los pacientes de Firebase cuando el componente se monta
    firebase.db.collection('Paciente').get().then(querySnapshot => {
      const pacientesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPacientes(pacientesData);
      setFilteredPacientes(pacientesData);
    });

    // Obtener los doctores de Firebase cuando el componente se monta
    firebase.db.collection('Doctor').get().then(querySnapshot => {
      const doctoresData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctores(doctoresData);
      setFilteredDoctores(doctoresData);
    });
  }, []);

  const handleRegistro = () => {
    try {
      // Concatenar la fecha y la hora en una cadena
      const fechaHora = `${fechaSeleccionada} ${horaSeleccionada}`;
      const fechaActual = new Date();
      const fechaSeleccionadaDate = new Date(fechaSeleccionada);

      // Verificar si la fecha seleccionada es menor o igual a la fecha actual
      if (fechaSeleccionadaDate <= fechaActual) {
        Alert.alert('Error', 'No se puede registrar una cita en una fecha pasada o el mismo dia.');
        return;
      }

      // Verificar si el doctor ya tiene una cita en la fecha y hora seleccionadas
      firebase.db.collection('Cita')
        .where('idDoc', '==', idDoctor)
        .where('Fecha', '==', fechaHora)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            const cita = {
              Doctor: nombreDoctor,
              Estado: 'Pendiente',
              Fecha: fechaHora,
              Hora: horaSeleccionada,
              Paciente: nombrePaciente,
              idDoc: idDoctor,
              idPaciente: idPaciente,
            };

            firebase.db.collection('Cita').add(cita).then(() => {
              Alert.alert('exito', 'Cita registrada exitosamente');
              // Reset form
              setNombrePaciente('');
              setIdPaciente('');
              setNombreDoctor('');
              setIdDoctor('');
              setEdad('');
              setCategoriaCita('');
              setFechaSeleccionada('');
              setHoraSeleccionada('');
            }).catch(error => {
              console.error('Error al registrar la cita:', error);
            });
          } else {
            Alert.alert('Error', 'El doctor ya tiene una cita en la fecha y hora seleccionadas');
          }
        }).catch(error => {
          console.error('Error al verificar las citas:', error);
        });
    } catch (error) {
      console.error('Error al crear la cita:', error);
    }
  };

  const handleDateSelect = (day) => {
    setFechaSeleccionada(day.dateString);
  };

  const handleEdadChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setEdad(numericText);
  };

  const handlePacienteSelect = (paciente) => {
    setNombrePaciente(paciente.nombre);
    setIdPaciente(paciente.id);
    setEdad(paciente.edad.toString());
    setModalVisiblePaciente(false);
  };

  const handleDoctorSelect = (doctor) => {
    setNombreDoctor(doctor.nombre);
    setIdDoctor(doctor.id);
    setModalVisibleDoctor(false);
  };

  const handlePacienteSearch = (text) => {
    const filtered = pacientes.filter(paciente => 
      paciente.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPacientes(filtered);
  };

  const handleDoctorSearch = (text) => {
    const filtered = doctores.filter(doctor => 
      doctor.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctores(filtered);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
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
          <Text style={styles.label}>Nombre del Paciente:</Text>
          <TouchableOpacity onPress={() => setModalVisiblePaciente(true)}>
            <TextInput
              style={styles.inputStyle}
              placeholder=""
              value={nombrePaciente}
              editable={false}
              key="nombrePaciente"
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Nombre del Doctor:</Text>
          <TouchableOpacity onPress={() => setModalVisibleDoctor(true)}>
            <TextInput
              style={styles.inputStyle}
              placeholder=""
              value={nombreDoctor}
              editable={false}
              key="nombreDoctor"
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            value={edad}
            onChangeText={handleEdadChange}
            keyboardType="numeric"
            key="edad"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Categoria de la Cita:</Text>
          <Picker
            selectedValue={categoriaCita}
            style={styles.pickerStyle}
            onValueChange={(itemValue) => setCategoriaCita(itemValue)}
            key="categoriaCita"
          >
            {categoriasDisponibles.map((categoria, index) => (
              <Picker.Item label={categoria} value={categoria} key={index} />
            ))}
          </Picker>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Hora:</Text>
          <Picker
            selectedValue={horaSeleccionada}
            style={styles.pickerStyle}
            onValueChange={(itemValue) => setHoraSeleccionada(itemValue)}
            key="horaSeleccionada"
          >
            {horasDisponibles.map((hora, index) => (
              <Picker.Item label={hora} value={hora} key={index} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Registrar Cita</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para seleccionar Paciente */}
      <Modal
        visible={modalVisiblePaciente}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisiblePaciente(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.modalSearch}
            placeholder="Buscar Paciente"
            onChangeText={handlePacienteSearch}
          />
          <FlatList
            data={filteredPacientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={() => handlePacienteSelect(item)}
              >
                <Text style={styles.modalItem}>{item.nombre}</Text>
              </TouchableHighlight>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisiblePaciente(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal para seleccionar Doctor */}
      <Modal
        visible={modalVisibleDoctor}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisibleDoctor(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.modalSearch}
            placeholder="Buscar Doctor"
            onChangeText={handleDoctorSearch}
          />
          <FlatList
            data={filteredDoctores}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={() => handleDoctorSelect(item)}
              >
                <Text style={styles.modalItem}>{item.nombre}</Text>
              </TouchableHighlight>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisibleDoctor(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = {
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSearch: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: '100%',
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
