import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FrostCard } from '@/components/common/FrostCard';
import { Pill } from '@/components/common/Pill';
import { applyTemplate } from '@/services/agent/templateEngine';
import { generateDraft } from '@/services/llm/bridge';
import { useAgentStore } from '@/store/agentStore';
import { MessageLog, Template } from '@/types/nexus';
import { colors, radius, spacing } from '@/theme/tokens';

interface NexusPromptModalProps {
  message?: MessageLog;
  templates: Template[];
  visible: boolean;
  onClose: () => void;
}

type PromptMode = 'template' | 'custom' | 'ignore' | null;

export function NexusPromptModal({
  message,
  templates,
  visible,
  onClose,
}: NexusPromptModalProps) {
  const [mode, setMode] = useState<PromptMode>(null);
  const [instruction, setInstruction] = useState(
    "Tell them I'm busy until Friday, but I have their request flagged.",
  );
  const [templatePreview, setTemplatePreview] = useState('');
  const { lastGeneratedDraft, setLastGeneratedDraft } = useAgentStore();

  const recommendedTemplate = useMemo(() => {
    if (!message) {
      return undefined;
    }

    return (
      templates.find((template) => template.category === message.triage?.category) ?? templates[0]
    );
  }, [message, templates]);

  const draftMutation = useMutation({
    mutationFn: async () => {
      if (!message) {
        return '';
      }

      const draft = await generateDraft({
        message,
        instruction,
        preferredTone: message.triage?.tone ?? 'formal',
        language: message.triage?.language ?? 'en',
      });
      setLastGeneratedDraft(draft);
      return draft;
    },
  });

  if (!message) {
    return null;
  }

  const onUseTemplate = () => {
    if (!recommendedTemplate) {
      return;
    }

    setMode('template');
    setTemplatePreview(applyTemplate(recommendedTemplate, message));
  };

  const onIgnore = () => {
    setMode('ignore');
    setLastGeneratedDraft(undefined);
  };

  return (
    <Modal animationType="slide" presentationStyle="pageSheet" transparent visible={visible}>
      <View style={styles.backdrop}>
        <FrostCard style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Nexus Prompt</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>Close</Text>
            </Pressable>
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryTop}>
              <Text style={styles.sender}>{message.senderName}</Text>
              <Pill
                label={message.triage?.category ?? 'Pending'}
                tone={message.triage?.category === 'Urgent' ? 'danger' : 'warm'}
              />
            </View>
            <Text style={styles.summaryText}>{message.triage?.summary}</Text>
            <Text style={styles.preview}>{message.preview}</Text>
          </View>

          <View style={styles.actions}>
            <ActionButton label="Use Template" onPress={onUseTemplate} />
            <ActionButton label="Custom AI Draft" onPress={() => setMode('custom')} />
            <ActionButton label="Manual Ignore" onPress={onIgnore} variant="ghost" />
          </View>

          {mode === 'template' && templatePreview ? (
            <View style={styles.previewBox}>
              <Text style={styles.previewLabel}>
                Recommended template: {recommendedTemplate?.name ?? 'Template'}
              </Text>
              <Text style={styles.draftText}>{templatePreview}</Text>
            </View>
          ) : null}

          {mode === 'custom' ? (
            <View style={styles.previewBox}>
              <Text style={styles.previewLabel}>One-line instruction</Text>
              <TextInput
                multiline
                onChangeText={setInstruction}
                placeholder="Tell them I am tied up until Friday."
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={instruction}
              />
              <ActionButton
                label={draftMutation.isPending ? 'Generating...' : 'Generate Draft'}
                onPress={() => draftMutation.mutate()}
              />
              {lastGeneratedDraft ? <Text style={styles.draftText}>{lastGeneratedDraft}</Text> : null}
            </View>
          ) : null}

          {mode === 'ignore' ? (
            <View style={styles.previewBox}>
              <Text style={styles.previewLabel}>Manual ignore selected</Text>
              <Text style={styles.draftText}>
                Nexus will log this thread, keep tracking it, and stop asking for a reply draft.
              </Text>
            </View>
          ) : null}
        </FrostCard>
      </View>
    </Modal>
  );
}

function ActionButton({
  label,
  onPress,
  variant = 'solid',
}: {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'ghost';
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        variant === 'ghost' ? styles.buttonGhost : styles.buttonSolid,
      ]}
    >
      <Text style={variant === 'ghost' ? styles.buttonGhostText : styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4, 10, 18, 0.82)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  sheet: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  close: {
    color: colors.accent,
    fontWeight: '700',
  },
  summary: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md,
  },
  summaryTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  sender: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
  },
  summaryText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  preview: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: spacing.sm,
  },
  button: {
    alignItems: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  buttonSolid: {
    backgroundColor: colors.accent,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
    borderWidth: 1,
  },
  buttonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '800',
  },
  buttonGhostText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  previewBox: {
    backgroundColor: 'rgba(11, 22, 38, 0.8)',
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md,
  },
  previewLabel: {
    color: colors.accentWarm,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  draftText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.textPrimary,
    minHeight: 96,
    padding: spacing.md,
    textAlignVertical: 'top',
  },
});
