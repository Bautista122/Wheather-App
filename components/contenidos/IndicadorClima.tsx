import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  icono: any;
  valor: string;
};

export function IndicadorClima({ icono, valor }: Props) {
  return (
    <View testID="metric-item" style={styles.pildora}>
      <Ionicons testID="metric-icon" name={icono} size={18} color="#FFFFFF" />
      <Text testID="metric-value" style={styles.valorTexto}>
        {valor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pildora: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    gap: 6,
  },
  valorTexto: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
