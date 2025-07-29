// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCQV1LgUKKBVP9ewqLIuA60WMkwhi-flyc",
  authDomain: "invoice-app-52723.firebaseapp.com",
  projectId: "invoice-app-52723",
  storageBucket: "invoice-app-52723.firebasestorage.app",
  messagingSenderId: "673278568546",
  appId: "1:673278568546:web:f4cb7412719e41a082093b",
  measurementId: "G-JW6VQ57N74"
};

export const app = initializeApp(firebaseConfig);

//This is my step
export const auth = getAuth()

export const storage  = getStorage()

export const db = getFirestore()
