// src/App.js
import React, { useEffect } from 'react';
import { loadPiSDK } from './utils/pi-sdk';
import PiPaymentButton from './PiPaymentButton';

function App() {
  useEffect(() => {
    // Charger le SDK Pi à l'initialisation du composant
    loadPiSDK();
  }, []);

  return (
    <div className="App">
      <h1>Test Paiement Pi</h1>
      <PiPaymentButton />
    </div>
  );
}

export default App;