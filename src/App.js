import React from "react";
import "./App.css";

const App = () => {
  const handleOpenApp = () => {
    if (window.Pi) {
      window.Pi.openApp();
    } else {
      alert("Pi SDK non disponible");
    }
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: 0.001,
        memo: "Paiement test",
        metadata: { type: "test" },
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });
        },
        onReadyForServerCompletion: () => {
          alert("Paiement effectué avec succès !");
        },
        onCancel: () => {
          alert("Paiement annulé");
        },
        onError: (error) => {
          console.error("Erreur lors du paiement :", error);
          alert("Erreur pendant le paiement.");
        },
      });

      console.log("Paiement lancé :", payment);
    } catch (err) {
      console.error("Erreur globale du paiement :", err);
      alert("Erreur pendant le paiement.");
    }
  };

  return (
    <div className="app-container">
      <img src="/logo.png" alt="Pi Logo" className="app-logo" />
      <h1 className="app-title">Test Paiement Pi</h1>
      <button className="open-button" onClick={handleOpenApp}>
        Ouvrir l'application
      </button>
      <button className="open-button" onClick={handlePayment}>
        Payer 0.001 Pi (test)
      </button>
    </div>
  );
};

export default App;