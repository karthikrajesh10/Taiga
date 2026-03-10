import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../config/msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);

// Initialize once when the module loads
const msalReady = msalInstance.initialize();

export async function microsoftLogin() {
  await msalReady; // waits for initialization, but only runs once
  const result = await msalInstance.loginPopup(loginRequest);
  return result.accessToken;
}