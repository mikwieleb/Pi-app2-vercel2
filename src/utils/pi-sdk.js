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

export const payment = async (amount) => {
  if (!pi) {
    throw new Error('Pi SDK non initialisé.');
  }

  try {
    // Créer un paiement via Pi Network
    const result = await pi.createPayment({
      amount: amount,
      memo: 'Achat voiture',
      metadata: { description: 'Paiement vente automobile' },
    });
    
    console.log('Paiement effectué :', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    throw new Error('Erreur lors du paiement.');
  }
};
