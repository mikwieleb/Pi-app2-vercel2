import React, { useState, useEffect } from 'react';
import { initializePiSDK, authenticateWithPi } from './utils/pi-sdk'; // Assure-toi que ton fichier est importé correctement

const App = () => {
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    initializePiSDK(); // Initialiser le SDK au chargement
  }, []);

  const handleAuthenticate = async () => {
    try {
      const auth = await authenticateWithPi();
      setAuthStatus(true);
      console.log('Authentification réussie:', auth);
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
    }
  };

  const handlePayment = async () => {
    if (!window.Pi) {
      console.error("Pi SDK non chargé.");
      return;
    }
    try {
      const payment = await window.Pi.pay({
        amount: 0.001, // Montant de paiement
        currency: "PI",
      });
      console.log("Paiement effectué:", payment);
    } catch (error) {
      console.error("Erreur de paiement:", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      {!authStatus ? (
        <button onClick={handleAuthenticate}>Se connecter avec Pi</button>
      ) : (
        <div>
          <h2>Authentifié avec succès !</h2>
          <button onClick={handlePayment}>Payer 0,001 Pi</button>
        </div>
      )}
    </div>
  );
};

export default App;
