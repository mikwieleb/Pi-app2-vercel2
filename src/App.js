import React, { useEffect, useState } from "react";
import { authenticateWithPi } from "./pi-sdk";
import PiPaymentButton from "./PiPaymentButton";
import "./App.css";
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
      <h1>Vente Automobile Pi</h1>

      {!user ? (
        <p>Connexion à Pi Network en cours...</p>
      ) : (
        <>
          <p>Bienvenue, {user.username} !</p>
          <PiPaymentButton />
          <a href="pi://com.pi.app" className="open-app-button">Ouvrir l'application</a>
        </>
      )}
    </div>
  );
}

export default App;
