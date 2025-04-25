export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId, txid } = req.body;

  if (!paymentId || !txid) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  // Ici, normalement, tu devrais appeler l'API Pi pour vérifier le paiement
  console.log("Vérification du paiement :", { paymentId, txid });

  // Simulation d’une validation réussie
  return res.status(200).json({ success: true, paymentId, txid });
}
