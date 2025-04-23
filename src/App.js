import React, { useEffect } from 'react';
import Pi from './pi-sdk'; // vérifie que ce chemin est correct

function App() {
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const scopes = ['payments'];
        const auth = await Pi.authenticate(scopes, (payment) => {
          console.log('Paiement incomplet trouvé :', payment);
        });
        console.log('Utilisateur Pi authentifié :', auth);
      } catch (error) {
        console.error('Erreur pendant l’authentification Pi :', error);
      }
    };

    if (Pi) {
      authenticateUser();
    } else {
      console.warn('SDK Pi non trouvé.');
    }
  }, []);

  return (
    <div>
      <h1>Test paiement Pi</h1>
      {/* Ton bouton de paiement ici */}
    </div>
  );
}

export default App;
