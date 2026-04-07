import * as Keychain from 'react-native-keychain';

export async function saveVaultToken(service: string, token: string) {
  return Keychain.setGenericPassword(service, token, {
    service,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function readVaultToken(service: string) {
  const credentials = await Keychain.getGenericPassword({ service });
  return credentials ? credentials.password : null;
}

