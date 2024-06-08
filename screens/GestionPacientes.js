import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Modal,Alert } from 'react-native';
import firebase from '../database/firebase'; // Asegúrate de que la ruta sea correcta

const GestionPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [pacientesOriginal, setPacientesOriginal] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    const snapshot = await firebase.db.collection('Paciente').get();
    const pacientesList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPacientes(pacientesList);
    setPacientesOriginal(pacientesList);
  };

  const handleSearch = () => {
    const filteredPacientes = pacientesOriginal.filter(paciente => 
      paciente.nombre.toLowerCase().includes(search.toLowerCase()) ||
      (paciente.dui && paciente.dui.includes(search))
    );
    setPacientes(filteredPacientes);
  };

  const handleEdit = (id) => {
    const patientToEdit = pacientes.find(patient => patient.id === id);
    setEditingPatient(patientToEdit);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Verificar si el DUI ya existe en la base de datos
      const querySnapshot = await firebase.db.collection('Paciente').where('dui', '==', editingPatient.dui).get();
      if (!querySnapshot.empty) {
        // El DUI ya existe, mostrar mensaje de error
        Alert.alert(
          'Error',
          'Ya existe un paciente con este DUI',
          [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
          { cancelable: false }
        );
        return;
      }
  
      // El DUI no existe, proceder con la actualizacion del paciente
      await firebase.db.collection('Paciente').doc(editingPatient.id).update(editingPatient);
      fetchPacientes(); // Actualiza la lista despues de guardar los cambios
      setModalVisible(false); // Cierra el modal despues de guardar
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const handleDelete = async (id) => {
    // Aqui puedes implementar la logica para eliminar el paciente con el ID proporcionado
    try {
      await firebase.db.collection('Paciente').doc(id).delete();
      fetchPacientes(); // Actualiza la lista despues de eliminar el paciente
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
    }
  };
  
  

  const handleCancelEdit = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre o DUI"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar" onPress={handleSearch} />

      <FlatList
        data={pacientes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Edad: {item.edad}</Text>
            <Text>DUI: {item.dui}</Text>
            <Text>Direccion: {item.direccion}</Text>
            <Text>Peso: {item.peso}</Text>
            <Text>Contacto: {item.familiar}</Text>
            <Text>Telefono Contacto: {item.numero}</Text>
            <Button title="Editar" onPress={() => handleEdit(item.id)} />
            <Button title="Eliminar" onPress={() => {
  Alert.alert(
    'Confirmar eliminacion',
    '¿Estás seguro de que deseas eliminar este paciente?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => handleDelete(item.id) }
    ]
  );
}} />
          </View>
        )}
      />

<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={handleCancelEdit}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text>Editar Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={editingPatient ? editingPatient.nombre : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, nombre: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={editingPatient ? editingPatient.edad.toString() : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, edad: parseInt(text) || 0 }))}
      />
      <TextInput
        style={styles.input}
        placeholder="DUI"
        value={editingPatient ? editingPatient.dui : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, dui: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Direccion"
        value={editingPatient ? editingPatient.direccion : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, direccion: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        keyboardType="numeric"
        value={editingPatient ? editingPatient.peso.toString() : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, peso: parseFloat(text) || 0 }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Contacto del Familiar"
        value={editingPatient ? editingPatient.familiar : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, familiar: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono de Contacto"
        keyboardType="phone-pad"
        value={editingPatient ? editingPatient.numero : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, numero: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={editingPatient ? editingPatient.estado : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, estado: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Condicion"
        value={editingPatient ? editingPatient.condicion : ''}
        onChangeText={(text) => setEditingPatient(prevState => ({ ...prevState, condicion: text }))}
      />
      <Button title="Guardar" onPress={handleSaveEdit} />
      <Button title="Cancelar" onPress={handleCancelEdit} />
    </View>
  </View>
</Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  patientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default GestionPacientes;
