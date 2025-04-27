// src/App.js

import React from 'react';
import PiPaymentButton from './components/PiPaymentButton';
import { initializePiSdk } from './utils/pi-sdk'; // On importe l'initialisation du SDK
import './App.css';

function App() {
  React.useEffect(() => {
    initializePiSdk();  // Assure-toi que le SDK Pi est initialisé dès le chargement
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vente Automobile Pi</h1>
        
        <PiPaymentButton />
      </header>
    </div>
  );
}

export default App;
