// src/utils/pi-sdk.js

/**
 * Charge dynamiquement le SDK Pi si nécessaire,
 * authentifie l’utilisateur, puis initialise le SDK (testnet).
 * Retourne l’objet d’authentification contenant publicAddress.
 */
export async function initPiSDK() {
  // 1️⃣ Charger le script Pi SDK si non présent
  if (typeof window.Pi === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.pi.network/sdk/v2.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ SDK Pi chargé dynamiquement");
        resolve();
      };
      script.onerror = () => {
        console.error("❌ Échec du chargement du SDK Pi");
        reject(new Error("Chargement du SDK Pi échoué"));
      };
      document.head.appendChild(script);
    });
  } else {
    console.log("ℹ️ SDK Pi déjà présent");
  }

  // 2️⃣ Authentifier l’utilisateur dans Pi Browser
  let authRes;
  try {
    authRes = await window.Pi.authenticate({ appName: "AutomobilePiDemo" });
    console.log("✅ Pi Browser authentifié", authRes);
  } catch (err) {
    console.error("❌ Échec de l’authentification Pi :", err);
    throw new Error("Authentification Pi échouée : " + err.message);
  }

  // 3️⃣ Initialiser le SDK (version + sandbox)
  window.Pi.init({
    version: "2.0",
    sandbox: true, // TESTNET
  });
  console.log("✅ SDK Pi initialisé (testnet)");

  return authRes;
}
