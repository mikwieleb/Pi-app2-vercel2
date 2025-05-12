export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { paymentId } = req.body;

  try {
    console.log("Paiement reçu pour approbation :", paymentId);
    return res.status(200).json({ approved: true });
  } catch (error) {
    console.error("Erreur serveur pendant l’approbation du paiement :", error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
