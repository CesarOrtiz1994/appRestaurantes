import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Inicio/Perfil/ProfileScreen";
import EditProfile from "../screens/Inicio/Perfil/EditProfile";

const Stack = createStackNavigator();

const PerfilStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileS" component={ProfileScreen} options={{ title: 'Perfil'}} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTransparent: true }} />
    </Stack.Navigator>
  );
};

export default PerfilStack;
