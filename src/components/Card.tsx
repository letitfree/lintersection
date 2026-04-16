import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  accentColor?: string;
}

export default function Card({ children, style, accentColor }: Props) {
  return (
    <View style={[styles.card, SHADOWS.card, style]}>
      {accentColor && (
        <View style={[styles.accent, { backgroundColor: accentColor }]} />
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.blanc,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  accent: {
    height: 3,
    width: '100%',
  },
  content: {
    padding: SPACING.md,
  },
});
