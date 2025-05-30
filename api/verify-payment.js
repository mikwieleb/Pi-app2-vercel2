export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: "paymentId requis" });
  }

  // Ici tu pourras ajouter une vérification réelle via l'API Pi Network si besoin
  console.log("Vérification du paiement :", paymentId);

  return res.status(200).json({ verified: true });
}
