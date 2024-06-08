import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import firebase from '../database/firebase';

export default function App() {
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      const citasSnapshot = await firebase.db.collection('Cita').get();
      const citasData = citasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCitas(citasData);
    };
    fetchCitas();
  }, []);

  const handleStatusChange = (citaId, newStatus) => {
    firebase.db.collection('Cita').doc(citaId).update({ Estado: newStatus })
      .then(() => {
        setCitas(citas.map(cita => cita.id === citaId ? { ...cita, Estado: newStatus } : cita));
        Alert.alert('exito', 'El estado de la cita ha sido actualizado.');
      })
      .catch(error => {
        Alert.alert('Error', `Error al actualizar el estado: ${error.message}`);
      });
  };

  const handleDeleteCita = (citaId) => {
    firebase.db.collection('Cita').doc(citaId).delete()
      .then(() => {
        setCitas(citas.filter(cita => cita.id !== citaId));
        Alert.alert('exito', 'La cita ha sido eliminada.');
      })
      .catch(error => {
        Alert.alert('Error', `Error al eliminar la cita: ${error.message}`);
      });
  };

  const renderCita = ({ item }) => (
    <View style={styles.citaItem}>
      <Text>Fecha: {item.Fecha}</Text>
      <Text>Paciente: {item.Paciente}</Text>
      <Text>Doctor: {item.Doctor}</Text>
      <Text>Estado: {item.Estado}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleStatusChange(item.id, 'Atendido')}>
          <Text style={styles.buttonText}>Marcar como Atendido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDeleteCita(item.id)}>
          <Text style={styles.buttonText}>Eliminar Cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={renderCita}
      />
    </View>
  );
}

const styles = {
  citaItem: {
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
