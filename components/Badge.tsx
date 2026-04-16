import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

interface Props {
  label: string;
  color?: 'rouge' | 'vert' | 'sable';
}

const MAP = {
  rouge: { bg: COLORS.rougePale, text: COLORS.rouge },
  vert:  { bg: COLORS.vertPale,  text: COLORS.vert  },
  sable: { bg: COLORS.sablePale, text: COLORS.brunMid },
};

export default function Badge({ label, color = 'rouge' }: Props) {
  const c = MAP[color];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.text }]}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    marginBottom: 6,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
