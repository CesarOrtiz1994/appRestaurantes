import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {auth} from '../../../../Firebase/firebaseConfig'
import { getAuth, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage si estás usando esta opción para almacenamiento local
import Toast from "react-native-root-toast";
import { Button, TextInput } from "react-native-paper";
import { forms } from "../../../styles/forms";

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
        // Toast.show('Perfil actualizado correctamente.', {
        //   position: Toast.positions.CENTER
        // })
      })
      .catch((error) => {
        // console.log(error)
        Toast.show('No se pudo actualizar el perfil', {
          position: Toast.positions.CENTER
        })
      });
  };

  const handleProfile = () => {
    // Redirige a la pantalla de edición de perfil
    navigation.navigate("ProfileS");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={displayName ? `Nombre actual: ${displayName}` : "Nuevo nombre"}
        style={forms.input}
        underlineColor="transparent"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />
      <Button mode="contained" onPress={handleSaveChanges} style={forms.buttonSubmit}>Guardar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 90
  },
});

export default EditProfile;
