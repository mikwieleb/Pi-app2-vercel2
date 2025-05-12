import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/pi-sdk.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleLogin = async () => {
    try {
      const scopes = ['username', 'payments'];
      const onIncompletePaymentFound = (payment) => {
        console.log('Paiement incomplet trouvé :', payment);
      };

      const { user, accessToken } = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(user);
      setAccessToken(accessToken);

      const response = await fetch('/api/verify-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, accessToken }),
      });

      const result = await response.json();
      if (result.verified) {
        setVerified(true);
        alert(`Utilisateur ${user.username} vérifié`);
      } else {
        alert('Échec de la vérification');
      }
    } catch (error) {
      console.error('Erreur d’authentification Pi :', error);
    }
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: 0.001,
        memo: "Paiement test Pi étape 10",
        metadata: { type: "test" },
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId) => {
          console.log("Paiement prêt pour l'approbation serveur :", paymentId);
          await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId }),
          });
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log("Paiement prêt pour finalisation :", paymentId, txid);
          await fetch('/api/complete-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid }),
          });
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé :", paymentId);
        },
        onError: (error, payment) => {
          console.error("Erreur de paiement :", error);
        },
      };

      window.Pi.createPayment(paymentData, callbacks);
    } catch (error) {
      console.error("Erreur lors de l’appel à createPayment :", error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>Connexion & Paiement Pi Network</h1>
      <button onClick={handleLogin} style={{ padding: '1rem 2rem', fontSize: '16px', marginRight: '1rem' }}>
        Se connecter avec Pi
      </button>

      <button onClick={handlePayment} style={{ padding: '1rem 2rem', fontSize: '16px' }}>
        Payer 0.001 Pi
      </button>

      {verified && user && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Utilisateur vérifié :</h2>
          <p><strong>Username :</strong> {user.username}</p>
        </div>
      )}
    </div>
  );
}

export default App;
