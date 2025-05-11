// App.js
import React from 'react';
import PiPaymentButton from './PiPaymentButton';

function App() {
  const openApp = () => {
    // Ouvre l'app dans Pi Browser (important pour testnet)
    window.open('https://vente-automobile-pi-g6hd.vercel.app', '_self');
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '100px',
      backgroundColor: '#eee',
      padding: '50px',
      minHeight: '100vh'
    }}>
      <img src="/pi-logo.png" alt="Pi Logo" width="100" />
      <h1 style={{ color: '#6a0dad' }}>Vente Automobile - Paiement Pi</h1>

      <PiPaymentButton />

      <br /><br />
      <button onClick={openApp} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#6a0dad',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Ouvrir l'application
      </button>
    </div>
  );
}

export default App;
