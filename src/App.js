import React, { useState, useEffect } from "react";
import { initializePiSDK, authenticateWithPi } from "./utils/pi-sdk";
import "./App.css";

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Suivi de l'état de paiement

  useEffect(() => {
    // Initialisation du SDK Pi lorsque l'application est montée
    console.log("Initialisation du SDK Pi...");
    initializePiSDK();
  }, []);

  // Fonction pour authentifier l'utilisateur
  const handleAuthentication = async () => {
    try {
      console.log("Tentative d'authentification avec Pi...");
      await authenticateWithPi();
      setUserAuthenticated(true); // Marque l'utilisateur comme authentifié
      console.log("Utilisateur authentifié avec succès.");
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  // Fonction pour effectuer le paiement de 0,001 Pi
  const handlePayment = async () => {
    try {
      console.log("Tentative de paiement de 0,001 Pi...");
      const payment = await window.Pi.pay({
        amount: 0.001, // 0.001 Pi
        currency: "PI",
      });
      if (payment.status === "success") {
        setPaymentSuccess(true); // Paiement réussi
        console.log("Paiement réussi !");
      } else {
        console.error("Échec du paiement", payment);
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      {!userAuthenticated ? (
        // Si l'utilisateur n'est pas authentifié, afficher le bouton de connexion
        <button onClick={handleAuthentication}>Se connecter avec Pi</button>
      ) : (
        // Si l'utilisateur est authentifié, afficher le bouton de paiement
        <div>
          <p>Utilisateur authentifié</p>
          <button onClick={handlePayment}>Payer 0,001 Pi</button>
          {paymentSuccess && <p>Paiement effectué avec succès !</p>}
        </div>
      )}
    </div>
  );
};

export default App;
