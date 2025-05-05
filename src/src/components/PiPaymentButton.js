import React from 'react';
import Pi from './pi-sdk';

const PiPaymentButton = () => {
  const handlePayment = async () => {
    try {
      const scopes = ['payments'];
      const user = await Pi.authenticate(scopes, onIncompletePaymentFound);

      const paymentData = {
        amount: 0.001,
        memo: "Paiement test",
        metadata: { userId: user.uid }
      };

      const payment = await Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId })
          });
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          await fetch('/api/complete-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid })
          });
        },
        onCancel: (paymentId) => {
          console.log('Paiement annulé:', paymentId);
        },
        onError: (error, payment) => {
          console.error('Erreur de paiement:', error);
        }
      });

    } catch (error) {
      console.error('Erreur d\'authentification Pi:', error);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log('Paiement incomplet détecté :', payment);
  };

  return (
    <button onClick={handlePayment}>
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
