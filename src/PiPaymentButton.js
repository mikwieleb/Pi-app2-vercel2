import React from "react";

function PiPaymentButton() {
  const handlePayment = () => {
    if (window.Pi) {
      window.Pi.requestPayment(0.001, "Pi Paiement Testnet")
        .then((payment) => {
          console.log("Paiement effectué :", payment);
        })
        .catch((error) => {
          console.error("Erreur de paiement :", error);
        });
    } else {
      console.error("Pi SDK non initialisé pour le paiement");
    }
  };

  return (
    <button onClick={handlePayment} className="pay-button">
      Payer 0.001 Pi
    </button>
  );
}

export default PiPaymentButton;
