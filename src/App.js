import React, { useState } from "react";
import PiPaymentButton from "./components/PiPaymentButton";
import { initPi } from "./utils/pi-sdk";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const scopes = ["payments"];
      const result = await window.Pi.authenticate(scopes);
      setUser(result.user);
      console.log("Utilisateur connecté :", result);
    } catch (error) {
      console.error("Erreur de connexion avec Pi :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>

      {!user ? (
        <button className="pi-button" onClick={handleLogin}>
          Se connecter avec Pi
        </button>
      ) : (
        <>
          <p>Connecté en tant que {user.username}</p>
          <PiPaymentButton />
        </>
      )}
    </div>
  );
}

initPi();

export default App;
