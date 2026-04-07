import 'expo-dev-client';

import { RootNavigator } from './src/app/RootNavigator';
import { AppProviders } from './src/app/AppProviders';

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
