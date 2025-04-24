import React, { useEffect, useState } from "react";
import { authenticateWithPi } from "./pi-sdk";
import PiPaymentButton from "./PiPaymentButton";
import logo from "./logo.png";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticateWithPi()
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => {
        console.error("Erreur d'authentification Pi :", err);
      });
  }, []);

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Bienvenue sur l'application Pi Network</h1>

      {!user ? (
        <p>Connexion en cours...</p>
      ) : (
        <>
          <p>Connecté en tant que : {user.username}</p>
          <PiPaymentButton />
        </>
      )}
    </div>
  );
}

export default App;
