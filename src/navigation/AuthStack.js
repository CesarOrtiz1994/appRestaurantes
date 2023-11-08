import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistroScreen from "../screens/auth/Registro/RegistroScreen";
import LoginScreen from "../screens/auth/Login/LoginScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Inicio de Sesión" }} />
      <Stack.Screen name="Register" component={RegistroScreen} options={{ title: "Registro" }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
