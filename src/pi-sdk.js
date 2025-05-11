// src/pi-sdk.js
import { Pi } from '@pinetwork-js/sdk';

const PiSDK = Pi.init({
  version: '2.0',
  sandbox: true,
  appId: 'venteautomobile.pi',
});

export default PiSDK;
