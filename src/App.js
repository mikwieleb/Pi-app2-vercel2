import React from 'react';
import PiPaymentButton from './PiPaymentButton';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1 style={{ color: '#6A0DAD' }}>Vente Automobile en Pi</h1>
      <img src="/logo.png" alt="Logo" style={{ width: 150 }} />
      <br /><br />
      <a href="https://vente-automobile-pi-g6hd.vercel.app" target="_blank" rel="noopener noreferrer">
        <button>Ouvrir l'application</button>
      </a>
      <br /><br />
      <PiPaymentButton />
    </div>
  );
}

export default App;
