import React from "react";
import PiPaymentButton from "./PiPaymentButton";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Bienvenue sur l'App Pi Network</h1>
      <img src="/logo.png" alt="Logo" style={{ width: "150px" }} />
      <br />
      <PiPaymentButton />
      <br />
      <button onClick={() => window.open("https://app-pi-browser.pi", "_blank")}>
        Ouvrir l'application
      </button>
    </div>
  );
}

export default App;
