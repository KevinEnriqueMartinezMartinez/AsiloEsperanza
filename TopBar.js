import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TopBar = ({ title, onPressMenu }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={onPressMenu}>
        <Ionicons name="menu" size={35} color="orange" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    paddingTop:15,
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  menuButton: {
    position: 'absolute',
    right: 10,
    paddingTop:20
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

export default TopBar;
