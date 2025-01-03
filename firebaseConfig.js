/* eslint-disable no-undef */
// @ts-ignore
// eslint-disable-next-line import/named
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_APP_ID || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // persist the user into AsyncStorage
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
