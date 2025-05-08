export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { paymentId } = req.body;

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Key tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid: 'testnet_tx_id' }) // à remplacer par un txid réel si nécessaire
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Paiement vérifié', data });
    } else {
      res.status(400).json({ message: 'Erreur de vérification', data });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}
