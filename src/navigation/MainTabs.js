import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritosScreen from "../screens/Inicio/Favoritos/FavoritosScreen";
import PerfilStack from "./PerfilStack";
import HomeStack from "./HomeStack";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { styles } from "../styles/MainTabsStyles";

const Tab = createBottomTabNavigator();


const MainTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: (routeStatus) => setIcon(route, routeStatus),
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false
      })}>
      <Tab.Screen name="Profile" component={PerfilStack} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={FavoritosScreen} options={{ title: "Favoritos" }} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const setIcon = (route, routeStatus) => {
  let iconName = '';
  let color = '#4F9218';

  if (routeStatus.focused) {
    color = '#FF5C00';
  }

  if (route.name === 'Home') {
    iconName = 'home';
  }
  if (route.name === 'Favorites') {
    iconName = 'heart';
  }
  if (route.name === 'Profile') {
    iconName = 'user';
  }

  return <AwesomeIcon name={iconName} color={color} style={styles.icon} />
}