import React from 'react';
import PiPaymentButton from './PiPaymentButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <img src="/logo.png" alt="Logo" style={{ width: 150 }} />

      <div style={{ marginTop: 30 }}>
        <PiPaymentButton />
      </div>

      <div style={{ marginTop: 20 }}>
        <a
          href="pi://venteautomobile.pi"
          style={{
            padding: '10px 20px',
            backgroundColor: 'purple',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Ouvrir l'application
        </a>
      </div>
    </div>
  );
}

export default App;
