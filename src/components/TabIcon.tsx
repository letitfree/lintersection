                 import React from 'react';
import { Text, View } from 'react-native';

const ICONS: Record<string, string> = {
  Accueil:  '🏠',
  Actions:  '⚡',
  Signaler: '📢',
  Voter:    '🗳️',
  Idées:    '💡',
  Contact:  '✉️',
};

interface Props {
  name: string;
  color: string;
  size: number;
  focused: boolean;
}

export default function TabIcon({ name, focused }: Props) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
        {ICONS[name] ?? '●'}
      </Text>
    </View>
  );
}
