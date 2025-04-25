import React from 'react';

export default function PiPaymentButton() {
  const handlePayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK non chargé");
      return;
    }

    if (!window.Pi.isInitialized()) {
      window.Pi.init({ version: "2.0", sandbox: true });
    }

    const paymentData = {
      amount: 0.001,
      memo: "Paiement Testnet",
      metadata: { user: "Test" }
    };

    try {
      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log("Paiement prêt pour approbation serveur", paymentId);
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid })
          });
          const json = await res.json();
          console.log("Vérification serveur :", json);
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé", paymentId);
        },
        onError: (error, payment) => {
          console.error("Erreur paiement", error);
        }
      });

      console.log("Paiement déclenché :", payment);
    } catch (err) {
      console.error("Erreur déclenchement paiement :", err);
    }
  };

  return (
    <button onClick={handlePayment} style={{ padding: '10px 20px', marginTop: '15px', backgroundColor: '#a64ca6', color: 'white', border: 'none', borderRadius: '5px' }}>
      Payer 0.001 Pi
    </button>
  );
}
