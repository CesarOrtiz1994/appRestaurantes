import { styles } from './RegistroScreen.style'
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../../Firebase/firebaseConfig'

const authh = getAuth(auth)
const RegistroScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async() => {
    console.log("Registrando usuario...");
    await createUserWithEmailAndPassword(authh, email, password)
      .then((userCredential) => {
        // Usuario registrado exitosamente
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
        // Puedes redirigir a la pantalla de inicio aquí
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.error("Error al registrar el usuario:", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Registro</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} />
      
    </View>
  );
};

export default RegistroScreen;
