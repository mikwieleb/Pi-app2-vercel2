import React, { useState, useEffect } from 'react';
import { initializePiSdk } from './utils/pi-sdk';
import PiPaymentButton from './components/PiPaymentButton';
import './App.css';

function App() {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    initializePiSdk();
    setSdkReady(true); // Une fois initialisé, sdkReady passe à true
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vente Automobile Pi</h1>
        {sdkReady ? (
          <PiPaymentButton />
        ) : (
          <p>Chargement du SDK Pi...</p>
        )}
      </header>
    </div>
  );
}

export default App;
