import React from "react";

const PiPaymentButton = () => {
  const handlePayment = async () => {
    try {
      console.log("🚀 Création du paiement…");
      await window.Pi.createPayment(
        {
          amount: 0.001,
          memo: "Paiement test Pi",
          metadata: { type: "test-payment" },
        },
        {
          onReadyForServerApproval: async (paymentId) => {
            console.log("▶️ onReadyForServerApproval", paymentId);
            try {
              const res = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId }),
              });
              const data = await res.json();
              console.log("📤 Réponse serveur :", data);
              if (!res.ok) {
                throw new Error(data.error || `Status ${res.status}`);
              }
              return true;
            } catch (e) {
              console.error("❌ Erreur lors de l’approbation serveur :", e);
              alert("Erreur server approval: " + (e.message || JSON.stringify(e)));
              return false; // stop flow si erreur
            }
          },
          onReadyForServerCompletion: (paymentId, txid) => {
            console.log("✔️ onReadyForServerCompletion", paymentId, txid);
            alert("✅ Paiement confirmé ! TxID: " + txid);
          },
          onCancel: (paymentId) => {
            console.log("⛔ Paiement annulé", paymentId);
            alert("Paiement annulé");
          },
          onError: (error) => {
            console.error("❌ Erreur de paiement", error);
            const msg = error?.message || JSON.stringify(error);
            alert("Erreur pendant le paiement : " + msg);
          },
        }
      );
    } catch (err) {
      console.error("💥 Exception globale createPayment :", err);
      const msg = err?.message || JSON.stringify(err);
      alert("Exception paiement : " + msg);
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
