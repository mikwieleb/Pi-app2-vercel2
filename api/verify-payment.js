export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'paymentId manquant' });
    }

    console.log("Paiement reçu côté serveur :", paymentId);

    // Pour testnet, on retourne succès sans vérification réelle
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Erreur durant le paiement:', error);
    return res.status(500).json({ error: 'Erreur pendant le paiement: ' + error.message });
  }
}
