import React from 'react';
import PiPaymentButton from './PiPaymentButton';

function App() {
  const openApp = () => {
    window.open('https://vente-automobile-pi-g6hd.vercel.app', '_blank');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', backgroundColor: '#eee', padding: '50px' }}>
      <img src="/pi-logo.png" alt="Pi Logo" width="100" />
      <h1 style={{ color: '#6a0dad' }}>Vente Automobile - Paiement Pi</h1>
      <PiPaymentButton />
      <br /><br />
      <button onClick={openApp}>Ouvrir l'application</button>
    </div>
  );
}

export default App;
