// src/utils/pi-sdk.js

let pi;

export const initializePiSdk = () => {
  if (typeof window !== "undefined" && window.Pi) {
    pi = window.Pi;
    console.log('Pi SDK initialisé correctement.');
  } else {
    console.error('Pi SDK non disponible. Êtes-vous dans Pi Browser ?');
  }
};

export const payment = async (amount) => {
  if (!pi) {
    throw new Error('Pi SDK non initialisé.');
  }

  const paymentData = {
    amount: amount,
    memo: 'Achat voiture',
    metadata: { description: 'Paiement vente automobile' },
  };

  try {
    const payment = await pi.createPayment(paymentData);
    console.log('Paiement créé avec succès :', payment);
    return payment;
  } catch (error) {
    console.error('Erreur lors de la création du paiement :', error);
    throw error;
  }
};
