import React from 'react';
import PiPaymentButton from './PiPaymentButton';

function App() {
  const openApp = () => {
    // Redirection temporaire vers ton app Vercel (remplacera domaine Pi après validation)
    window.open("https://vente-automobile-pi-g6hd.vercel.app", "_blank");
  };

  return (
    <div className="App">
      <img src="/pi-logo.png" alt="Logo Pi" className="logo" />
      <h1>Vente Automobile avec Pi</h1>
      <PiPaymentButton />
      <button className="open-btn" onClick={openApp}>
        Ouvrir l'application
      </button>
    </div>
  );
}

export default App;
