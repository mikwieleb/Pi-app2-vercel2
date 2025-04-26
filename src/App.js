// src/App.js

import React, { useEffect, useState } from "react";
import { initPiSdk } from "./utils/pi-sdk";

function App() {
  const [user, setUser] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    initPiSdk();
  }, []);

  const handleLogin = async () => {
    if (!window.Pi) {
      console.error("Pi SDK non chargé.");
      return;
    }

    try {
      const scopes = ["payments"];
      const authResult = await window.Pi.authenticate(
        onIncompletePaymentFound,
        scopes
      );
      console.log("Utilisateur connecté :", authResult);
      setUser(authResult.user);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Paiement incomplet détecté :", payment);
  };

  const handlePayment = async () => {
    if (!window.Pi) {
      console.error("Pi SDK non chargé.");
      return;
    }

    try {
      const paymentData = {
        amount: 0.001,
        memo: "Paiement Testnet Vente Automobile",
        metadata: { paymentType: "TestnetPurchase" },
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId) => {
          console.log("Ready for server approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Ready for server completion:", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé:", paymentId);
          setPaymentStatus("Paiement annulé");
        },
        onError: (error, payment) => {
          console.error("Erreur de paiement:", error, payment);
          setPaymentStatus("Erreur de paiement");
        },
      });

      console.log("Paiement initié :", payment);
      setPaymentStatus("Paiement initié !");
    } catch (error) {
      console.error("Erreur pendant le paiement :", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vente Automobile Pi</h1>

      {!user ? (
        <button onClick={handleLogin} style={buttonStyle}>
          Se connecter avec Pi
        </button>
      ) : (
        <>
          <p>Connecté en tant que {user.username}</p>
          <button onClick={handlePayment} style={buttonStyle}>
            Payer 0.001 Pi
          </button>
        </>
      )}

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
};

export default App;
