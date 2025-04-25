export const initPiNetwork = () => {
  if (!window.Pi) {
    console.error("Pi SDK not found. Make sure it's loaded in index.html.");
    return;
  }

  window.Pi.init({ version: "2.0" });
};
