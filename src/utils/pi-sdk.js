export const authenticateWithPi = async () => {
  return new Promise((resolve, reject) => {
    const check = setInterval(() => {
      if (window.Pi && window.Pi.authenticate) {
        clearInterval(check);
        try {
          window.Pi.init({ version: "2.0", sandbox: true });
          const scopes = ["username", "payments"];
          window.Pi.authenticate(scopes, (auth) => {
            if (auth && auth.user) resolve(auth);
            else reject("Authentification échouée");
          });
        } catch (e) {
          reject("Erreur init Pi : " + e);
        }
      }
    }, 100);
    setTimeout(() => {
      clearInterval(check);
      reject("SDK Pi non chargé");
    }, 5000);
  });
};
