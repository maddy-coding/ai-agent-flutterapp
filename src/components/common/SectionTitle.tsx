import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme/tokens';

interface SectionTitleProps {
  title: string;
  caption?: string;
}

export function SectionTitle({ title, caption }: SectionTitleProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
