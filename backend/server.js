const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/verify-payment', async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
