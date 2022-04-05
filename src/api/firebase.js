// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDST9BCmDkvGa7LIMToId1cr7p4wRUuxJo",
  authDomain: "streambase-e73d4.firebaseapp.com",
  projectId: "streambase-e73d4",
  storageBucket: "streambase-e73d4.appspot.com",
  messagingSenderId: "455438719601",
  appId: "1:455438719601:web:2e21ec724a33c7015999d0",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export let auth = getAuth(firebase);
export let storage = getStorage(firebase);
export let database = getDatabase(firebase);
export default firebase;
