import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import TopBar from '../TopBar';
import SidebarMenu from '../SidebarMenu';

const HomeScreen = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mensaje de bienvenida 
  const welcomeMessage = "¡Bienvenido al Asilo Nueva Esperanza! Donde cada día es una nueva oportunidad para crear recuerdos inolvidables.";

  // Programacion de Eventos
  const latestEvents = [
    { title: "Concierto de Piano", date: "15 de mayo", location: "Salón Principal" },
    { title: "Taller de Manualidades", date: "20 de mayo", location: "Sala de Actividades" },
    { title: "Sesión de Cine", date: "25 de mayo", location: "Sala de TV" },
    { title: "Charla sobre Nutrición", date: "30 de mayo", location: "Comedor" },
    { title: "Bingo Nocturno", date: "5 de junio", location: "Salón de Juegos" },
    { title: "Visita de Terapia con Mascotas", date: "10 de junio", location: "Patio Exterior" },
    { title: "Fiesta de Cumpleaños", date: "15 de junio", location: "Salón de Fiestas" },
    { title: "Sesión de Ejercicio Ligero", date: "20 de junio", location: "Gimnasio" },
    { title: "Noche de Karaoke", date: "25 de junio", location: "Salón Principal" },
    { title: "Clase de Baile", date: "30 de junio", location: "Salón de Baile" },
    
  ];

  return (
    <View style={styles.container}>
      <TopBar title="Asilo Nueva Esperanza" onPressMenu={toggleMenu} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
        <Text style={styles.sectionTitle}>Programacion de Eventos</Text>
        {latestEvents.map((event, index) => (
          <TouchableOpacity key={index} style={styles.eventContainer} onPress={() => alert(`Evento: ${event.title}`)}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text>{`Fecha: ${event.date} | Lugar: ${event.location}`}</Text>
          </TouchableOpacity>
        ))}
        {/* Acceso rápido a Funciones Importantes */}
        
      </ScrollView>
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
    flexGrow: 1,
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#347af0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
