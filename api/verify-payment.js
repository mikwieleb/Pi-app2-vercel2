export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: "paymentId requis" });
  }

  // Logique fictive de vérification pour test
  console.log("Vérification du paiement :", paymentId);

  return res.status(200).json({ verified: true });
}
