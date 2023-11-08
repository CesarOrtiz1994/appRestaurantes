// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlOl148UrL6nTHjHLX4sRZasR9jHxZzI8",
  authDomain: "apprestaurantes-5ec5f.firebaseapp.com",
  projectId: "apprestaurantes-5ec5f",
  storageBucket: "apprestaurantes-5ec5f.appspot.com",
  messagingSenderId: "152766209852",
  appId: "1:152766209852:web:29838bf846ffa4a45e8839",
  measurementId: "G-K2QX3L1945"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});
 
 export default {
  firebase,
  auth
 }