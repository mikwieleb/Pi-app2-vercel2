// src/PiPaymentButton.js

import React from "react";

const PiPaymentButton = () => {
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

  return <button onClick={handlePayment}>Payer 0.001 Pi</button>;
};

export default PiPaymentButton;
