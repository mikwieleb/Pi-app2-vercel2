import React, { useState } from "react";
import { initializePiSDK, authenticateWithPi } from "./utils/pi-sdk";
import "./App.css";

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // État pour suivre si le paiement est effectué

  // Fonction pour authentifier l'utilisateur
  const handleAuthentication = async () => {
    try {
      await authenticateWithPi();
      setUserAuthenticated(true); // Utilisateur authentifié
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  // Fonction pour effectuer le paiement de 0,001 Pi
  const handlePayment = async () => {
    try {
      // Effectuer le paiement ici (c'est un exemple, adapte-le selon le SDK Pi)
      const payment = await window.Pi.pay({
        amount: 0.001, // 0.001 Pi
        currency: "PI", // Monnaie Pi
      });
      if (payment.status === "success") {
        setPaymentSuccess(true); // Marque le paiement comme réussi
        console.log("Paiement effectué avec succès :", payment);
      } else {
        console.error("Erreur lors du paiement", payment);
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
        <>
          <p>Utilisateur authentifié</p>
          <button onClick={handlePayment}>Payer 0,001 Pi</button>
          {paymentSuccess && <p>Paiement réussi !</p>} {/* Message de succès du paiement */}
        </>
      )}
    </div>
  );
};

export default App;
