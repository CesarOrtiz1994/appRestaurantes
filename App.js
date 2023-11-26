import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack"
import MainTabs from "./src/navigation/MainTabs"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase/firebaseConfig'
import React, { useEffect, useState } from "react";
import {
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import * as Location from 'expo-location';
import { UserLocationContext } from "./src/Context/UserLocationContext";
import Colors from "./src/constants/Colors";

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.VERDE,
  },
};



const authh = getAuth(auth)
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permisos para acceder a la localización denegados');
        alert('Permisos de ubicación rechazados. Se requieren los permisos de ubicación para consultar restaurantes cercanos.')
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location)
    })();

    const unsubscribe = onAuthStateChanged(authh, (user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setIsLoggedIn(true);
      } else {
        // El usuario no ha iniciado sesión
        setIsLoggedIn(false);
      }
    });

    // Limpiar el efecto cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <UserLocationContext.Provider value={{location, setLocation}}>
          <NavigationContainer>
            {isLoggedIn ? <MainTabs /> : <AuthStack />}
          </NavigationContainer>
          <StatusBar />
        </UserLocationContext.Provider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
