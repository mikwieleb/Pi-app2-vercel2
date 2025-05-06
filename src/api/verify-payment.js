export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const payment = req.body;

  const API_KEY = "tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy";
  const paymentId = payment.identifier;

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid: payment.transaction.txid }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur Pi API :", data);
      return res.status(500).json({ error: 'Échec de la confirmation du paiement' });
    }

    return res.status(200).json({ paymentId });
  } catch (error) {
    console.error("Erreur côté serveur :", error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
