import * as LocalAuthentication from 'expo-local-authentication';

export async function requestVaultUnlock() {
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!isEnrolled) {
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock Nexus Vault',
    fallbackLabel: 'Use device passcode',
  });

  return result.success;
}

