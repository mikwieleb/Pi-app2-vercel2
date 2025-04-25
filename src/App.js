import React, { useEffect, useState } from "react";
import { initializePiSDK, authenticateWithPi } from "./pi-sdk";
import PiPaymentButton from "./PiPaymentButton";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Chargement SDK...");

  useEffect(() => {
    initializePiSDK();
    setStatus("SDK Pi initialisé.");
  }, []);

  const handleLogin = async () => {
    try {
      const user = await authenticateWithPi();
      console.log("Utilisateur connecté :", user);
      setUser(user);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      setStatus("Erreur d'authentification");
    }
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Vente Automobile Pi</h1>
      <p>{status}</p>
      {!user ? (
        <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
          Se connecter avec Pi
        </button>
      ) : (
        <div>
          <p>Connecté en tant que @{user.username}</p>
          <PiPaymentButton />
        </div>
      )}
    </div>
  );
}

export default App;
