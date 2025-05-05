// Chargement du SDK Pi Network si on est dans le Pi Browser
if (window && !window.Pi && window.navigator.userAgent.includes("PiBrowser")) {
  const script = document.createElement("script");
  script.src = "https://sdk.minepi.com/pi-sdk.js";
  script.async = true;
  script.onload = () => {
    console.log("Pi SDK chargé avec succès.");
  };
  document.head.appendChild(script);
}
