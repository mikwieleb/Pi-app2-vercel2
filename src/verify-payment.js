// src/verify-payment.js

import { authenticateWithPi } from './utils/pi-sdk';

const verifyPayment = async () => {
  try {
    const auth = await authenticateWithPi();
    console.log("Authentification réussie :", auth);
  } catch (error) {
    console.error("Erreur lors de la vérification du paiement :", error);
  }
};

verifyPayment();
