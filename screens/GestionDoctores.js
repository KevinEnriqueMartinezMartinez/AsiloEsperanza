import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Modal, TouchableOpacity, Alert } from 'react-native';
import firebase from '../database/firebase';

const GestionDoctores = () => {
  const [doctores, setDoctores] = useState([]);
  const [search, setSearch] = useState('');
  const [doctoresOriginal, setDoctoresOriginal] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDoctores();
  }, []);

  const fetchDoctores = async () => {
    const snapshot = await firebase.db.collection('Doctor').get();
    const doctoresList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDoctores(doctoresList);
    setDoctoresOriginal(doctoresList);
  };

  const handleSearch = () => {
    const filteredDoctores = doctoresOriginal.filter(doctor => 
      doctor.nombre.toLowerCase().includes(search.toLowerCase()) ||
      (doctor.jvpm && doctor.jvpm.includes(search))
    );
    setDoctores(filteredDoctores);
  };

  const handleEdit = (id) => {
    const doctorToEdit = doctores.find(doctor => doctor.id === id);
    setEditingDoctor(doctorToEdit);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Verificar si el doctor editado tiene el mismo ID que otro doctor en la base de datos
      const existingDoctorSnapshot = await firebase.db.collection('Doctor').doc(editingDoctor.id).get();
      if (!existingDoctorSnapshot.exists) {
        // No existe ningún doctor con el ID del doctor editado, proceder con la validacion del JVPM y número de carnet
        // Verificar si el JVPM ya existe en la base de datos
        const jvpmSnapshot = await firebase.db.collection('Doctor').where('jvpm', '==', editingDoctor.jvpm).get();
        if (!jvpmSnapshot.empty) {
          // El JVPM ya existe, mostrar mensaje de error
          Alert.alert(
            'Error',
            'Ya existe un doctor con este número de registro profesional (JVPM)',
            [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
            { cancelable: false }
          );
          return;
        }
  
        // Verificar si el número de carnet ya existe en la base de datos
        const carnetSnapshot = await firebase.db.collection('Doctor').where('carnet', '==', editingDoctor.carnet).get();
        if (!carnetSnapshot.empty) {
          // El número de carnet ya existe, mostrar mensaje de error
          Alert.alert(
            'Error',
            'Ya existe un doctor con este número de carnet',
            [{ text: 'Aceptar', onPress: () => console.log('Aceptar') }],
            { cancelable: false }
          );
          return;
        }
      }
  
      // El JVPM y el número de carnet son únicos o el doctor editado es el mismo que se está editando, proceder con la actualizacion del doctor
      await firebase.db.collection('Doctor').doc(editingDoctor.id).update({
        nombre: editingDoctor.nombre,
        jvpm: editingDoctor.jvpm,
        especialidad: editingDoctor.especialidad,
        carnet: editingDoctor.carnet,
        celular: editingDoctor.celular,
        correo: editingDoctor.correo,
      });
      
      // Actualizar la lista de doctores despues de guardar los cambios
      const updatedDoctores = doctores.map(doctor => {
        if (doctor.id === editingDoctor.id) {
          return editingDoctor;
        }
        return doctor;
      });
      setDoctores(updatedDoctores);
      setModalVisible(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };
  
  
  

  const handleDelete = async (id) => {
    try {
      await firebase.db.collection('Doctor').doc(id).delete();
      const updatedDoctores = doctores.filter(doctor => doctor.id !== id);
      setDoctores(updatedDoctores);
    } catch (error) {
      console.error("Error al eliminar el doctor:", error);
    }
  };

  const handleCancelEdit = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre o JVPM"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar" onPress={handleSearch} />

      <FlatList
        data={doctores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.doctorItem}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>JVPM: {item.jvpm}</Text>
            <Text>Especialidad: {item.especialidad}</Text>
            <Text>Carnet: {item.carnet}</Text>
            <Text>Celular: {item.celular}</Text>
            <Text>Correo: {item.correo}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item.id)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={() => handleDelete(item.id)}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
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
      <Text>Editar Doctor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={editingDoctor ? editingDoctor.nombre : ''}
        onChangeText={(text) => setEditingDoctor(prevState => ({ ...prevState, nombre: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="JVPM"
        value={editingDoctor ? editingDoctor.jvpm : ''}
        onChangeText={(text) => setEditingDoctor(prevState => ({ ...prevState, jvpm: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        value={editingDoctor ? editingDoctor.especialidad : ''}
        onChangeText={(text) => setEditingDoctor(prevState => ({ ...prevState, especialidad: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Carnet"
        keyboardType="numeric"
        value={editingDoctor ? editingDoctor.carnet.toString() : ''}
        onChangeText={(text) => setEditingDoctor(prevState => ({ ...prevState, carnet: parseInt(text) || 0 }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Celular"
        keyboardType="numeric"
        value={editingDoctor ? editingDoctor.celular.toString() : ''}
        onChangeText={(text) => setEditingDoctor(prevState => ({ ...prevState, celular: parseInt(text) || 0 }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={editingDoctor ? editingDoctor.correo : ''}
        onChangeText={(text) => setEditingDoctor(prevState => ({ ...prevState, correo: text }))}
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
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  doctorItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default GestionDoctores;
