import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';

const RegistroPacientes = () => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Nombre:</Text>
      <TextInput style={styles.input} />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Edad:</Text>
      <TextInput style={styles.input} />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>DUI:</Text>
      <TextInput style={styles.input} />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Dirección:</Text>
      <TextInput style={styles.input} />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Peso:</Text>
      <TextInput style={styles.input} />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Nombre del contacto:
      </Text>
      <TextInput style={styles.input} />
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Número del contacto:
      </Text>
      <TextInput style={styles.input} />

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Registrar</Text>
      </Pressable>
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
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 15,
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
});

export default RegistroPacientes;
