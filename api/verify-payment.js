export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId } = req.body;

  console.log('Paiement prêt pour approbation serveur :', paymentId);

  // Ici tu peux enregistrer ou vérifier le paiement dans une base si nécessaire

  return res.status(200).json({ message: 'Paiement vérifié avec succès' });
}
