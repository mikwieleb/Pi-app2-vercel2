import React from "react";

function App() {
  const handleLogin = async () => {
    if (!window.Pi) {
      alert("Pi SDK non chargé !");
      return;
    }
    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes);
      console.log('Authentifié avec succès:', authResult);
      alert('Bienvenue ' + authResult.user.username);
    } catch (error) {
      console.error('Erreur de connexion Pi:', error);
      alert('Erreur : ' + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px", backgroundColor: "#f5f0ff", height: "100vh" }}>
      <h1>Vente Automobile Pi</h1>
      <button onClick={handleLogin}>Se connecter avec Pi</button>
    </div>
  );
}

export default App;
