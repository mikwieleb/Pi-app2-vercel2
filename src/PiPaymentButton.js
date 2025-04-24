import React from "react";

const PiPaymentButton = () => {
  const handlePayment = async () => {
    try {
      // Initialisation du SDK Pi (Testnet)
      window.Pi.init({ version: "2.0", sandbox: true });

      const paymentData = {
        amount: 0.001,
        memo: "Paiement test Pi",
        metadata: { type: "test-payment" },
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId) => {
          console.log("onReadyForServerApproval", paymentId);
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });
          const data = await res.json();
          console.log("Réponse serveur :", data);
          return true;
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("onReadyForServerCompletion", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé", paymentId);
          alert("Paiement annulé");
        },
        onError: (error, payment) => {
          console.error("Erreur de paiement", error);
          alert("Erreur pendant le paiement : " + (error?.message || error));
        },
      };

      const payment = await window.Pi.createPayment(paymentData, callbacks);

      console.log("Paiement lancé :", payment);

    } catch (error) {
      console.error("Erreur globale du paiement :", error);
      alert("Erreur globale : " + (error?.message || error));
    }
  };

  return (
    <button onClick={handlePayment} style={{ padding: "10px 20px", background: "#a259ff", color: "#fff", borderRadius: "8px", border: "none", fontWeight: "bold" }}>
      Payer 0.001 Pi (test)
    </button>
  );
};

export default PiPaymentButton;
