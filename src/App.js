// src/App.js

import React, { useState, useEffect } from 'react';
import PiPaymentButton from './components/PiPaymentButton';
import { initializePiSdk } from './utils/pi-sdk'; // On importe l'initialisation du SDK
import './App.css';

function App() {
  const [sdkInitialized, setSdkInitialized] = useState(false);

  useEffect(() => {
    // Initialiser le SDK Pi dès que l'application se charge
    initializePiSdk();
    setSdkInitialized(true);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vente Automobile Pi</h1>

        {sdkInitialized ? (
          <PiPaymentButton /> // Afficher le bouton une fois que le SDK est initialisé
        ) : (
          <p>Chargement du SDK Pi...</p>
        )}
      </header>
    </div>
  );
}

export default App;
