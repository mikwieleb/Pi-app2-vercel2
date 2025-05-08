# Vente Automobile avec Pi Network

Cette application permet de :
- Afficher un bouton "Ouvrir l'application"
- Afficher un bouton "Payer 0.001 Pi"
- Intégrer le SDK Pi Network en Testnet
- Vérifier un paiement côté backend

## Structure

- **React** (frontend)
- **API routes** (backend dans `/src/api`)
- **Déploiement Vercel** compatible
- **Paiement Testnet Pi Network**

## Informations utiles

- App ID : `venteautomobile.pi`
- API Key (Testnet) : `tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy`

## Déploiement

1. Cloner le repo
2. `npm install`
3. Déployer sur Vercel

## Aide

Pour toute erreur de type `Pi SDK was not initialized`, assurez-vous que `window.Pi.init()` est bien appelé dans `pi-sdk.js`.
