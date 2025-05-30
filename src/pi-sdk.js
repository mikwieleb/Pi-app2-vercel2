const Pi = window.Pi;

if (Pi) {
  Pi.init({
    version: "2.0",
    sandbox: true,
    onIncompletePaymentFound: (payment) => {
      console.log("Paiement incomplet trouvé :", payment);
    },
  });
}

export default Pi;
