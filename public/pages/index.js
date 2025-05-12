import { useState, useEffect } from 'react';

export default function Home() {
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
        console.log('Paiement incomplet :', payment);
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
        alert('Échec de vérification');
      }
    } catch (error) {
      console.error('Erreur Pi login :', error);
    }
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: 0.001,
        memo: "Test Pi paiement",
        metadata: { type: "test" },
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId) => {
          await fetch('/api/create-payment', {
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
          console.log("Paiement annulé :", paymentId);
        },
        onError: (error, payment) => {
          console.error("Erreur paiement :", error);
        },
      };

      window.Pi.createPayment(paymentData, callbacks);
    } catch (error) {
      console.error("Erreur création paiement :", error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>App Pi Testnet</h1>
      <button onClick={handleLogin} style={{ padding: '1rem', margin: '1rem' }}>
        Se connecter avec Pi
      </button>
      <button onClick={handlePayment} style={{ padding: '1rem', margin: '1rem' }}>
        Payer 0.001 Pi
      </button>
      {verified && user && (
        <div>
          <p>Connecté : {user.username}</p>
        </div>
      )}
    </div>
  );
}
