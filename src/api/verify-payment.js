export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId, uid, amount } = req.body;

  const API_KEY = "842bb868b096454738fb7b163b7aac98120e63397dc75580ef3662cd3b1c14975665bc7bc1a93fcc620a364bba119abddc32bc22a17de0f55837e0b49ac64f13";
  const BASE_URL = "https://api.minepi.com/v2/payments/" + paymentId;

  try {
    // Appel API Pi Network pour approuver le paiement
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Key ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        txid: paymentId,
      }),
    });

    const data = await response.json();
    console.log("Réponse de Pi Network :", data);

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ error: "Erreur d'approbation", details: data });
    }
  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
