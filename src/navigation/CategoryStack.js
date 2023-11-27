import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Inicio/Home/HomeScreen";
import RestaurantDetail from "../screens/Inicio/Restaurant/RestaurantDetail";
import CategoryScreen from "../screens/Inicio/Category/CategoryScreen";

const CategoryStack = () => {

  const isAndroid = true;
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS)
      }}
    >
      <Stack.Screen name="Categorias" component={CategoryScreen} options={{ title: 'Categorías' }} />
      <Stack.Screen name="Restaurant" component={RestaurantDetail}
        options={{ title: '', headerTransparent: true }} screenOptions={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};

export default CategoryStack;
