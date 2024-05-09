import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';

const GestionPacientes = () => {
 
  const pacientes = [
    { nombre: 'Juan', edad: 30, dui: '02568794-3', direccion: 'Dirección 1', peso: 70, contacto: 'Contacto 1', telContacto: '1111111' },
    { nombre: 'María', edad: 25, dui: '89748562-8', direccion: 'Dirección 2', peso: 65, contacto: 'Contacto 2', telContacto: '2222222' },
  ];

  return (
    <View>
      <View style={styles.container}>
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Condición médica:</Text>
        <TextInput style={styles.input} />
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Fecha de creación:</Text>
        <TextInput style={styles.input} />
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Estado:</Text>
        <TextInput style={styles.input} />
      
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.text}>Filtrar</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Lista de pacientes:</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Nombre</Text>
          <Text style={styles.columnHeader}>Edad</Text>
          <Text style={styles.columnHeader}>DUI</Text>
          <Text style={styles.columnHeader}>Dirección</Text>
          <Text style={styles.columnHeader}>Peso</Text>
          <Text style={styles.columnHeader}>Contacto</Text>
          <Text style={styles.columnHeader}>Teléfono contacto</Text>
        </View>
        {pacientes.map((paciente, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.columnData}>{paciente.nombre}</Text>
            <Text style={styles.columnData}>{paciente.edad}</Text>
            <Text style={styles.columnData}>{paciente.dui}</Text>
            <Text style={styles.columnData}>{paciente.direccion}</Text>
            <Text style={styles.columnData}>{paciente.peso}</Text>
            <Text style={styles.columnData}>{paciente.contacto}</Text>
            <Text style={styles.columnData}>{paciente.telContacto}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  button: {
    marginTop:15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'orange',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 4,
    borderRadius: 8,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
  },
  columnData: {
    flex: 1,
    textAlign: 'center',
  },
});

export default GestionPacientes;
