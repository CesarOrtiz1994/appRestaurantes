import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import RestaurantDetail from "../screens/Inicio/Restaurant/RestaurantDetail";
import FavoritosScreen from "../screens/Inicio/Favoritos/FavoritosScreen";
import Colors from "../constants/Colors";

const FavoritosStack = () => {

  const isAndroid = true;
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS)
      }}
    >
      <Stack.Screen name="Favs" component={FavoritosScreen} options={{ title: 'Mis favoritos' }} />
      <Stack.Screen name="Restaurant" component={RestaurantDetail}
        options={{ title: '', headerTransparent: true, headerTintColor: Colors.VERDE }} screenOptions={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};

export default FavoritosStack;
