import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritosScreen from "../screens/Inicio/Favoritos/FavoritosScreen";
import PerfilStack from "./PerfilStack";
import HomeStack from "./HomeStack";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Ionicons, FontAwesome} from "react-native-vector-icons";
import { styles } from "../styles/MainTabsStyles";
import Colors from "../constants/Colors";
import CategoryStack from "./CategoryStack";
import FavoritosStack from "./FavoritosStack";

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
      {/* <Tab.Screen name="Category" component={CategoryStack} options={{ headerShown: false }} /> */}
      <Tab.Screen name="Favorites" component={FavoritosStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const setIcon = (route, routeStatus) => {
  let iconName = '';
  let color = Colors.VERDE;

  if (routeStatus.focused) {
    color = Colors.NARANJA;
  }

  if (route.name === 'Home') {
    iconName = 'home';
  }
  if (route.name === 'Favorites') {
    iconName = 'heart';
  }
  if (route.name === 'Category') {
    iconName = 'search';
  }
  if (route.name === 'Profile') {
    iconName = 'user-circle-o';
    return <FontAwesome name={iconName} color={color} style={styles.icon} />
  }

  return <Ionicons name={iconName} color={color} style={styles.icon} />
}