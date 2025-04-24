import React, { useEffect, useState } from "react";
import { initPiSDK } from "./utils/pi-sdk";
import PiPaymentButton from "./PiPaymentButton";

function App() {
  const [piReady, setPiReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initPiSDK()
      .then(() => setPiReady(true))
      .catch((err) => {
        console.error("Erreur init Pi SDK :", err);
        setError(err.message || JSON.stringify(err));
      });
  }, []);

  const handleOpenApp = async () => {
    try {
      console.log("🔄 openApp appelé");
      await window.Pi.openApp();
      console.log("✅ openApp réussi");
      alert("App ouverte (vérifie dans Pi Browser)");
    } catch (err) {
      console.error("❌ Erreur openApp", err);
      const msg = err?.message || JSON.stringify(err);
      alert("Erreur openApp : " + msg);
    }
  };

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
        🚨 Erreur d’initialisation Pi : {error}
      </div>
    );
  }

  if (!piReady) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        ⌛ Authentification Pi en cours…
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        background: "#f8f0ea",
        minHeight: "100vh",
      }}
    >
      <h1>Test Paiement Pi</h1>

      <button
        onClick={handleOpenApp}
        style={{
          margin: "16px 0",
          padding: "12px 24px",
          background: "#a259ff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Ouvrir l’application
      </button>

      <PiPaymentButton />
    </div>
  );
}

export default App;
