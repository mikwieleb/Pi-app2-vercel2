export const authenticateWithPi = async () => {
  if (!window.Pi) {
    console.error("Pi SDK non chargé.");
    throw new Error("Pi SDK not loaded");
  }

  // Vérifie si Pi SDK est initialisé avant de tenter d'authentifier
  if (!window.Pi.isInitialized()) {
    window.Pi.init({ version: "2.0", sandbox: true });  // Assure-toi d'ajouter sandbox=true pour testnet
  }

  return new Promise((resolve, reject) => {
    window.Pi.authenticate(
      onIncompletePaymentFound,
      (auth) => {
        resolve(auth);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
