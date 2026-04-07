import { StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '@/theme/tokens';

interface PillProps {
  label: string;
  tone?: 'accent' | 'warm' | 'danger' | 'muted';
}

const toneColors = {
  accent: {
    backgroundColor: 'rgba(64, 217, 197, 0.12)',
    color: colors.accent,
  },
  warm: {
    backgroundColor: 'rgba(255, 186, 102, 0.14)',
    color: colors.accentWarm,
  },
  danger: {
    backgroundColor: 'rgba(255, 122, 122, 0.14)',
    color: colors.accentDanger,
  },
  muted: {
    backgroundColor: 'rgba(107, 136, 168, 0.18)',
    color: colors.textSecondary,
  },
};

export function Pill({ label, tone = 'accent' }: PillProps) {
  return (
    <View style={[styles.pill, { backgroundColor: toneColors[tone].backgroundColor }]}>
      <Text style={[styles.text, { color: toneColors[tone].color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});

