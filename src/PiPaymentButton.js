import React from 'react';
import { initiatePayment } from './verify-payment';

function PiPaymentButton() {
  const handleClick = async () => {
    try {
      await initiatePayment();
    } catch (error) {
      console.error('Erreur de paiement :', error);
    }
  };

  return <button onClick={handleClick}>Payer 0.001 Pi</button>;
}

export default PiPaymentButton;
