import React from 'react';

const PiPaymentButton = () => {
  const handlePayment = async () => {
    if (typeof window.Pi === 'undefined') {
      alert('Pi SDK non chargé.');
      return;
    }

    window.Pi.init({
      version: "2.0",
      sandbox: true
    });

    try {
      window.Pi.createPayment({
        amount: 0.001,
        memo: "Paiement test Pi",
        metadata: { type: "test-payment" },

        onReadyForServerApproval: async function (paymentId) {
          try {
            const res = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId })
            });

            const result = await res.json();
            console.log("Réponse du backend :", result);

            if (!res.ok) {
              alert('Erreur serveur : ' + (result.error || 'Erreur inconnue'));
            }
          } catch (err) {
            alert('Erreur réseau : ' + err.message);
          }
        },

        onReadyForServerCompletion: function (paymentId, txid) {
          console.log('Paiement confirmé :', paymentId, txid);
          alert('Paiement validé avec succès !');
        },

        onCancel: function (paymentId) {
          alert('Paiement annulé.');
        },

        onError: function (error, payment) {
          console.error("Erreur pendant le paiement :", error);
          console.log("Paiement :", payment);
          alert("Erreur : " + (error?.message || "inconnue"));
        }
      });
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
