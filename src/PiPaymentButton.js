import React from "react";

const PiPaymentButton = () => {
  const handlePayment = () => {
    if (!window.Pi) {
      alert("Pi SDK non disponible !");
      return;
    }

    const paymentData = {
      amount: 0.001,
      memo: "Paiement Testnet",
      metadata: { type: "vente_auto" }
    };

    window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: (paymentId) => {
        console.log("À approuver côté serveur :", paymentId);
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        console.log("À compléter côté serveur :", paymentId, txid);
      },
      onCancel: (paymentId) => {
        console.log("Paiement annulé :", paymentId);
      },
      onError: (error, payment) => {
        console.error("Erreur de paiement :", error, payment);
      },
    });
  };

  return (
    <button onClick={handlePayment} className="pay-button">
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
