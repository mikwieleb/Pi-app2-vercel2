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
        Authorization: Authorization: `Key 842bb868b096454738fb7b163b7aac98120e63397dc75580ef3662cd3b1c14975665bc7bc1a93fcc620a364bba119abddc32bc22a17de0f55837e0b49ac64f13`,
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
