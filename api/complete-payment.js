export default async function handler(req, res) {
  const { paymentId, txid } = req.body;
  console.log("Paiement complété :", paymentId, "TXID :", txid);
  res.status(200).json({ success: true });
}
