// pi-sdk.js
export const Pi = window.Pi;

if (typeof Pi !== 'undefined') {
  Pi.init({
    version: "2.0",
    sandbox: true, // Important : testnet Pi
  });
} else {
  console.warn("Le SDK Pi n'est pas disponible. Assurez-vous d'ouvrir l'application dans Pi Browser.");
}
