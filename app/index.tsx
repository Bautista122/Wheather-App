import { View, StyleSheet } from 'react-native';
import { ContenedorClima } from '@/components/contenedores/ContenedorClima';

export default function Index() {
  return (
    <View testID="screen-weather" style={styles.container}>
      <ContenedorClima />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
