import { verify } from '@pi-network/pi-backend-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { user, accessToken } = req.body;

  try {
    const verifiedUser = await verify(user.username, accessToken);
    console.log('Utilisateur vérifié :', verifiedUser);
    return res.status(200).json({ verified: true });
  } catch (error) {
    console.error('Erreur vérification :', error);
    return res.status(401).json({ verified: false });
  }
}
