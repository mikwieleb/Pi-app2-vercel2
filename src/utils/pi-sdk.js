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
  } else {
    console.log("Pi SDK déjà initialisé.");
  }
};

export const authenticateWithPi = async () => {
  if (!window.Pi) {
    console.error("Pi SDK non chargé.");
    throw new Error("Pi SDK not loaded");
  }

  if (!isPiInitialized) {
    initializePiSDK(); // Assure que init() est appelé avant
  }

  return new Promise((resolve, reject) => {
    console.log("Tentative d'authentification avec Pi...");
    window.Pi.authenticate(
      (auth) => {
        console.log("Authentification réussie :", auth);
        resolve(auth);
      },
      (error) => {
        console.error("Erreur d'authentification Pi :", error);
        reject(error);
      }
    );
  });
};
