import { StyleSheet, Text, View } from 'react-native';

import { FrostCard } from '@/components/common/FrostCard';
import { ResponseHeatCell } from '@/types/nexus';
import { colors, radius, spacing } from '@/theme/tokens';

interface ResponseHeatmapProps {
  data: ResponseHeatCell[];
}

const intensity = (score: number) => `rgba(64, 217, 197, ${0.12 + score * 0.7})`;

export function ResponseHeatmap({ data }: ResponseHeatmapProps) {
  const days = [...new Set(data.map((item) => item.day))];
  const bands = [...new Set(data.map((item) => item.band))];

  return (
    <FrostCard>
      <View style={styles.header}>
        <Text style={styles.title}>Response Heat Map</Text>
        <Text style={styles.caption}>Where manual nudges are consuming the most time.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.bandColumn}>
          <View style={styles.spacer} />
          {bands.map((band) => (
            <Text key={band} style={styles.bandLabel}>
              {band}
            </Text>
          ))}
        </View>

        <View style={styles.matrix}>
          <View style={styles.row}>
            {days.map((day) => (
              <Text key={day} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>
          {bands.map((band) => (
            <View key={band} style={styles.row}>
              {days.map((day) => {
                const cell = data.find((item) => item.day === day && item.band === band);
                return (
                  <View
                    key={`${day}-${band}`}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: intensity(cell?.score ?? 0.1),
                        borderColor: cell?.score === 1 ? colors.accentWarm : colors.border,
                      },
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </FrostCard>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bandColumn: {
    gap: spacing.sm,
    paddingTop: 26,
  },
  spacer: {
    height: 1,
  },
  bandLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    minHeight: 38,
    textAlignVertical: 'center',
  },
  matrix: {
    flex: 1,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  dayLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    aspectRatio: 1,
    borderRadius: radius.sm,
    borderWidth: 1,
    flex: 1,
    minHeight: 38,
  },
});

