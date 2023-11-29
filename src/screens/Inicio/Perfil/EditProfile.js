import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from '../../../../Firebase/firebaseConfig'
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-root-toast";
import { Avatar, Button, Divider, TextInput } from "react-native-paper";
import { forms } from "../../../styles/forms";
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./Profile.styles";
import * as Yup from 'yup'
import { useFormik } from 'formik';

const authh = getAuth(auth)

const EditProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const user = authh.currentUser;


  useEffect(() => {
    // console.log(user)
    setImage(user.photoURL)
  }, []);

  const formik = useFormik({
    initialValues: {
      name: user.displayName || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
    }),
    validateOnChange: false,
    onSubmit: async (formData) => {
      const { name } = formData;
      await updateProfile(user, {
        displayName: name,
        photoURL: image,
      }).then(async () => {
        handleProfile()
        Toast.show('Perfil actualizado correctamente.', {
          position: Toast.positions.CENTER
        })
      }).catch((error) => {
        // console.log(error)
        Toast.show('No se pudo actualizar el perfil', {
          position: Toast.positions.CENTER
        })
      });
    }
  });

  const pickImage = async () => {
    try {
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
    } catch (error) {
      console.log("Error por cancelar selección de imagen", error)
      // console.log("Imagen actual:", image)
    }
  };

  const handleProfile = () => {
    // Redirige a la pantalla de edición de perfil
    navigation.navigate("ProfileS");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.containerUser, styles.contentImageEdit]}>
        {
          image ?
            <Avatar.Image size={200} source={{ uri: image }} />
            :
            <Avatar.Image size={200} source={require('../../../assets/avatar_gris.png')} />
        }
        <Button icon='camera' onPress={pickImage} >Cambiar foto</Button>
        <Text style={styles.text1}>{user.email}</Text>
      </View>
      <TextInput
        placeholder="Nuevo nombre"
        maxLength={50}
        style={[forms.input, styles.mt20]}
        underlineColor="transparent"
        onChangeText={(text) => formik.setFieldValue('name', text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <Button
        mode="contained"
        style={forms.buttonSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >Guardar</Button>

    </View>
  );
};


export default EditProfile;
