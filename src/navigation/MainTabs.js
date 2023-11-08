import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Inicio/Home/HomeScreen";
import FavoritosScreen from "../screens/Inicio/Favoritos/FavoritosScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import PerfilStack from "./PerfilStack";

const Tab = createBottomTabNavigator();


const MainTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Favorites") {
          iconName = focused ? "heart" : "heart-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      <Tab.Screen name="Favorites" component={FavoritosScreen} options={{ title: "Favoritos" }} />
      <Tab.Screen
        name="Profile"
        component={PerfilStack}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
