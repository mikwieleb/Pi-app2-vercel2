export async function authenticateWithPi() {
  if (!window.Pi) {
    throw new Error("Pi SDK non chargé");
  }

  try {
    window.Pi.init({ version: "2.0", sandbox: true }); // Initialisation ici
  } catch (e) {
    console.warn("Pi.init déjà appelé ou erreur : ", e);
  }

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
