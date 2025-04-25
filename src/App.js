// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [piStatus, setPiStatus] = useState("Initialisation en cours...");

  useEffect(() => {
    const initPi = () => {
      const Pi = window.Pi;
      if (!Pi) {
        console.error("❌ Pi SDK introuvable.");
        setPiStatus("Erreur : SDK Pi introuvable");
        return;
      }

      try {
        Pi.init({ version: "2.0", sandbox: true });
        console.log("✅ Pi SDK initialisé !");
        setPiStatus("SDK Pi initialisé avec succès.");
      } catch (error) {
        console.error("❌ Erreur init Pi :", error);
        setPiStatus("Erreur lors de l'initialisation du SDK.");
      }
    };

    initPi();
  }, []);

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{piStatus}</p>

      <button onClick={() => alert("Ouvrir l'application")}>
        Ouvrir l'application
      </button>

      <button onClick={() => alert("Paiement Pi à venir")}>
        Payer 0.001 Pi
      </button>
    </div>
  );
}

export default App;
