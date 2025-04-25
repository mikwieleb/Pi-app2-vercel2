export const initializePiSDK = () => {
  if (!window.Pi) {
    console.error("Pi SDK non chargé.");
    throw new Error("Pi SDK not loaded");
  }

  // Initialiser le SDK Pi dès que la page est chargée, avant toute interaction.
  window.Pi.init({ version: "2.0", sandbox: true });  // Ajout de sandbox pour le testnet
  console.log("Pi SDK initialisé");
};

export const authenticateWithPi = async () => {
  // Vérifie si le SDK est bien initialisé avant de tenter une authentification
  if (!window.Pi) {
    console.error("Pi SDK non chargé.");
    throw new Error("Pi SDK not loaded");
  }

  return new Promise((resolve, reject) => {
    // Authentification de l'utilisateur Pi
    window.Pi.authenticate(
      onIncompletePaymentFound,
      (auth) => {
        resolve(auth);  // Authentification réussie
      },
      (error) => {
        reject(error);  // Authentification échouée
      }
    );
  });
};

// Callback pour gérer les paiements incomplets
const onIncompletePaymentFound = (payment) => {
  console.log("Paiement incomplet :", payment);
};
