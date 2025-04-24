import React, { useEffect, useState } from "react";
import { authenticateWithPi } from "./pi-sdk";

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
      {/* Ton UI ici */}
    </div>
  );
}

export default App;
