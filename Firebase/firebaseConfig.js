// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH6AqsmRFcu33ChdBiuCxXGqoZyWqFzs4",
  authDomain: "apprestaurantes-72e05.firebaseapp.com",
  projectId: "apprestaurantes-72e05",
  storageBucket: "apprestaurantes-72e05.appspot.com",
  messagingSenderId: "544868681452",
  appId: "1:544868681452:web:0728d78b2310aa823ac7c9",
  measurementId: "G-0SDX3FHWN3"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const fstore = getFirestore(firebase);
 
 export default {
  firebase,
  auth
 }