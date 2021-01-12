import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANoP4P_e5benskpZSdu09s0F41jBziT9k",
  authDomain: "cart-8041e.firebaseapp.com",
  projectId: "cart-8041e",
  storageBucket: "cart-8041e.appspot.com",
  messagingSenderId: "989468437299",
  appId: "1:989468437299:web:ef2a8425534f1806582c46"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />,document.getElementById('root'));

