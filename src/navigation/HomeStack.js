import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Inicio/Home/HomeScreen";
import RestaurantDetail from "../screens/Inicio/Restaurant/RestaurantDetail";

const HomeStack = () => {

  const isAndroid = true;
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS)
      }}
    >
      <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="Restaurant" component={RestaurantDetail}
        options={{ title: '', headerTransparent: true }} screenOptions={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
