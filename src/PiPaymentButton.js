import React from 'react';

function PiPaymentButton() {
  const handlePayment = async () => {
    const Pi = window.Pi;

    if (!Pi) {
      alert('Le SDK Pi n’est pas disponible. Ouvre cette app dans le Pi Browser.');
      return;
    }

    try {
      const scopes = ['username', 'payments'];
      const authResult = await Pi.authenticate(scopes, (error, auth) => {
        if (error) {
          console.error(error);
          return;
        }
        return auth;
      });

      const paymentData = {
        amount: 0.001,
        memo: 'Paiement test Pi',
        metadata: { user: authResult.user.username },
      };

      const payment = await Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId }),
          });
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          await fetch('/api/complete-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid }),
          });
        },
        onCancel: (paymentId) => {
          console.log('Paiement annulé', paymentId);
        },
        onError: (error, paymentId) => {
          console.error('Erreur de paiement', error);
        },
      });

      console.log('Paiement terminé :', payment);
    } catch (err) {
      console.error('Erreur pendant le paiement :', err);
    }
  };

  return (
    <button onClick={handlePayment}>
      Payer 0.001 Pi
    </button>
  );
}

export default PiPaymentButton;
