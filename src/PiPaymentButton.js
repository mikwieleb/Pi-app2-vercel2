import React from "react";
import { initiatePayment } from "./pi-sdk";

function PiPaymentButton() {
  const handlePayment = async () => {
    try {
      const paymentResult = await initiatePayment({
        amount: 0.001,
        memo: "Test paiement Pi",
      });
      alert("Paiement réussi : " + paymentResult.paymentId);
    } catch (error) {
      console.error("Erreur de paiement :", error);
      alert("Erreur pendant le paiement.");
    }
  };

  return (
    <button onClick={handlePayment}>
      Payer 0.001 Pi
    </button>
  );
}

export default PiPaymentButton;
