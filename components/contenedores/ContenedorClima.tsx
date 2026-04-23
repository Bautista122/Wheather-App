// components/contenedores/ContenedorClima.tsx
import React, { useRef, useState } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false} // Forzamos navegación por botones
        showsHorizontalScrollIndicator={false}>
        {datosClima.map((item, index) => (
          <TarjetaClima key={index} {...item} />
        ))}
      </ScrollView>

      {/* 3. Navegación superior (Fecha y flechas) */}
      <View style={styles.capaNavegacion}>
        {/* Flecha izquierda */}
        <TouchableOpacity
          testID="button-prev-day"
          onPress={() => navegar(-1)}
          disabled={pagina === 0}
          style={styles.botonNav}>
          <Text style={[styles.flecha, pagina === 0 && { color: '#EEE' }]}>‹</Text>
        </TouchableOpacity>

        {/* Fecha central */}
        <Text testID="navigation-current-day" style={styles.textoFecha}>
          {datosClima[pagina].dia}
        </Text>

        {/* Flecha derecha */}
        <TouchableOpacity
          testID="button-next-day"
          onPress={() => navegar(1)}
          disabled={pagina === datosClima.length - 1}
          style={styles.botonNav}>
          <Text style={[styles.flecha, pagina === datosClima.length - 1 && { color: '#EEE' }]}>
            ›
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  capaNavegacion: {
    position: 'absolute',
    top: 45, // Fecha más arriba como pediste
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  botonNav: {
    paddingHorizontal: 15,
  },
  flecha: {
    fontSize: 26,
    color: '#CCC', // Color suave para flechas
    fontWeight: '300',
  },
  textoFecha: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
  },
});
