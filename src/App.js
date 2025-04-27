// src/App.js

import React from 'react';
import PiPaymentButton from './components/PiPaymentButton';
import { initializePiSdk, login } from './utils/pi-sdk';
import './App.css';

function App() {
  React.useEffect(() => {
    initializePiSdk();  // Assure-toi que le SDK Pi est initialisé dès le chargement
  }, []);

  const handleLogin = async () => {
    try {
      await login();
      alert('Connexion réussie avec Pi !');
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert('Erreur de connexion à Pi');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vente Automobile Pi</h1>
        <button onClick={handleLogin} className="login-button">
          Se connecter avec Pi
        </button>

        <PiPaymentButton />
      </header>
    </div>
  );
}

export default App;
