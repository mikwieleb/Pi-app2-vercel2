function waitForPiSDK() {
  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      if (window.Pi && window.Pi.authenticate) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);
    setTimeout(() => {
      clearInterval(checkInterval);
      reject("Pi SDK non chargé à temps");
    }, 5000); // max 5 secondes
  });
}

export async function authenticateWithPi() {
  try {
    await waitForPiSDK();

    const scopes = ["username", "wallet"];
    return new Promise((resolve, reject) => {
      window.Pi.authenticate(scopes, (authData) => {
        if (authData && authData.username) {
          resolve(authData);
        } else {
          reject("Authentification échouée");
        }
      });
    });
  } catch (err) {
    throw new Error("Erreur SDK : " + err);
  }
}
