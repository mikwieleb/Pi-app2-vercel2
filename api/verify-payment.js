// api/verify-payment.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;

  try {
    // Ici, simule l'approbation côté serveur
    console.log("Vérification du paiement :", paymentId);

    // En vrai projet : vérifier paymentId via l'API Pi backend
    const verified = true; // Simule que le paiement est valide

    res.status(200).json({ verified });
  } catch (error) {
    console.error("Erreur de vérification :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
