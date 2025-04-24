export function authenticateWithPi() {
  return new Promise((resolve, reject) => {
    if (window.Pi) {
      const scopes = ["username", "wallet"];
      window.Pi.authenticate(scopes, (authData) => {
        if (authData && authData.username) {
          resolve(authData);
        } else {
          reject("Authentification échouée");
        }
      });
    } else {
      reject("Pi SDK non initialisé");
    }
  });
}
