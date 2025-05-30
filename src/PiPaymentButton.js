import React from "react";
import Pi from "./pi-sdk";

function PiPaymentButton() {
  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: 0.001,
        memo: "Paiement Test Pi",
        metadata: { user: "test" },
      };
      const payment = await window.Pi.createPayment(paymentData);
      console.log("Paiement créé :", payment);
    } catch (error) {
      console.error("Erreur de paiement :", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        backgroundColor: "#a64ca6",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Payer 0.001 Pi
    </button>
  );
}

export default PiPaymentButton;
