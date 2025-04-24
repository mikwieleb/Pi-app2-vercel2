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
        setAuthStatus("Erreur d'authentification");
      }
    };
    
    authenticate();
  }, []);

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      {authStatus ? (
        <p>Bienvenue, {authStatus}</p>
      ) : (
        <p>Authentification en cours...</p>
      )}
      <button onClick={() => alert("Ouvrir l'application")}>Ouvrir l'application</button>
      <button onClick={() => alert("Payer 0,001 Pi")}>Payer 0.001 Pi</button>
    </div>
  );
}

export default App;
