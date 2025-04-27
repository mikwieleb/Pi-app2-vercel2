import React from 'react';
import { startPayment } from '../utils/pi-sdk';

const PiPaymentButton = () => {
  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: 0.001,
        memo: 'Paiement de 0.001 Pi pour Vente Automobile',
      };

      const payment = await startPayment(paymentData);

      console.log('Paiement réussi :', payment);
      alert('Paiement réussi !');
    } catch (error) {
      console.error('Erreur lors du paiement :', error);
      alert('Erreur lors du paiement');
    }
  };

  return (
    <button onClick={handlePayment} style={styles.button}>
      Payer 0.001 Pi
    </button>
  );
};

const styles = {
  button: {
    padding: '12px 24px',
    backgroundColor: '#8a2be2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  }
};

export default PiPaymentButton;
