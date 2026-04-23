// components/contenidos/IndicadorClima.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  icono: keyof typeof Ionicons.glyphMap;
  valor: string;
};

export function IndicadorClima({ icono, valor }: Props) {
  return (
    <View testID="metric-item" style={styles.container}>
      <Ionicons testID="metric-icon" name={icono} size={18} color="black" />
      <Text testID="metric-value" style={styles.texto}>
        {valor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  texto: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
});
