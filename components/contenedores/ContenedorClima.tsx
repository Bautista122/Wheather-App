import React, { useRef, useState } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TarjetaClima } from '../contenidos/TarjetaClima';

const { width } = Dimensions.get('window');

const datosClima = [
  {
    dia: '4/21',
    temperatura: 25,
    minima: 21,
    maxima: 26,
    humedad: 58,
    presion: 1006,
    viento: 0.8,
    icono: 'sunny',
  },
  {
    dia: '4/22',
    temperatura: 21,
    minima: 16,
    maxima: 25,
    humedad: 88,
    presion: 985,
    viento: 2.2,
    icono: 'rainy',
  },
  {
    dia: '4/23',
    temperatura: 16,
    minima: 13,
    maxima: 21,
    humedad: 78,
    presion: 1016,
    viento: 2.3,
    icono: 'cloudy',
  },
];

export function ContenedorClima() {
  const scrollRef = useRef<ScrollView>(null);
  const [pagina, setPagina] = useState(0);

  const navegar = (direccion: number) => {
    const nuevaPagina = Math.max(0, Math.min(datosClima.length - 1, pagina + direccion));
    scrollRef.current?.scrollTo({ x: nuevaPagina * width, animated: true });
    setPagina(nuevaPagina);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}>
        {datosClima.map((item, index) => (
          <TarjetaClima key={index} {...item} />
        ))}
      </ScrollView>

      {/* 3. Botones de Navegación Obligatorios */}
      <View style={styles.capaBotones}>
        <TouchableOpacity
          testID="button-prev-day"
          onPress={() => navegar(-1)}
          style={[styles.boton, pagina === 0 && { opacity: 0 }]}
          disabled={pagina === 0}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          testID="button-next-day"
          onPress={() => navegar(1)}
          style={[styles.boton, pagina === datosClima.length - 1 && { opacity: 0 }]}
          disabled={pagina === datosClima.length - 1}>
          <Ionicons name="chevron-forward" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  capaBotones: {
    position: 'absolute',
    top: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  boton: { backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: 10, borderRadius: 25 },
});
