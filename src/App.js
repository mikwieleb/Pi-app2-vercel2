import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Fonction de connexion avec Pi
  const handleLogin = async () => {
    if (!window.Pi) {
      alert("Pi SDK non chargé. Ouvre cette page dans Pi Browser.");
      return;
    }

    try {
      const scopes = ["username", "payments"];
      const authResult = await window.Pi.authenticate(scopes);
      setUser(authResult.user);
      console.log("Utilisateur connecté :", authResult);
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  // Fonction de paiement
  const handlePayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK non chargé.");
      return;
    }

    try {
      const paymentData = await window.Pi.createPayment({
        amount: 0.001,
        memo: "Paiement de test Vente Automobile",
        metadata: { type: "vente" },
      });

      console.log("Paiement initié :", paymentData);
    } catch (error) {
      console.error("Erreur de paiement :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>

      {!user ? (
        <button onClick={handleLogin}>Se connecter avec Pi</button>
      ) : (
        <>
          <p>Bienvenue, {user.username} !</p>
          <button onClick={handlePayment}>Payer 0,001 Pi</button>
        </>
      )}
    </div>
  );
}

export default App;
