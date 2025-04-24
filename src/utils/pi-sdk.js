// src/pi-sdk.js

export function initPiNetwork(retries = 10, delay = 300) {
  if (window.Pi) {
    window.Pi.init({
      version: "2.0",
      sandbox: true,
    });
    console.log("Pi SDK initialisé avec succès.");
  } else if (retries > 0) {
    console.warn("Pi SDK pas encore prêt, nouvelle tentative...");
    setTimeout(() => initPiNetwork(retries - 1, delay), delay);
  } else {
    console.error("Erreur : Pi SDK non chargé après plusieurs tentatives.");
  }
}
