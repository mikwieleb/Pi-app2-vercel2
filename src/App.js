import React, { useEffect } from "react";
import PiPaymentButton from "./PiPaymentButton";
import "./App.css";

const App = () => {
  useEffect(() => {
    const loadPiSdk = () => {
      const script = document.createElement("script");
      script.src = "https://sdk.minepi.com/pi-sdk.js";
      script.async = true;
      script.onload = () => {
        console.log("Pi SDK loaded");
      };
      document.body.appendChild(script);
    };

    loadPiSdk();
  }, []);

  return (
    <div className="App">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Bienvenue sur Vente Automobile Pi</h1>
      <PiPaymentButton />
      <a className="open-btn" href="pi://venteautomobile.pi" rel="noreferrer">
        Ouvrir l'application
      </a>
    </div>
  );
};

export default App;
