// src/pi-sdk.js

// Vérifie que Pi est bien défini (SDK chargé)
if (window.Pi) {
  window.Pi.init({
    version: "2.0",
    sandbox: true, // Mets à false pour la version mainnet
  });
  console.log("Pi SDK initialisé.");
} else {
  console.error("Pi SDK non chargé !");
}
