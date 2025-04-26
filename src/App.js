// src/App.js

import React, { useEffect, useState } from "react";
import { initializePiSDK, authenticateWithPi } from "./pi-sdk";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Chargement SDK...");
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    initializePiSDK();  // Initialise Pi SDK au démarrage
    setStatus("SDK Pi initialisé.");
  }, []);

  const handleLogin = async () => {
    try {
      const user = await authenticateWithPi();
      console.log("Utilisateur connecté :", user);
      setUser(user);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  const handlePayment = async () => {
    try {
      const payment = await window.Pi.makePayment(0.001, {
        appId: "venteautomobile.pi", // Utilise ton App ID
        apiKey: "tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy", // Utilise ta clé API
      });

      if (payment.success) {
        setPaymentStatus("Paiement réussi!");
        console.log("Paiement réussi :", payment);
      } else {
        setPaymentStatus("Paiement échoué.");
        console.error("Paiement échoué :", payment);
      }
    } catch (error) {
      setPaymentStatus("Erreur lors du paiement.");
      console.error("Erreur de paiement :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{status}</p>
      {!user ? (
        <button onClick={handleLogin}>Se connecter avec Pi</button>
      ) : (
        <p>Connecté en tant que @{user.username}</p>
      )}

      {user && (
        <button onClick={handlePayment}>Payer 0.001 Pi</button>
      )}

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

export default App;
