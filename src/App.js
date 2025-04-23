import React from "react";
import PiPaymentButton from "./PiPaymentButton";
import "./App.css";

function App() {
  const openPiApp = () => {
    window.location.href = "pi://pi.open";
  };

  return (
    <div className="app-container">
      <img src="/logo.png" alt="Logo" className="app-logo" />
      <h1 className="app-title">Test Paiement Pi</h1>
      <button className="open-button" onClick={openPiApp}>
        Ouvrir l'application
      </button>
      <PiPaymentButton />
    </div>
  );
}

export default App;