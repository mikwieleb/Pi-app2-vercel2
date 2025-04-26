// src/App.js

import React, { useState } from 'react';
import { initializePiSDK, authenticateWithPi } from './utils/pi-sdk';
import './App.css';

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const handleAuthentication = async () => {
    try {
      await authenticateWithPi();
      setUserAuthenticated(true);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      {!userAuthenticated ? (
        <button onClick={handleAuthentication}>Se connecter avec Pi</button>
      ) : (
        <p>Utilisateur authentifié</p>
      )}
    </div>
  );
};

export default App;
