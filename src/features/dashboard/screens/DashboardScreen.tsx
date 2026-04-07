import { StyleSheet, Text, View } from 'react-native';

import { FrostCard } from '@/components/common/FrostCard';
import { Pill } from '@/components/common/Pill';
import { ScreenShell } from '@/components/common/ScreenShell';
import { SectionTitle } from '@/components/common/SectionTitle';
import { ResponseHeatmap } from '@/features/dashboard/components/ResponseHeatmap';
import { useDashboardData, useTriagedMessages } from '@/hooks/useNexusData';
import { colors, spacing } from '@/theme/tokens';

export function DashboardScreen() {
  const { data: dashboard } = useDashboardData();
  const { data: messages } = useTriagedMessages();

  const pendingActions = messages?.filter((message) => message.triage?.shouldPrompt).slice(0, 3) ?? [];

  return (
    <ScreenShell
      eyebrow="Nexus Agent"
      title="Command center for every inbound thread."
      subtitle="A unified response cockpit for Email, WhatsApp, Instagram, Facebook, and X."
    >
      <FrostCard>
        <Text style={styles.heroKicker}>Today at a glance</Text>
        <Text style={styles.heroStat}>11 pending actions</Text>
        <Text style={styles.heroCaption}>
          Three urgent threads want approval, and two follow-ups are due inside the next 48 hours.
        </Text>
      </FrostCard>

      <View style={styles.metricRow}>
        {dashboard?.metrics.map((metric) => (
          <FrostCard key={metric.value} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricCaption}>{metric.caption}</Text>
          </FrostCard>
        ))}
      </View>

      {dashboard ? <ResponseHeatmap data={dashboard.heatmap} /> : null}

      <SectionTitle
        title="Pending Agent Actions"
        caption="Threads that should trigger the Nexus Prompt before the agent replies."
      />

      <View style={styles.actionList}>
        {pendingActions.map((message) => (
          <FrostCard key={message.id}>
            <View style={styles.actionHeader}>
              <Text style={styles.sender}>{message.senderName}</Text>
              <Pill
                label={message.triage?.category ?? 'Pending'}
                tone={message.triage?.category === 'Urgent' ? 'danger' : 'warm'}
              />
            </View>
            <Text style={styles.platform}>{message.platform.toUpperCase()}</Text>
            <Text style={styles.preview}>{message.preview}</Text>
          </FrostCard>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heroKicker: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  heroStat: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  heroCaption: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  metricRow: {
    gap: spacing.md,
  },
  metricCard: {
    gap: spacing.xs,
  },
  metricLabel: {
    color: colors.accentWarm,
    fontSize: 28,
    fontWeight: '800',
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  metricCaption: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  actionList: {
    gap: spacing.md,
  },
  actionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  sender: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  platform: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  preview: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
});

