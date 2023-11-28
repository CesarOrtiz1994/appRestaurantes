import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from '../../../../Firebase/firebaseConfig'
import { getAuth, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage si estás usando esta opción para almacenamiento local
import Toast from "react-native-root-toast";
import { Avatar, Button, TextInput } from "react-native-paper";
import { forms } from "../../../styles/forms";
import { Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const authh = getAuth(auth)

const EditProfile = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const user = authh.currentUser;
    // console.log(user.displayName)

    if (user.displayName !== 'null') {
      setDisplayName(user.displayName)
    }

  }, []);


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      const imagen = result.assets[0].uri;
      // console.log(imagen)
      setImage(imagen);
    }
  };

  // console.log(image)

  const handleSaveChanges = async () => {
    const user = authh.currentUser;
    await updateProfile(user, {
      displayName: displayName,
    })
      .then(async () => {
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
      <View style={styles.contentImage}>
        {
          image ?
          <Avatar.Image size={200} source={{ uri: image }} style={styles.imagen} />
          :
          <Avatar.Image size={200} source={require('../../../assets/avatar_gris.png')} style={styles.imagen} />
        }
        <Button onPress={pickImage} >Seleccionar imagen</Button>
      </View>
      <View style={styles.contentDatos}>

      <TextInput
        placeholder={displayName ? `Nombre actual: ${displayName}` : "Nuevo nombre"}
        style={forms.input}
        underlineColor="transparent"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />
      <Button mode="contained" onPress={handleSaveChanges} style={forms.buttonSubmit}>Guardar</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  contentImage: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  imagen: {  },
  contentDatos: {
    flex: 1,
    // marginTop: 10
  }
});

export default EditProfile;
