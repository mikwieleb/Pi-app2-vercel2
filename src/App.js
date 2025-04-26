// src/App.js

import React, { useEffect, useState } from "react";
import { initializePiSDK, authenticateWithPi } from "./utils/pi-sdk";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Chargement SDK...");

  useEffect(() => {
    initializePiSDK();  // Initialise Pi SDK au démarrage
    setStatus("SDK Pi initialisé.");
  }, []);

  const handleLogin = async () => {
    try {
      const user = await authenticateWithPi();
      console.log("Utilisateur connecté :", user);
      setUser(user);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{status}</p>
      {!user ? (
        <button onClick={handleLogin}>Se connecter avec Pi</button>
      ) : (
        <p>Connecté en tant que @{user.username}</p>
      )}
    </div>
  );
}

export default App;
