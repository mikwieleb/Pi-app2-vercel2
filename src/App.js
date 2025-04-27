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
    setSdkInitialized(true);  // Directement après l'initialisation, le SDK est prêt
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vente Automobile Pi</h1>

        {sdkInitialized ? (
          <PiPaymentButton /> // Afficher le bouton de paiement dès que le SDK est prêt
        ) : (
          <p>Chargement du SDK Pi...</p>  // Message de chargement si le SDK n'est pas prêt
        )}
      </header>
    </div>
  );
}

export default App;
