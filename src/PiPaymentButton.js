import React from 'react';

function PiPaymentButton() {
  const handlePayment = async () => {
    const Pi = window.Pi;
    if (!Pi) {
      alert("Pi SDK non chargé. Utilise le Pi Browser.");
      return;
    }

    const scopes = ['username', 'payments'];
    Pi.authenticate(scopes, onIncompletePaymentFound).then(async function(user) {
      alert("Utilisateur connecté : " + JSON.stringify(user));

      const paymentData = {
        amount: 0.001,
        memo: "Paiement pour une voiture",
        metadata: { userId: user.uid },
      };

      Pi.createPayment(paymentData, {
        onReadyForServerApproval: async function(paymentId) {
          alert("Paiement prêt, ID: " + paymentId);

          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentId,
              uid: user.uid,
              amount: paymentData.amount,
            }),
          });

          const result = await res.json();
          if (result.success) {
            alert("Paiement validé !");
          } else {
            alert("Erreur de validation : " + JSON.stringify(result));
          }
        },
        onCancel: function(paymentId) {
          alert("Paiement annulé : " + paymentId);
        },
        onError: function(error, payment) {
          alert("Erreur paiement : " + JSON.stringify(error));
        }
      });
    }).catch(function(error) {
      alert("Erreur d'authentification : " + error.message);
    });

    function onIncompletePaymentFound(payment) {
      console.log("Paiement incomplet détecté :", payment);
    }
  };

  return (
    <button className="pay-btn" onClick={handlePayment}>
      Payer 0.001 Pi
    </button>
  );
}

export default PiPaymentButton;
