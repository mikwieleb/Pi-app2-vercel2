export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId, txid } = req.body;

  console.log('Paiement confirmé :', paymentId, 'Transaction ID :', txid);

  // Tu peux ici enregistrer le paiement dans une base, envoyer un email, etc.

  return res.status(200).json({ message: 'Paiement complété avec succès' });
}
