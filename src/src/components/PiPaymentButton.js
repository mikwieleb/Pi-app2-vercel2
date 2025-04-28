import React from 'react';

function PiPaymentButton() {
  const handlePayment = async () => {
    if (!window.Pi) {
      alert('Pi SDK is not loaded.');
      return;
    }

    const paymentData = {
      amount: 0.001, // Le montant à payer
      memo: "Paiement Vente Automobile", // Message visible dans l'historique de paiement
      metadata: { from: "vente-automobile-pi" }, // Données additionnelles
    };

    try {
      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log('Payment ready for server approval:', paymentId);
          // ici on pourrait notifier ton serveur si besoin
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log('Payment ready for server completion:', paymentId, txid);
          
          // Vérifie le paiement avec ton backend
          try {
            const response = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.Pi.accessToken}`
              },
              body: JSON.stringify({ paymentId }),
            });

            const data = await response.json();
            if (data.success) {
              alert('Paiement confirmé ! Merci.');
            } else {
              alert('Erreur de vérification du paiement.');
            }
          } catch (error) {
            console.error('Erreur lors de la vérification du paiement:', error);
            alert('Erreur réseau.');
          }
        },
        onCancel: (paymentId) => {
          console.log('Payment cancelled:', paymentId);
          alert('Paiement annulé.');
        },
        onError: (error, payment) => {
          console.error('Payment error:', error);
          alert('Erreur pendant le paiement.');
        },
      });

      console.log('createPayment success:', payment);
    } catch (error) {
      console.error('createPayment error:', error);
      alert('Erreur lors de la création du paiement.');
    }
  };

  return (
    <div>
      <button onClick={handlePayment} style={styles.button}>
        Payer 0.001 Pi
      </button>
    </div>
  );
}

const styles = {
  button: {
    backgroundColor: '#8a2be2',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
  }
};

export default PiPaymentButton;
