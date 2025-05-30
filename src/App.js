import React from "react";
import Pi from "./pi-sdk";
import PiPaymentButton from "./PiPaymentButton";

console.log("✅ App.js est chargé");

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Arial" }}>
      <h1>✅ Vente Automobile est en ligne</h1>
      <button
        onClick={() => window.open("https://vente-automobile-pi-g6hd.vercel.app", "_blank")}
        style={{ padding: "10px 20px", marginBottom: "20px", backgroundColor: "#a64ca6", color: "white", border: "none", borderRadius: "5px" }}
      >
        Ouvrir l'application
      </button>
      <PiPaymentButton />
    </div>
  );
}

export default App;
