import { styles } from './LoginScreen.style'
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../../Firebase/firebaseConfig'

const authh = getAuth(auth)

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    console.log('iniciar')
    await signInWithEmailAndPassword(authh, email, password)
      .then((userCredential) => {
        // Usuario inició sesión exitosamente
        const user = userCredential.user;
        console.log("Usuario inició sesión:", user);
        // Puedes redirigir a la pantalla de inicio aquí
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.error("Error al iniciar sesión:", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Iniciar Sesión</Text>
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
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button
        title="No tienes cuenta? Registrate"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
