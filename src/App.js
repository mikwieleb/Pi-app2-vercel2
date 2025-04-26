import React, { useState, useEffect } from "react";
import { initializePiSDK, authenticateWithPi } from "./utils/pi-sdk"; // Assure-toi que tu utilises le bon chemin

const App = () => {
  const [authStatus, setAuthStatus] = useState(false); // Statut de l'authentification

  // Initialisation du SDK Pi au chargement du composant
  useEffect(() => {
    initializePiSDK();
  }, []);

  // Fonction de connexion avec Pi
  const handleAuthenticate = async () => {
    try {
      const auth = await authenticateWithPi();
      setAuthStatus(true); // Mettre le statut de connexion à vrai
      console.log("Authentification réussie", auth);
    } catch (error) {
      console.error("Erreur d'authentification", error);
    }
  };

  // Fonction de paiement de 0,001 Pi
  const handlePayment = async () => {
    if (!window.Pi) {
      console.error("Pi SDK non chargé.");
      return;
    }

    try {
      // Tentative de paiement avec Pi SDK
      const payment = await window.Pi.pay({
        amount: 0.001, // Montant de paiement
        currency: "PI", // Devise utilisée pour le paiement
      });
      console.log("Paiement effectué", payment);
    } catch (error) {
      console.error("Erreur de paiement", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      {/* Affiche le bouton de connexion si non authentifié */}
      {!authStatus ? (
        <button onClick={handleAuthenticate}>Se connecter avec Pi</button>
      ) : (
        <div>
          <h2>Authentifié avec succès !</h2>
          {/* Affiche le bouton de paiement après l'authentification */}
          <button onClick={handlePayment}>Payer 0,001 Pi</button>
        </div>
      )}
    </div>
  );
};

export default App;
