import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FrostCard } from '@/components/common/FrostCard';
import { Pill } from '@/components/common/Pill';
import { ScreenShell } from '@/components/common/ScreenShell';
import { NexusPromptModal } from '@/features/inbox/components/NexusPromptModal';
import { useTemplates, useTriagedMessages } from '@/hooks/useNexusData';
import { useAgentStore } from '@/store/agentStore';
import { TriageCategory } from '@/types/nexus';
import { colors, radius, spacing } from '@/theme/tokens';

const filters: Array<TriageCategory | 'All'> = [
  'All',
  'Urgent',
  'Follow-Up',
  'Casual',
  'Sales',
  'Spam',
];

export function UnifiedInboxScreen() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const { data: messages } = useTriagedMessages();
  const { data: templates = [] } = useTemplates();
  const { selectedMessage, setSelectedMessage } = useAgentStore();

  const filteredMessages =
    messages?.filter((message) =>
      activeFilter === 'All' ? true : message.triage?.category === activeFilter,
    ) ?? [];

  return (
    <ScreenShell
      eyebrow="Unified Inbox"
      title="Triage first, draft second."
      subtitle="Incoming notifications are scored, tagged, and turned into guided decisions."
    >
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === filter && styles.filterChipTextActive,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.list}>
        {filteredMessages.map((message) => (
          <Pressable key={message.id} onPress={() => setSelectedMessage(message)}>
            <FrostCard>
              <View style={styles.messageHeader}>
                <View style={styles.identity}>
                  <Text style={styles.sender}>{message.senderName}</Text>
                  <Text style={styles.handle}>{message.senderHandle}</Text>
                </View>
                <Pill
                  label={message.triage?.category ?? 'Pending'}
                  tone={
                    message.triage?.category === 'Urgent'
                      ? 'danger'
                      : message.triage?.category === 'Spam'
                        ? 'muted'
                        : 'warm'
                  }
                />
              </View>
              <Text style={styles.platform}>{message.platform.toUpperCase()}</Text>
              <Text style={styles.preview}>{message.preview}</Text>
              <View style={styles.footer}>
                <Text style={styles.summary}>{message.triage?.summary}</Text>
                {message.triage?.shouldPrompt ? (
                  <Text style={styles.promptLabel}>Tap for Nexus Prompt</Text>
                ) : null}
              </View>
            </FrostCard>
          </Pressable>
        ))}
      </View>

      <NexusPromptModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(undefined)}
        templates={templates}
        visible={Boolean(selectedMessage)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  filterChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: 'rgba(64, 217, 197, 0.14)',
    borderColor: 'rgba(64, 217, 197, 0.22)',
  },
  filterChipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: colors.accent,
  },
  list: {
    gap: spacing.md,
  },
  messageHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  identity: {
    flex: 1,
    gap: 4,
  },
  sender: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  handle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  platform: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  preview: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  footer: {
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  summary: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  promptLabel: {
    color: colors.accentWarm,
    fontSize: 12,
    fontWeight: '700',
  },
});
