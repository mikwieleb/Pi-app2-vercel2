export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: "paymentId manquant" });
  }

  try {
    const response = await fetch(`https://api.minepi.com/payments/${paymentId}`, {
      headers: {
        Authorization: `Key ${process.env.PI_API_SECRET}`
      }
    });

    const payment = await response.json();

    if (payment && payment.status === "COMPLETED") {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "Paiement non validé." });
    }
  } catch (error) {
    console.error("Erreur vérification :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
