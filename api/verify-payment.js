export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: 'paymentId manquant' });
  }

  console.log("Paiement reçu côté serveur :", paymentId);

  // Ici, tu pourrais appeler l’API Pi pour vérifier la validité du paiement
  // Pour l’instant, on simule juste une réponse de succès
  res.status(200).json({ success: true });
}
