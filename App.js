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

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4F9218',
  },
};

const authh = getAuth(auth)
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
      <NavigationContainer>
        {isLoggedIn ? <MainTabs /> : <AuthStack />}
      </NavigationContainer>
      <StatusBar />
    </SafeAreaProvider>
    </PaperProvider>
  );
}
