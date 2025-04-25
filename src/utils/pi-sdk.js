export const authenticateWithPi = async () => {
  if (!window.Pi) {
    console.error("Pi SDK non chargé.");
    throw new Error("Pi SDK not loaded");
  }

  // Initialiser AVANT toute autre méthode
  window.Pi.init({ version: "2.0" });

  return new Promise((resolve, reject) => {
    window.Pi.authenticate(
      onIncompletePaymentFound,
      (auth) => {
        resolve(auth);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const onIncompletePaymentFound = (payment) => {
  console.log("Paiement incomplet :", payment);
};
