// src/utils/pi-sdk.js

export const initiatePayment = async (username) => {
  try {
    const paymentData = {
      amount: 0.001,
      memo: "Paiement Vente Automobile",
      metadata: { username },
    };

    const payment = await window.Pi.createPayment(paymentData);
    console.log('Payment created:', payment);
  } catch (error) {
    console.error('Payment initiation failed:', error);
  }
};
