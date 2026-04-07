import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { UnifiedInboxScreen } from '@/features/inbox/screens/UnifiedInboxScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { TemplatesScreen } from '@/features/templates/screens/TemplatesScreen';
import { VaultScreen } from '@/features/vault/screens/VaultScreen';
import { navigationTheme } from '@/theme/navigationTheme';
import { colors } from '@/theme/tokens';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Command: 'view-dashboard-outline',
  Inbox: 'message-badge-outline',
  Vault: 'shield-lock-outline',
  Templates: 'text-box-check-outline',
  Agent: 'tune-variant',
} as const;

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: '#0D1828',
            borderTopColor: colors.border,
            height: 72,
            paddingTop: 8,
            paddingBottom: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              name={tabIcons[route.name as keyof typeof tabIcons]}
              size={size}
            />
          ),
        })}
      >
        <Tab.Screen component={DashboardScreen} name="Command" />
        <Tab.Screen component={UnifiedInboxScreen} name="Inbox" />
        <Tab.Screen component={VaultScreen} name="Vault" />
        <Tab.Screen component={TemplatesScreen} name="Templates" />
        <Tab.Screen component={SettingsScreen} name="Agent" />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

