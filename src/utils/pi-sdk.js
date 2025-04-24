// src/pi-sdk.js
export const initPiNetwork = () => {
  if (window.Pi) {
    window.Pi.init({
      version: "2.0",
      sandbox: true
    });
  } else {
    console.error("Pi Network SDK not found.");
  }
};
