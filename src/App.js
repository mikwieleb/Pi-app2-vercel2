import React, { useEffect, useState } from "react";
import { authenticateWithPi } from './utils/pi-sdk';

function App() {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const auth = await authenticateWithPi();
        setAuthStatus(auth.user.username);
      } catch (error) {
        console.error("🚨 Erreur d’authentification :", error.message);
        setAuthStatus("Erreur d'authentification");
      }
    };

    authenticate();
  }, []);

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{authStatus ? `Bienvenue, ${authStatus}` : "Connexion en cours..."}</p>
      <button>Ouvrir l'application</button>
      <button>Payer 0.001 Pi</button>
    </div>
  );
}

export default App;
