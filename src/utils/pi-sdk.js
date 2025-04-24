function waitForPiInit() {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (window.Pi && window.Pi.authenticate) {
        try {
          window.Pi.init({ version: "2.0", sandbox: true });
          clearInterval(interval);
          resolve();
        } catch (e) {
          clearInterval(interval);
          reject("Erreur pendant Pi.init : " + e);
        }
      }
      if (Date.now() - start > 5000) {
        clearInterval(interval);
        reject("Pi SDK non initialisé dans les temps.");
      }
    }, 100);
  });
}

export async function authenticateWithPi() {
  await waitForPiInit();

  return new Promise((resolve, reject) => {
    const scopes = ["username", "wallet"];
    window.Pi.authenticate(scopes, (authData) => {
      if (authData && authData.username) {
        resolve(authData);
      } else {
        reject("Authentification échouée");
      }
    });
  });
}
