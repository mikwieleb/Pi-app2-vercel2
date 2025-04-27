import React, { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    if (!window.Pi) {
      alert("Pi SDK non chargé !");
      return;
    }
    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes);
      console.log('Authentifié avec succès:', authResult);
      alert('Bienvenue ' + authResult.user.username);
      setIsAuthenticated(true); // Connexion réussie
    } catch (error) {
      console.error('Erreur de connexion Pi:', error);
      alert('Erreur : ' + error.message);
    }
  };

  const handlePayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK non chargé !");
      return;
    }
    try {
      const paymentData = {
        amount: 0.001,  // Montant 0.001 Pi
        memo: "Paiement test pour Vente Automobile",
        metadata: { paymentId: "test_payment_001" }
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId) => {
          console.log("Paiement prêt pour validation :", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Paiement prêt pour finalisation :", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé :", paymentId);
        },
        onError: (error, payment) => {
          console.error("Erreur de paiement :", error);
        }
      });

      console.log('Paiement lancé:', payment);
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      alert('Erreur paiement : ' + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px", backgroundColor: "#f5f0ff", height: "100vh" }}>
      <h1>Vente Automobile Pi</h1>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Se connecter avec Pi</button>
      ) : (
        <div>
          <p>Connecté ! Vous pouvez payer :</p>
          <button onClick={handlePayment}>Payer 0,001 Pi</button>
        </div>
      )}
    </div>
  );
}

export default App;
