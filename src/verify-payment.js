import { Pi } from './pi-sdk';

export async function initiatePayment() {
  if (!Pi) {
    alert("Le SDK Pi n'est pas disponible.");
    return;
  }

  try {
    const scopes = ['payments'];
    const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);

    const paymentData = {
      amount: 0.001,
      memo: "Paiement test Pi",
      metadata: { type: "vente-auto", itemId: "pi-001" },
    };

    const payment = await Pi.createPayment(paymentData, {
      onReadyForServerApproval: async (paymentId) => {
        await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId }),
        });
      },
      onIncompletePaymentFound,
      onCancelled: (paymentId) => {
        console.log('Paiement annulé :', paymentId);
      },
      onError: (error, payment) => {
        console.error('Erreur de paiement', error);
      },
    });
  } catch (error) {
    console.error('Erreur SDK Pi', error);
  }
}

function onIncompletePaymentFound(payment) {
  console.log('Paiement incomplet détecté :', payment);
}
