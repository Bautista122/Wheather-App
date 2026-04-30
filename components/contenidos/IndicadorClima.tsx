import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PropiedadesIndicador {
  icono: keyof typeof Ionicons.glyphMap;
  valor: string;
}

export function IndicadorClima({ icono, valor }: PropiedadesIndicador) {
  return (
    <View testID="item-metrica" style={estilos.contenedorIndicador}>
      <Ionicons testID="icono-metrica" name={icono} size={18} color="black" />
      <Text testID="valor-metrica" style={estilos.textoValor}>
        {valor}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorIndicador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
});
