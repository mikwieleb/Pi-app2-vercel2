import React from 'react';
import './App.css';

function PiPaymentButton() {
  const handlePayment = async () => {
    if (!window.Pi) {
      alert('Pi SDK non disponible. Ouvre dans le navigateur Pi.');
      return;
    }

    const scopes = ['payments'];
    const onIncompletePaymentFound = (payment) => {
      console.log('Paiement incomplet trouvé :', payment);
    };

    try {
      const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log('Utilisateur connecté :', user);

      const paymentData = {
        amount: 0.001,
        memo: 'Paiement test Pi',
        metadata: { user: user.username },
      };

      await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log('Prêt pour validation côté serveur', paymentId);
          await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId }),
          });
        },
        onReadyForServerCompletion: async (paymentId) => {
          console.log('Prêt pour complétion côté serveur', paymentId);
          await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, complete: true }),
          });
        },
        onCancel: (paymentId) => {
          console.log('Paiement annulé :', paymentId);
        },
        onError: (error, payment) => {
          console.error('Erreur de paiement :', error);
        },
      });
    } catch (error) {
      console.error('Erreur d\'authentification :', error);
    }
  };

  return (
    <button onClick={handlePayment} style={{ padding: '10px 20px', backgroundColor: 'purple', color: 'white', border: 'none', borderRadius: '5px' }}>
      Payer 0.001 Pi
    </button>
  );
}

export default PiPaymentButton;
