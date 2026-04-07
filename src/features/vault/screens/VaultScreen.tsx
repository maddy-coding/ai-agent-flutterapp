import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { FrostCard } from '@/components/common/FrostCard';
import { Pill } from '@/components/common/Pill';
import { ScreenShell } from '@/components/common/ScreenShell';
import { useIntegrations } from '@/hooks/useNexusData';
import { requestVaultUnlock } from '@/services/security/biometricGate';
import { useAgentStore } from '@/store/agentStore';
import { colors, radius, spacing } from '@/theme/tokens';

export function VaultScreen() {
  const { data: integrations = [] } = useIntegrations();
  const {
    biometricUnlocked,
    setBiometricUnlocked,
    shadowMode,
    toggleShadowMode,
  } = useAgentStore();

  const onUnlock = async () => {
    const unlocked = await requestVaultUnlock();
    setBiometricUnlocked(unlocked);
  };

  return (
    <ScreenShell
      eyebrow="Vault"
      title="One place for every credential."
      subtitle="OAuth connections are isolated behind biometrics before an account can be edited."
    >
      {!biometricUnlocked ? (
        <FrostCard>
          <Text style={styles.lockTitle}>Vault locked</Text>
          <Text style={styles.lockCopy}>
            Use Face ID or fingerprint before editing account settings or viewing token status.
          </Text>
          <Pressable onPress={onUnlock} style={styles.unlockButton}>
            <Text style={styles.unlockButtonText}>Unlock Vault</Text>
          </Pressable>
        </FrostCard>
      ) : null}

      <View style={styles.list}>
        {integrations.map((integration) => (
          <FrostCard key={integration.id}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIdentity}>
                <Text style={styles.label}>{integration.label}</Text>
                <Text style={styles.authType}>{integration.authType}</Text>
              </View>
              <Pill
                label={integration.connected ? 'Connected' : 'Pending'}
                tone={integration.connected ? 'accent' : 'muted'}
              />
            </View>
            <Text style={styles.note}>{integration.securityNote}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Last sync</Text>
              <Text style={styles.metaValue}>{integration.lastSync}</Text>
            </View>

            <View style={styles.shadowRow}>
              <View>
                <Text style={styles.shadowTitle}>Ghost Mode</Text>
                <Text style={styles.shadowCaption}>
                  Allow safe auto-replies on this platform without waiting for approval.
                </Text>
              </View>
              <Switch
                onValueChange={() => toggleShadowMode(integration.id)}
                trackColor={{ false: '#324053', true: 'rgba(64, 217, 197, 0.5)' }}
                thumbColor={shadowMode[integration.id] ? colors.accent : '#D7E1EA'}
                value={shadowMode[integration.id]}
              />
            </View>

            <Pressable
              disabled={!biometricUnlocked}
              style={[
                styles.manageButton,
                !biometricUnlocked && styles.manageButtonDisabled,
              ]}
            >
              <Text style={styles.manageButtonText}>
                {integration.connected ? 'Manage connection' : 'Connect account'}
              </Text>
            </Pressable>
          </FrostCard>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  lockTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  lockCopy: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  unlockButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingVertical: 14,
  },
  unlockButtonText: {
    color: colors.background,
    fontWeight: '800',
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardIdentity: {
    flex: 1,
    gap: 4,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  authType: {
    color: colors.accentWarm,
    fontSize: 12,
    fontWeight: '700',
  },
  note: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  metaLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  metaValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  shadowRow: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    padding: spacing.md,
  },
  shadowTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  shadowCaption: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    maxWidth: 240,
  },
  manageButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 186, 102, 0.16)',
    borderRadius: radius.md,
    marginTop: spacing.md,
    paddingVertical: 13,
  },
  manageButtonDisabled: {
    opacity: 0.5,
  },
  manageButtonText: {
    color: colors.accentWarm,
    fontWeight: '700',
  },
});

