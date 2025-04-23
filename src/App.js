// src/App.js
import React from 'react';
import PiPaymentButton from './PiPaymentButton';

function App() {
  return (
    <div style={styles.container}>
      <img
        src="https://pi.app/static/media/pi-icon.2d4f6a62.svg"
        alt="Pi Logo"
        style={styles.logo}
      />
      <h1 style={styles.title}>Test Paiement Pi</h1>
      <PiPaymentButton />
      <button style={styles.openButton} onClick={() => window.location.href = 'pi://pi-app-browser'}>
        Ouvrir l'application
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f6f0ff',
    minHeight: '100vh',
    padding: '2rem',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  openButton: {
    marginTop: '1rem',
    padding: '1rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#ffcc80',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default App;
