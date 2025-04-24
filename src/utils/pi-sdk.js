// src/pi-sdk.js

export function initPiNetwork() {
  if (window.Pi) {
    window.Pi.init({
      version: "2.0",
      sandbox: true,
    });
    console.log("Pi SDK initialisé avec succès.");
  } else {
    console.error("Erreur : Pi SDK non chargé !");
  }
}
