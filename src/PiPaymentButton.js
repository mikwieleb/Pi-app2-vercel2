// PiPaymentButton.js
import React from 'react';

function PiPaymentButton() {
  const handleClick = async () => {
    try {
      const scopes = ['payments'];
      const authResult = await window.Pi.authenticate(scopes);

      const payment = window.Pi.createPayment(
        {
          amount: 0.001,
          memo: "Paiement Testnet - Vente Auto",
          metadata: { paymentType: "vente" },
        },
        {
          onReadyForServerApproval: async (paymentId) => {
            console.log('Paiement prêt pour validation serveur, ID:', paymentId);

            const response = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId }),
            });

            const result = await response.json();
            console.log('Résultat serveur :', result);
          },
          onReadyForServerCompletion: (paymentId, txid) => {
            console.log('Paiement prêt pour finalisation. ID:', paymentId, 'TXID:', txid);
          },
          onCancel: (paymentId) => {
            console.log('Paiement annulé. ID:', paymentId);
          },
          onError: (error, payment) => {
            console.error('Erreur durant le paiement :', error);
          },
        }
      );
    } catch (error) {
      console.error('Erreur lors de l\'authentification ou du paiement :', error);
    }
  };

  return (
    <button onClick={handleClick} style={{
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#f5a623',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      Payer 0.001 Pi
    </button>
  );
}

export default PiPaymentButton;
