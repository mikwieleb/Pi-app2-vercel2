try {
  const payment = await window.Pi.createPayment({
    amount: 0.001,
    memo: "Paiement test Pi",
    metadata: { type: "test-payment" }
  });

  console.log("Payment object reçu :", payment);

  if (!payment.identifier) {
    alert('Erreur : Payment identifier non trouvé.');
    return;
  }

  const res = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId: payment.identifier })
  });

  const result = await res.json();
  console.log("Réponse serveur :", result);

  if (res.ok) {
    alert('Paiement validé !');
  } else {
    alert('Erreur serveur : ' + result.error);
  catch (error) {
  console.error('Erreur durant le paiement:', error);
  alert('Erreur pendant le paiement : ' + (error?.message || error));
}
