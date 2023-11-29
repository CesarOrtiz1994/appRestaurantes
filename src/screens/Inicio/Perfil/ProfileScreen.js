import { View, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../../../../Firebase/firebaseConfig'
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage si estás usando esta opción para almacenamiento local
import { styles } from "./Profile.styles";
import { Avatar, Button, Divider } from "react-native-paper";
import { forms } from "../../../styles/forms";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const authh = getAuth(auth)

const ProfileScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [photo, setPhoto] = useState(null);
  
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = authh.onAuthStateChanged((user) => {
        setDisplayName(user?.displayName);
        setEmail(user?.email);
        setPhoto(user?.photoURL)
      });

      return unsubscribe;
    }, [])
  )


  const handleSignOut = async () => {
    await signOut(authh)
      .then(async () => {
        // Sign-out exitoso
        console.log("Usuario ha cerrado sesión correctamente");
        await AsyncStorage.removeItem("displayName");
      })
      .catch((error) => {
        // Manejar errores aquí
        console.error("Error al cerrar sesión:", error);
      });
  };

  const handleEditProfile = () => {
    // Redirige a la pantalla de edición de perfil
    navigation.navigate("EditProfile");
  };

  const handleFavoritos = () => {
    // Redirige a la pantalla de edición de perfil
    navigation.navigate("Favorites");
  };

  return (
    <View style={styles.container}>
      {email && (
        <View style={styles.containerUser}>
          {
            photo ?
              <Avatar.Image size={200} source={{ uri: photo }} />
              :
              <Avatar.Image size={200} source={require('../../../assets/avatar_gris.png')} />
          }
          <Text style={styles.text1}>{displayName}</Text>
          <Text style={styles.text2}>{email}</Text>
        </View>
      )}

      <Button mode="contained" style={[forms.buttonTextSecundary, styles.btnEditar]} onPress={handleEditProfile} >Editar</Button>
      <Divider />
      <Button mode="text" style={[forms.buttonText]} onPress={handleFavoritos} >
        <AwesomeIcon name='heart' color={Colors.VERDE} style={styles.iconFav} />    Mis restaurantes favoritos
      </Button>
      <Button mode="contained" style={[forms.buttonText, styles.btnCerrar]} onPress={handleSignOut} >Cerrar Sesión</Button>
    </View>
  );
};

export default ProfileScreen;
