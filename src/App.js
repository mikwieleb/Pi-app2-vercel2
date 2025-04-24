// src/App.js
import React, { useEffect } from "react";
import { initPiNetwork } from "./pi-sdk";

function App() {
  useEffect(() => {
    initPiNetwork();
  }, []);

  return (
    <div>
      {/* ton UI ici */}
    </div>
  );
}

export default App;
