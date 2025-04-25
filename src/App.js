// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Chargement SDK...");

  useEffect(() => {
    const checkAndInitPi = () => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0", sandbox: true });
        console.log("✅ SDK Pi initialisé !");
        setStatus("SDK Pi initialisé.");
      } else {
        console.warn("SDK non dispo, nouvelle tentative dans 500ms...");
        setTimeout(checkAndInitPi, 500);
      }
    };

    checkAndInitPi();
  }, []);

  const handleLogin = async () => {
    try {
      const scopes = ["username", "payments"];
      const user = await window.Pi.authenticate(scopes, (payment) => {
        console.log("Paiement incomplet trouvé :", payment);
      });
      console.log("Utilisateur connecté :", user);
      setUser(user);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  const handlePayment = async () => {
    try {
      await window.Pi.createPayment({
        amount: 0.001,
        memo: "Paiement test 0.001 Pi",
        metadata: { type: "vente-auto", itemId: "1234" },
        onReadyForServerApproval: async (paymentId) => {
          console.log("Ready for approval :", paymentId);
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log("Paiement prêt à être vérifié :", paymentId);
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });

          const result = await res.json();
          console.log("Résultat vérification :", result);
          alert(result.verified ? "✅ Paiement vérifié !" : "❌ Paiement non vérifié.");
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé :", paymentId);
        },
        onError: (error) => {
          console.error("Erreur de paiement :", error);
        },
      });
    } catch (error) {
      console.error("Erreur générale de paiement :", error);
    }
  };

  return (
    <div className="App">
      <h1>Vente Automobile Pi</h1>
      <p>{status}</p>

      {!user ? (
        <button onClick={handleLogin}>Se connecter avec Pi</button>
      ) : (
        <>
          <p>Connecté en tant que @{user.username}</p>
          <button onClick={handlePayment}>Payer 0.001 Pi</button>
        </>
      )}
    </div>
  );
}

export default App;
