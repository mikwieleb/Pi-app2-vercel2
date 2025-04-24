export const authenticateWithPi = async () => {
  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      if (window.Pi && window.Pi.authenticate) {
        clearInterval(checkInterval);
        try {
          window.Pi.init({ version: "2.0", sandbox: true });
          const scopes = ["username", "payments"];
          window.Pi.authenticate(scopes, (auth) => {
            if (auth && auth.user) resolve(auth);
            else reject("Authentification échouée");
          });
        } catch (error) {
          reject("Erreur lors de Pi.init : " + error.message);
        }
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkInterval);
      reject("Chargement du SDK Pi trop long ou échoué.");
    }, 5000);
  });
};
