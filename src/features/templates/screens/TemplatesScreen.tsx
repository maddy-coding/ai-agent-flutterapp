import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { FrostCard } from '@/components/common/FrostCard';
import { Pill } from '@/components/common/Pill';
import { ScreenShell } from '@/components/common/ScreenShell';
import { useTemplates, useTriagedMessages } from '@/hooks/useNexusData';
import { applyTemplate } from '@/services/agent/templateEngine';
import { colors, radius, spacing } from '@/theme/tokens';

const variableTokens = ['{{sender_name}}', '{{original_subject}}', '{{current_time}}'];

export function TemplatesScreen() {
  const { data: templates = [] } = useTemplates();
  const { data: messages = [] } = useTriagedMessages();
  const [draftName, setDraftName] = useState('Professional Delay');
  const [draftBody, setDraftBody] = useState(
    'Hi {{sender_name}}, I saw your note about {{original_subject}}. I am in meetings right now, but I will send a clear update by {{current_time}}.',
  );

  const previewMessage = messages[0];
  const previewTemplate = useMemo(
    () => ({
      id: 'draft-preview',
      name: draftName,
      category: 'Universal' as const,
      tone: 'formal' as const,
      content: draftBody,
      variables: variableTokens,
    }),
    [draftBody, draftName],
  );

  return (
    <ScreenShell
      eyebrow="Template Builder"
      title="Shape reusable replies with live variables."
      subtitle="Templates stay local-first, can mirror tone, and are ready to persist into WatermelonDB."
    >
      <FrostCard>
        <Text style={styles.builderLabel}>Smart Template Builder</Text>
        <TextInput
          onChangeText={setDraftName}
          placeholder="Template name"
          placeholderTextColor={colors.textSecondary}
          style={styles.singleInput}
          value={draftName}
        />
        <TextInput
          multiline
          onChangeText={setDraftBody}
          placeholder="Write your reusable response..."
          placeholderTextColor={colors.textSecondary}
          style={styles.textArea}
          value={draftBody}
        />

        <View style={styles.tokenRow}>
          {variableTokens.map((token) => (
            <Pill key={token} label={token} tone="accent" />
          ))}
        </View>

        <Text style={styles.previewTitle}>Live preview</Text>
        <View style={styles.previewPanel}>
          <Text style={styles.previewText}>
            {previewMessage ? applyTemplate(previewTemplate, previewMessage) : draftBody}
          </Text>
        </View>

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Prepare for local save</Text>
        </Pressable>
      </FrostCard>

      <View style={styles.list}>
        {templates.map((template) => (
          <FrostCard key={template.id}>
            <View style={styles.templateHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateTone}>
                  {template.category} | {template.tone}
                </Text>
              </View>
              <Pill label={`${template.variables.length} vars`} tone="warm" />
            </View>
            <Text style={styles.templateBody}>{template.content}</Text>
          </FrostCard>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  builderLabel: {
    color: colors.accentWarm,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  singleInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  textArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.textPrimary,
    minHeight: 130,
    padding: spacing.md,
    textAlignVertical: 'top',
  },
  tokenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  previewTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: spacing.lg,
  },
  previewPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: radius.md,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  previewText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 21,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingVertical: 14,
  },
  saveButtonText: {
    color: colors.background,
    fontWeight: '800',
  },
  list: {
    gap: spacing.md,
  },
  templateHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  templateName: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  templateTone: {
    color: colors.accentWarm,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  templateBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.md,
  },
});

