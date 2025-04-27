// src/utils/pi-sdk.js

let pi;

export const initializePiSdk = () => {
  if (window && window.Pi) {
    pi = window.Pi;
    console.log('Pi SDK initialisé.');
  } else {
    console.error('Pi SDK non disponible.');
    alert('Le SDK Pi n\'est pas disponible. Assurez-vous d\'utiliser le Pi Browser.');
  }
};

export const login = async () => {
  if (!pi) {
    throw new Error('Pi SDK non initialisé.');
  }

  const scopes = ['username', 'payments'];
  return await pi.authenticate(scopes);
};

export const payment = async (amount) => {
  if (!pi) {
    throw new Error('Pi SDK non initialisé.');
  }

  return await pi.createPayment({
    amount: amount,
    memo: 'Achat voiture',
    metadata: { description: 'Paiement vente automobile' },
  });
};
