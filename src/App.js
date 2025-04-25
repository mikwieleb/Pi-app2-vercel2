// src/App.js

import React, { useEffect, useState } from "react";
import { initializePiSDK, authenticateWithPi } from "./pi-sdk";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Chargement SDK...");
  const [error, setError] = useState(null);

  useEffect(() => {
    initializePiSDK();
    setStatus("SDK Pi initialisé.");
  }, []);

  const handleLogin = async () => {
    try {
      const user = await authenticateWithPi();
      setUser(user);
      setStatus("Connecté avec succès.");
    } catch (err) {
      console.error("Erreur d'authentification :", err);
      setError(err.message || "Erreur inconnue");
      setStatus("Erreur d'authentification");
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{status}</p>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {!user ? (
        <button onClick={handleLogin}>Se connecter avec Pi</button>
      ) : (
        <p>Connecté en tant que @{user.username}</p>
      )}
    </div>
  );
}

export default App;
