// src/utils/pi-sdk.js
export const loadPiSDK = () => {
  // Vérifie si le SDK est déjà chargé
  if (typeof window.Pi !== 'undefined') {
    console.log('SDK Pi déjà chargé');
    return window.Pi;
  }

  // Charge le script Pi SDK si nécessaire
  const script = document.createElement('script');
  script.src = 'https://cdn.pi.network/sdk/v2.js';  // URL du SDK Pi
  script.async = true;
  script.onload = () => {
    console.log('SDK Pi chargé avec succès');
  };
  script.onerror = () => {
    console.error('Erreur de chargement du SDK Pi');
  };
  document.head.appendChild(script);
};

// Appelle cette fonction lorsque tu veux t'assurer que le SDK est chargé