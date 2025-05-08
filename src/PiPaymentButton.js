import React from "react";

const PiPaymentButton = () => {
  const handlePayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK non chargé !");
      return;
    }

    try {
      const scopes = ["payments"];
      const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log("Utilisateur Pi authentifié :", user);

      const paymentData = {
        amount: 0.001,
        memo: "Paiement testnet pour voiture",
        metadata: { userId: user.uid }
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log("Paiement prêt pour approbation serveur :", paymentId);

          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              paymentId,
              uid: user.uid,
              amount: paymentData.amount
            })
          });

          const json = await res.json();
          console.log("Réponse du serveur :", json);
        },
        onCancel: () => {
          console.log("Paiement annulé par l'utilisateur.");
        },
        onError: (error) => {
          console.error("Erreur de paiement :", error);
        }
      });

      console.log("Objet paiement :", payment);
    } catch (err) {
      console.error("Erreur lors du paiement :", err);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Paiement incomplet détecté :", payment);
  };

  return (
    <button className="pay-btn" onClick={handlePayment}>
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
