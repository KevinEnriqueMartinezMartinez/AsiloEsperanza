import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SidebarMenu = ({ onClose }) => {
  const menuRef = useRef(null);

  const navigation = useNavigation();

  const navigateToForm = () => {
    onClose();
    navigation.navigate('Form');
  };
 
 const navigateToGestionPacientes = () =>{
   onClose();
   navigation.navigate('GestionPacientes')
 }

 const navigateCerrarSession = () =>{
   navigation.navigate('Login')
 }

  const navigateToRegistroDoctores = () =>{
   navigation.navigate('RegistroDoctores')
 }

  const navigateToGestionDoctores = () =>{
   navigation.navigate('GestionDoctores')
 } 

 const navigateToRegistroCitas= () =>{
  navigation.navigate('RegistroCitas')
} 

const navigateToGestionCita= () =>{
  navigation.navigate('GestionCita')
} 

 const closedSideBar = () => {
   onClose();
 }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
 
  }, [onClose]);

  return (
    <View ref={menuRef} style={styles.container}>
    <TouchableOpacity style={styles.menuItem} onPress={closedSideBar}>
        <Text> <Ionicons name="close" size={35} color="orange" /></Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={navigateToForm}>
        <Text style={styles.menuText}>Registro de pacientes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={navigateToGestionPacientes}>
        <Text style={styles.menuText}>Gestión de pacientes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={navigateToRegistroDoctores}>
        <Text style={styles.menuText}>Registro de doctores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={navigateToGestionDoctores}>
        <Text style={styles.menuText}>Gestión de doctores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={navigateToRegistroCitas}>
        <Text style={styles.menuText}>Registro Citas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={navigateToGestionCita}>
        <Text style={styles.menuText}>Gestion Citas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={navigateCerrarSession}>
        <Text style={styles.menuText}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    width: '60%',
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SidebarMenu;
