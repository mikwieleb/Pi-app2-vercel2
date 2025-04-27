// src/components/PiPaymentButton.js

import React from 'react';
import { payment } from '../utils/pi-sdk'; // Assure-toi que l'import est correct !

const PiPaymentButton = () => {
  const handlePayment = async () => {
    try {
      console.log('Tentative de paiement 0.001 Pi...');
      const result = await payment(0.001);
      alert('Paiement réussi ! ID de transaction: ' + result.txid);
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      alert('Erreur lors du paiement.');
    }
  };

  return (
    <button onClick={handlePayment} className="payment-button">
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
