// pages/api/verify-payment.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ message: 'paymentId manquant' });
  }

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Key tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid: 'testnet_tx_id' }), // valeur fictive pour testnet
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ message: 'Paiement complété avec succès', data });
    } else {
      return res.status(400).json({ message: 'Échec de validation du paiement', data });
    }
  } catch (error) {
    console.error('Erreur serveur Pi :', error);
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}
