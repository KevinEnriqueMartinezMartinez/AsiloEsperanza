import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, TouchableHighlight, Alert, ScrollView, StyleSheet } from 'react-native';
import firebase from '../database/firebase';

export default function HistorialPaciente() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [idPaciente, setIdPaciente] = useState('');
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const pacientesSnapshot = await firebase.db.collection('Paciente').get();
        const pacientesData = pacientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPacientes(pacientesData);
        setFilteredPacientes(pacientesData);
      } catch (error) {
        console.error("Error fetching patients: ", error);
      }
    };
    fetchPacientes();
  }, []);

  const handlePacienteSearch = (text) => {
    const filtered = pacientes.filter(paciente => 
      paciente.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPacientes(filtered);
  };

  const handlePacienteSelect = (paciente) => {
    setSelectedPaciente(paciente);
    setIdPaciente(paciente.id);
    setModalVisible(false);
  };

  const renderPaciente = ({ item }) => (
    <TouchableHighlight
      underlayColor="#ddd"
      onPress={() => handlePacienteSelect(item)}
    >
      <View style={styles.pacienteItem}>
        <Text>Nombre: {item.nombre}</Text>
        <Text>Edad: {item.edad}</Text>
        <Text>Direccion: {item.direccion}</Text>
        <Text>Peso: {item.peso}</Text>
        <Text>Familiar: {item.familiar}</Text>
        <Text>Número de Contacto: {item.numero}</Text>
      </View>
    </TouchableHighlight>
  );

  const buscarCitaPaciente = async () => {
    if (!idPaciente) {
      Alert.alert('Error', 'Por favor selecciona un paciente primero');
      return;
    }

    try {
      const citasSnapshot = await firebase.db.collection('Cita').where('idPaciente', '==', idPaciente).get();
      const citasData = citasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      console.log('Citas obtenidas:', citasData);

      setCitas(citasData);

      if (citasData.length === 0) {
        Alert.alert('Informacion', 'El paciente no tiene citas registradas');
      }
    } catch (error) {
      console.error("Error fetching appointments: ", error);
      Alert.alert('Error', 'No se pudieron obtener las citas del paciente');
    }
  };

  const renderCita = ({ item }) => (
    <View style={styles.citaItem}>
      <Text>Doctor: {item.Doctor}</Text>
      <Text>Estado: {item.Estado}</Text>
      <Text>Fecha: {item.Fecha}</Text>
      <Text>Hora: {item.Hora}</Text>
      <Text>Paciente: {item.Paciente}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.searchButton}>
        <Text style={styles.buttonText}>Buscar Paciente</Text>
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
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
            renderItem={renderPaciente}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeModal}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {selectedPaciente && (
        <View style={styles.pacienteDetails}>
          <Text style={styles.label}>Nombre:</Text>
          <Text>{selectedPaciente.nombre}</Text>
          <Text style={styles.label}>Edad:</Text>
          <Text>{selectedPaciente.edad}</Text>
          <Text style={styles.label}>Direccion:</Text>
          <Text>{selectedPaciente.direccion}</Text>
          <Text style={styles.label}>Peso:</Text>
          <Text>{selectedPaciente.peso}</Text>
          <Text style={styles.label}>Familiar:</Text>
          <Text>{selectedPaciente.familiar}</Text>
          <Text style={styles.label}>Número de Contacto:</Text>
          <Text>{selectedPaciente.numero}</Text>
          <TouchableOpacity onPress={buscarCitaPaciente} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Ver Citas</Text>
          </TouchableOpacity>
        </View>
      )}

      {citas.length > 0 && (
        <View style={styles.citasContainer}>
          <Text style={styles.citasTitle}>Citas del Paciente</Text>
          <FlatList
            data={citas}
            keyExtractor={(item) => item.id}
            renderItem={renderCita}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  searchButton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalSearch: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  pacienteItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  closeModal: {
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 20,
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pacienteDetails: {
    marginTop: 20,
    backgroundColor: 'lightgray',
    padding: 20,
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  citasContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  citasTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  citaItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
