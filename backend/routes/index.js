const express = require('express');
const router = express.Router();
const { verifyPayment } = require('../utils/pi');
const { authenticatePiUser } = require('../middlewares/pi-auth');

router.post('/verify-payment', authenticatePiUser, async (req, res) => {
  const { paymentId } = req.body;
  if (!paymentId) {
    return res.status(400).json({ error: 'Missing paymentId' });
  }

  try {
    const payment = await verifyPayment(paymentId);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found or not completed' });
    }

    return res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ error: 'Failed to verify payment' });
  }
});

module.exports = router;
