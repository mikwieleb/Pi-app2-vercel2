// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [piStatus, setPiStatus] = useState("Chargement...");

  useEffect(() => {
    const checkAndInitPi = () => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0", sandbox: true });
        console.log("✅ SDK Pi initialisé !");
        setPiStatus("SDK Pi initialisé.");
      } else {
        console.warn("Pi SDK non encore disponible, nouvelle tentative dans 500ms");
        setTimeout(checkAndInitPi, 500);
      }
    };

    checkAndInitPi();
  }, []);

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{piStatus}</p>
      <button onClick={() => alert("Ouvrir l'application")}>Ouvrir l'application</button>
      <button onClick={() => alert("Paiement Pi à venir")}>Payer 0.001 Pi</button>
    </div>
  );
}

export default App;
