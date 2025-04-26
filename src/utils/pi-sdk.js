// src/utils/pi-sdk.js

export const initPiSdk = () => {
  const isSandbox = process.env.REACT_APP_PI_SANDBOX === "true";

  if (window.Pi) {
    window.Pi.init({
      version: "2.0",
      sandbox: isSandbox,
    });
    console.log("SDK Pi initialisé");
  } else {
    console.error("Le SDK Pi n'est pas chargé !");
  }
};
