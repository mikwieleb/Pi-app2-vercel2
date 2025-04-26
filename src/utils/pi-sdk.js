export const initializePiSDK = () => {
  if (window.Pi) {
    console.log("SDK Pi déjà initialisé.");
    return;
  }
  
  // Chargement du SDK Pi
  const script = document.createElement("script");
  script.src = "https://cdn.minepi.com/pi-sdk.js"; // Assure-toi que le lien est correct
  script.async = true;
  script.onload = () => {
    console.log("SDK Pi chargé avec succès.");
  };
  document.body.appendChild(script);
};

export const authenticateWithPi = async () => {
  return new Promise((resolve, reject) => {
    if (!window.Pi) {
      reject("Le SDK Pi n'est pas disponible.");
      return;
    }

    // Tentative de connexion à Pi
    window.Pi.authenticate()
      .then((authResult) => {
        resolve(authResult);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
