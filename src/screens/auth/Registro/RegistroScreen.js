import { styles } from './RegistroScreen.style'
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../Firebase/firebaseConfig'
import { forms } from '../../../styles/forms';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';

const authh = getAuth(auth)
const RegistroScreen = ({ navigation }) => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true).min(8, true),
      repeatPassword: Yup.string().required(true).min(8, true).oneOf([Yup.ref('password')], true)
    }),
    validateOnChange: false,
    onSubmit: async (formData) => {
      const { email, password } = formData;
      await createUserWithEmailAndPassword(authh, email, password)
        .then((userCredential) => {
          // Usuario registrado exitosamente
          const user = userCredential.user;
          // console.log("Usuario registrado:", user);
          // Puedes redirigir a la pantalla de inicio aquí
        })
        .catch((error) => {
          // Handle Errors here.
          // const errorMessage = error.message;
          // console.error("Error al registrar el usuario:", errorMessage);
          Toast.show('Error al registrar el usuario.', {
            position: Toast.positions.CENTER
          })
        });
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.imgLogo}>
        <Image source={require('../../../assets/logo.png')} style={styles.image} />
      </View>
      <Text style={styles.text1}>Bienvenido</Text>
      <Text style={styles.text2}>Crea tu cuenta</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={forms.input}
        autoCapitalize='none'
        underlineColor="transparent"
        onChangeText={(text) => formik.setFieldValue('email', text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextInput
        placeholder="Contraseña"
        style={forms.input}
        underlineColor="transparent"
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue('password', text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <TextInput
        label="Repetir contraseña"
        style={forms.input}
        underlineColor="transparent"
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <Button
        mode="contained"
        style={forms.buttonSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >Registrar</Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Login")}
        style={forms.buttonText}
      >Ya tienes una cuenta? Inicia sesión</Button>
    </View>
  );
};

export default RegistroScreen;
