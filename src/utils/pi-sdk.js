let isPiInitialized = false;

export const initializePiSDK = () => {
  if (!window.Pi) {
    console.error("Pi SDK non chargé.");
    return;
  }

  if (!isPiInitialized) {
    window.Pi.init({ version: "2.0", sandbox: true });
    console.log("Pi SDK initialisé.");
    isPiInitialized = true;
  }
};

export const authenticateWithPi = async () => {
  if (!window.Pi) {
    console.error("Pi SDK non chargé.");
    throw new Error("Pi SDK not loaded");
  }

  if (!isPiInitialized) {
    initializePiSDK(); // Assure que init() est bien appelé
  }

  return new Promise((resolve, reject) => {
    window.Pi.authenticate(
      onIncompletePaymentFound,
      (auth) => {
        resolve(auth);
      },
      (error) => {
        console.error("Erreur d'authentification Pi :", error);
        reject(error);
      }
    );
  });
};

const onIncompletePaymentFound = (payment) => {
  console.log("Paiement incomplet détecté :", payment);
};
