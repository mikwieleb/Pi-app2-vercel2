import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;
  if (!paymentId) {
    return res.status(400).json({ error: "paymentId manquant" });
  }

  // Récupération de la clé secrète Pi injectée par Vercel
  const secret = process.env.PI_API_SECRET;

  // ← Ajoute ce log ici
  console.log("🔥 PI_API_SECRET =", secret ? secret.slice(0, 6) + "…" : secret);

  if (!secret) {
    console.error("🛑 PI_API_SECRET non défini");
    return res.status(500).json({ error: "Clé secrète non configurée" });
  }

  try {
    // Endpoint sandbox (testnet)
    const url = `https://sandbox.minepi.com/v2/payments/${paymentId}`;

    const piRes = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
    });

    if (!piRes.ok) {
      console.error("Erreur API Pi:", await piRes.text());
      return res.status(piRes.status).json({ error: "Erreur lors de la requête Pi" });
    }

    const piData = await piRes.json();
    console.log("Réponse Pi API :", piData);

    // Vérifie le statut
    if (piData.status === "confirmed") {
      return res.status(200).json({ success: true, txid: piData.transaction_id });
    } else {
      return res.status(400).json({
        error: `Paiement non confirmé (status: ${piData.status})`,
      });
    }

  } catch (error) {
    console.error("Exception verify-payment:", error);
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}
