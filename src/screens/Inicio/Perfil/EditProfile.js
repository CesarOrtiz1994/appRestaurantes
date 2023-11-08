import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {auth} from '../../../../Firebase/firebaseConfig'
import { getAuth, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage si estás usando esta opción para almacenamiento local

const authh = getAuth(auth)

const EditProfile = ({navigation}) => {
  const [displayName, setDisplayName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  const user = authh.currentUser;
    console.log(user.displayName)

    if (user.displayName !== 'null') {
        setDisplayName(user.displayName)
    }

}, []);


  const handleSaveChanges = async() => {
    const user = authh.currentUser;
    await updateProfile(user, {
        displayName: displayName,
      })
      .then(async() => {
        console.log("Perfil actualizado correctamente");
        // Realiza las acciones necesarias después de guardar los cambios
        await AsyncStorage.setItem("displayName", displayName); // Si estás usando AsyncStorage
        handleProfile()
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleProfile = () => {
    // Redirige a la pantalla de edición de perfil
    navigation.navigate("ProfileS");
  };

  return (
    <View style={styles.container}>
      <Text>Editar Perfil</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder={displayName ? `Nombre actual: ${displayName}` : "Nuevo nombre"}
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        style={styles.input}
      />
      <Button title="Guardar Cambios" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default EditProfile;
