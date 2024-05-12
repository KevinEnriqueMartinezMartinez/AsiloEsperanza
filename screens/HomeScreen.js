import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../TopBar';
import SidebarMenu from '../SidebarMenu';

const HomeScreen = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      <TopBar title="Asilo Nueva Esperanza" onPressMenu={toggleMenu} />
      <View style={styles.content}>
      
      </View>
      {isMenuOpen && <SidebarMenu onClose={toggleMenu} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
