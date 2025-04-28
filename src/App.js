import React, { useEffect } from 'react';
import PiPaymentButton from './components/PiPaymentButton';

function App() {
  useEffect(() => {
    const loadPiSDK = async () => {
      if (!window.Pi) {
        console.warn('Pi SDK not found.');
      } else {
        console.log('Pi SDK loaded successfully.');
      }
    };

    loadPiSDK();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenue sur Vente Automobile Pi</h1>
      <PiPaymentButton />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0e6ff',
  },
  title: {
    color: '#8a2be2',
    fontSize: '32px',
    marginBottom: '40px',
  },
};

export default App;
