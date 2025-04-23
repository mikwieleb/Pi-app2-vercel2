// src/PiPaymentButton.js
import React from 'react';

const PiPaymentButton = () => {
  const handlePayment = async () => {
    if (typeof window.Pi === 'undefined') {
      alert('Pi SDK non chargé.');
      return;
    }

    // Initialisation du SDK Pi si ce n'est pas déjà fait
    window.Pi.init({
      version: "2.0",
      sandbox: true
    });

    try {
      const payment = await window.Pi.createPayment({
        amount: 0.001,           // Montant à payer
        memo: "Paiement test Pi", // Message
        metadata: { type: "test-payment" }
      });

      if (!payment.identifier) {
        alert('Erreur : Payment identifier non trouvé.');
        return;
      }

      // Vérification du paiement
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId: payment.identifier })
      });

      const result = await res.json();
      if (res.ok) {
        alert('Paiement validé !');
      } else {
        alert('Erreur : ' + result.error || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Erreur durant le paiement:', error);
      alert('Erreur pendant le paiement.');
    }
  };

  return (
    <button onClick={handlePayment}>Payer 0.001 Pi (test)</button>
  );
};

export default PiPaymentButton;