// src/App.js

import React, { useState } from 'react';
import { initiatePayment } from './utils/pi-sdk';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes);
      setUser(authResult.user);
      console.log('User authenticated:', authResult.user);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handlePayment = async () => {
    try {
      await initiatePayment(user.username);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: '#f3ecff', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1>Vente Automobile Pi</h1>
      
      {!user ? (
        <button onClick={login} style={{ padding: '10px 20px', margin: '10px', borderRadius: '8px', backgroundColor: '#eee', border: '1px solid #ccc' }}>
          Se connecter avec Pi
        </button>
      ) : (
        <>
          <p>Bienvenue, {user.username} !</p>
          <button onClick={handlePayment} style={{ padding: '10px 20px', margin: '10px', borderRadius: '8px', backgroundColor: '#7b2cbf', color: '#fff', border: 'none' }}>
            Payer 0.001 Pi
          </button>
        </>
      )}
    </div>
  );
}

export default App;
