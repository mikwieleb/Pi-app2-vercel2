// /api/verify-payment.js

const axios = require('axios');
require('dotenv').config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: 'Missing paymentId' });
  }

  try {
    const response = await axios.get(`https://api.minepi.com/v2/payments/${paymentId}`, {
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
      },
    });

    const payment = response.data;

    if (payment.transaction && payment.transaction.txid) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: 'Payment not completed.' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error.response?.data || error.message);
    return res.status(500).json({ success: false, error: 'Server error verifying payment.' });
  }
}
