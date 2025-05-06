export async function initiatePayment({ amount, memo }) {
  if (!window?.Pi) {
    throw new Error("Le SDK Pi n'est pas chargé.");
  }

  const scopes = ['payments'];
  const onIncompletePaymentFound = (payment) => {
    console.warn("Paiement incomplet détecté :", payment);
  };

  const Pi = window.Pi;

  const user = await Pi.authenticate(scopes, onIncompletePaymentFound);

  const paymentData = {
    amount: amount.toString(),
    memo,
    metadata: { userUid: user.uid },
  };

  const payment = await Pi.createPayment(paymentData);

  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment),
  });

  const result = await response.json();
  if (!result || !result.paymentId) {
    throw new Error("Vérification du paiement échouée.");
  }

  return result;
}
