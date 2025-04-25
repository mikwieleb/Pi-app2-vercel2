// src/App.js

import React, { useEffect, useState } from "react";
import { initializePiSDK, authenticateWithPi } from "./pi-sdk";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Chargement SDK...");
  const [error, setError] = useState(null);

  useEffect(() => {
    initializePiSDK();
    setStatus("SDK Pi initialisé.");
  }, []);

  const handleLogin = async () => {
    try {
      const user = await authenticateWithPi();
      setUser(user);
      setStatus("Connecté avec succès.");
    } catch (err) {
      console.error("Erreur d'authentification :", err);
      setError(err.message || "Erreur inconnue");
      setStatus("Erreur d'authentification");
    }
  };

  const handlePayment = async () => {
    if (!window.Pi) {
      console.error("Pi SDK non chargé.");
      return;
    }

    const paymentData = {
      amount: 0.001,
      memo: "Paiement test Pi",
      metadata: { type: "vente-voiture" },
    };

    try {
      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId) => {
          console.log("Ready for server approval", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Ready for server completion", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé", paymentId);
        },
        onError: (error, payment) => {
          console.error("Erreur de paiement", error);
        },
      });

      console.log("Paiement lancé :", payment);
    } catch (error) {
      console.error("Erreur lors de createPayment :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{status}</p>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {!user ? (
        <button onClick={handleLogin}>Se connecter avec Pi</button>
      ) : (
        <>
          <p>Connecté en tant que @{user.username}</p>
          <button onClick={handlePayment}>Payer 0.001 Pi</button>
        </>
      )}
    </div>
  );
}

export default App;
