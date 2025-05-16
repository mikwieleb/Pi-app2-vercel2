// /api/verify-payment.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { paymentId, txid, userUid } = req.body;

    if (!paymentId || !txid || !userUid) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    // Appel vers l'API Pi pour confirmer le paiement
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erreur de l’API Pi :', data);
      return res.status(response.status).json({ error: data });
    }

    console.log('Paiement confirmé :', data);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Erreur backend :', error);
    return res.status(500).json({ error: 'Erreur interne serveur' });
  }
}
