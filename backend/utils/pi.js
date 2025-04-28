const axios = require('axios');

const verifyPayment = async (paymentId) => {
  try {
    const response = await axios.get(`https://api.minepi.com/payments/${paymentId}`, {
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
      },
    });

    const paymentData = response.data;
    if (paymentData.transaction && paymentData.transaction.txid) {
      return paymentData;
    }

    return null;
  } catch (error) {
    console.error('Error fetching payment:', error.response ? error.response.data : error.message);
    return null;
  }
};

module.exports = { verifyPayment };
