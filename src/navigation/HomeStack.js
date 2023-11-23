import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Inicio/Home/HomeScreen";
import RestaurantDetail from "../screens/Inicio/Restaurant/RestaurantDetail";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: 'Inicio'}} />
      <Stack.Screen name="Restaurant" component={RestaurantDetail} options={{ headerTransparent: true }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
