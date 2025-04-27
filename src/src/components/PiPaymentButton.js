// src/components/PiPaymentButton.js

import React from 'react';
import piSdk from '../pi-sdk';

const PiPaymentButton = () => {
  const handlePayment = async () => {
    try {
      console.log('Tentative de paiement 0.001 Pi...');
      await piSdk.payment(0.001);
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
    }
  };

  return (
    <button onClick={handlePayment}>
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
