import React, { useEffect } from "react";
import PiPaymentButton from "./PiPaymentButton";

function App() {
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: true
      });
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Test Paiement Pi</h1>
      <PiPaymentButton />
    </div>
  );
}

export default App;
