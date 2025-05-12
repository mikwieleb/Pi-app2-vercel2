import { Pi } from '@pi-network/pi-backend-sdk';

const PI_API_KEY = process.env.PI_API_KEY || 'tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy';

const pi = new Pi(PI_API_KEY, {
  sandbox: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { paymentId, txid } = req.body;

  try {
    const payment = await pi.completePayment(paymentId, txid);
    console.log("Paiement complété :", payment);
    return res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error("Erreur lors de la finalisation du paiement :", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}p
