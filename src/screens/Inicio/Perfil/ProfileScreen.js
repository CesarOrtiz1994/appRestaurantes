import { View, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {auth} from '../../../../Firebase/firebaseConfig'
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage si estás usando esta opción para almacenamiento local
import { styles } from "./Profile.styles";
import { Button, Divider } from "react-native-paper";
import { forms } from "../../../styles/forms";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../../constants/Colors";

const authh = getAuth(auth)

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(""); // Inicializa el estado local para el nombre del usuario

  useEffect(() => {
    const infoUser = authh.currentUser;
    // console.log(infoUser)
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
      {user && (
        <View style={styles.containerUser}>
          <Text style={styles.text1}>{displayName}</Text>
          <Text style={styles.text2}>{user.email}</Text>
          {/* Puedes mostrar más información del usuario según tus necesidades */}
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
