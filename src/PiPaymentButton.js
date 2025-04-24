import React from "react";

const PiPaymentButton = () => {
  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: 0.001,
        memo: "Paiement test Pi",
        metadata: { type: "test-payment" },
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId) => {
          console.log("▶️ onReadyForServerApproval", paymentId);
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });
          const data = await res.json();
          console.log("📤 Réponse serveur :", data);
          return true;
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("✔️ onReadyForServerCompletion", paymentId, txid);
          alert("Paiement confirmé ! TxID: " + txid);
        },
        onCancel: (paymentId) => {
          console.log("⛔ Paiement annulé", paymentId);
          alert("Paiement annulé");
        },
        onError: (error) => {
          console.error("❌ Erreur de paiement", error);
          alert("Erreur pendant le paiement : " + (error?.message || error));
        },
      };

      console.log("🚀 Lancement du paiement…");
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error("💥 Erreur globale du paiement :", err);
      alert("Erreur globale : " + (err?.message || err));
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "12px 24px",
        background: "#a259ff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "16px",
      }}
    >
      Payer 0.001 Pi (test)
    </button>
  );
};

export default PiPaymentButton;
