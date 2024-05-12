import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import RegistroPacientes from './screens/RegistroPacientes.js';
import GestionPacientes from './screens/GestionPacientes.js';
import HomeScreen from './screens/HomeScreen.js';
import Login from './screens/Login';
import RegistroDoctores from './screens/RegistroDoctores.js';
import GestionDoctores from './screens/GestionDoctores.js';
import RegistroCitas from './screens/RegistroCitas.js';
import GestionCita from './screens/GestionCita.js';

const Stack = createStackNavigator();

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={RegistroPacientes}
          options={{
            title: 'Registro Pacientes',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={24} color="orange" />
            ),
          }}
        />
        <Stack.Screen
          name="GestionPacientes"
          component={GestionPacientes}
          options={{
            title: 'Gestion de pacientes',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={24} color="orange" />
            ),
          }}
        />
        <Stack.Screen
          name="RegistroDoctores"
          component={RegistroDoctores}
          options={{
            title: 'Registro de doctores',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={24} color="orange" />
            ),
          }}
        />
        <Stack.Screen
          name="GestionDoctores"
          component={GestionDoctores}
          options={{
            title: 'Gestion de doctores',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={24} color="orange" />
            ),
          }}
        />



        <Stack.Screen
          name="RegistroCitas"
          component={RegistroCitas}
          options={{
            title: 'Registro de citas',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={24} color="orange" />
            ),
          }}
        />
         <Stack.Screen
          name="GestionCita"
          component={GestionCita}
          options={{
            title: 'Gestion de citas',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={24} color="orange" />
            ),
          }}
        />
        
        
      </Stack.Navigator>
      
    </NavigationContainer>

  );
}

export default App;