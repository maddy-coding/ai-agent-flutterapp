import { StyleSheet, Switch, Text, View } from 'react-native';

import { FrostCard } from '@/components/common/FrostCard';
import { Pill } from '@/components/common/Pill';
import { ScreenShell } from '@/components/common/ScreenShell';
import { useAgentStore } from '@/store/agentStore';
import { colors, spacing } from '@/theme/tokens';

const settingsMeta = [
  {
    key: 'toneMirroring' as const,
    title: 'Tone Mirroring',
    caption: 'Matches formal, friendly, or direct writing styles from the sender.',
  },
  {
    key: 'autoFollowUp' as const,
    title: 'Auto Follow-Up',
    caption: 'Prompts a nudge if the thread goes quiet for 48 hours after a sent reply.',
  },
  {
    key: 'multilingualReplies' as const,
    title: 'Multi-Language Drafting',
    caption: 'Detects incoming language and drafts a response in the same language.',
  },
];

export function SettingsScreen() {
  const { toneMirroring, autoFollowUp, multilingualReplies, toggleSetting } = useAgentStore();

  const settingState = {
    toneMirroring,
    autoFollowUp,
    multilingualReplies,
  };

  return (
    <ScreenShell
      eyebrow="Agent Settings"
      title="Tune the behavior of the Nexus brain."
      subtitle="Keep the assistant cautious where needed and automatic where trust is already earned."
    >
      <FrostCard>
        <Text style={styles.stackTitle}>Core runtime</Text>
        <Text style={styles.runtimeLine}>React Native + TypeScript + TanStack Query + Zustand</Text>
        <Text style={styles.runtimeLine}>Background sync via Expo TaskManager</Text>
        <Text style={styles.runtimeLine}>LLM drafting through a backend bridge</Text>
        <View style={styles.pillRow}>
          <Pill label="Shadow Mode Ready" />
          <Pill label="WatermelonDB Planned" tone="warm" />
        </View>
      </FrostCard>

      <View style={styles.list}>
        {settingsMeta.map((item) => (
          <FrostCard key={item.key}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingCaption}>{item.caption}</Text>
              </View>
              <Switch
                onValueChange={() => toggleSetting(item.key)}
                trackColor={{ false: '#324053', true: 'rgba(64, 217, 197, 0.5)' }}
                thumbColor={settingState[item.key] ? colors.accent : '#D7E1EA'}
                value={settingState[item.key]}
              />
            </View>
          </FrostCard>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  stackTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  runtimeLine: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
  settingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  settingCaption: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
});
