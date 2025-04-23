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
      <h1 style={styles.title}>Bienvenue sur l'application Pi !</h1>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  logo: {
    width: 80,
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '2rem',
    color: '#3c1c78',
  },
  openButton: {
    marginTop: '1.5rem',
    padding: '1rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#ffcc80',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default App;
