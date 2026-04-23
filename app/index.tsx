import { View, StyleSheet } from 'react-native';
import { ContenedorClima } from '@/components/contenedores/ContenedorClima';

export default function Index() {
  return (
    <View testID="screen-weather" style={styles.contenedorPrincipal}>
      <ContenedorClima />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
  },
});
