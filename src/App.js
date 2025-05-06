import React from 'react';
import './App.css';
import PiPaymentButton from './PiPaymentButton';

function App() {
  const handleOpenApp = () => {
    alert("L'application est déjà ouverte dans le Pi Browser.");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" alt="Logo" className="App-logo" />
        <h1>Bienvenue dans l'application Pi</h1>

        <PiPaymentButton />

        <button className="open-btn" onClick={handleOpenApp}>
          Ouvrir l'application
        </button>
      </header>
    </div>
  );
}

export default App;
