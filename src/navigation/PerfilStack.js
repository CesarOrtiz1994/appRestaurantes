import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Inicio/Perfil/ProfileScreen";
import EditProfile from "../screens/Inicio/Perfil/EditProfile";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const PerfilStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileS" component={ProfileScreen} options={{ title: 'Perfil'}} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: '', headerTransparent: true, headerTintColor: Colors.VERDE }} />
    </Stack.Navigator>
  );
};

export default PerfilStack;
