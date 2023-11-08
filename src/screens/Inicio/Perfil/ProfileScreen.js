import { View, Text, Button, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {auth} from '../../../../Firebase/firebaseConfig'
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage si estás usando esta opción para almacenamiento local

const authh = getAuth(auth)

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(""); // Inicializa el estado local para el nombre del usuario

  useEffect(() => {
    const infoUser = authh.currentUser;
    console.log(infoUser)
    setUser(infoUser)
    const loadUserData = async () => {
      // Cargar la información del usuario desde el almacenamiento local o el estado global
      // Por ejemplo, si estás usando AsyncStorage:
      const storedDisplayName = await AsyncStorage.getItem("displayName");

      if (storedDisplayName) {
        setDisplayName(storedDisplayName);
      }
    };

    // Llama a la función para cargar la información del usuario cuando la pantalla se enfoca
    const unsubscribe = navigation.addListener("focus", () => {
      loadUserData();
    });
    return unsubscribe;
  }, []); // El [] vacío asegura que este efecto solo se ejecute una vez, similar a componentDidMount

  
  const handleSignOut = async() => {
    await signOut(authh)
      .then(() => {
        // Sign-out exitoso
        console.log("Usuario ha cerrado sesión correctamente");
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

  return (
    <View style={styles.container}>
      <Text>Perfil del Usuario</Text>
      {user && (
        <View>
          <Text>Nombre: {displayName}</Text>
          <Text>Correo Electrónico: {user.email}</Text>
          <Text>UID: {user.uid}</Text>
          {/* Puedes mostrar más información del usuario según tus necesidades */}
        </View>
      )}
      <Button title="Editar Perfil" onPress={handleEditProfile} />
      <Button title="Cerrar Sesión" onPress={handleSignOut} />
    </View>
  );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
