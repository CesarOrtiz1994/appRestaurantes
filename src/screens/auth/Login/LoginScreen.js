import { styles } from './LoginScreen.style'
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../Firebase/firebaseConfig'
import { forms } from '../../../styles/forms';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';

const authh = getAuth(auth)

const LoginScreen = ({ navigation }) => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true).min(8, true)
    }),
    validateOnChange: false,
    onSubmit: async (formData) => {
      const { email, password } = formData;
      await signInWithEmailAndPassword(authh, email, password)
        .then((userCredential) => {
          // Usuario inició sesión exitosamente
          const user = userCredential.user;
          // console.log("Usuario inició sesión:", user);
          // Puedes redirigir a la pantalla de inicio aquí
        })
        .catch((error) => {
          // Handle Errors here.
          // const errorMessage = error.message;
          // console.error("Error al iniciar sesión:", errorMessage);
          Toast.show('Usuario y/o contraseña incorrectos.', {
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
      <Text style={styles.text1}>Bienvenido de nuevo!</Text>
      <Text style={styles.text2}>Inicia sesión con tu cuenta</Text>
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
        secureTextEntry
        underlineColor="transparent"
        onChangeText={(text) => formik.setFieldValue('password', text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Button
        mode="contained"
        style={forms.buttonSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Iniciar Sesión
      </Button>
      <Button
        mode="text"
        style={forms.buttonText}
        onPress={() => navigation.navigate("Register")}
      >
        Aún no tienes cuenta? Registrate
      </Button>
    </View>
  );
};

export default LoginScreen;
