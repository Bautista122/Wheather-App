import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ContenedorClima } from '@/components/contenedores/ContenedorClima';

export default function Index() {
  return (
    <View testID="pantalla-clima" style={estilos.contenedorPrincipal}>
      <Stack.Screen options={{ headerShown: false }} />

      <ContenedorClima />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: 'white',
  },
});
