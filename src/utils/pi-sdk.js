// src/pi-sdk.js

// Simulation d'un SDK Pi simplifié
class PiSdk {
  constructor({ appId, apiKey }) {
    this.appId = appId;
    this.apiKey = apiKey;
  }

  async payment(amount) {
    console.log(`Paiement simulé de ${amount} Pi avec l'appId ${this.appId}`);
    // Ici tu pourrais intégrer la vraie logique de paiement avec Pi Network SDK
    alert(`Paiement de ${amount} Pi effectué !`);
  }
}

const piSdk = new PiSdk({
  appId: 'venteautomobile.pi', // Ton App ID
  apiKey: 'tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy', // Ta clé API Testnet
});

export default piSdk;
