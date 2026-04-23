// components/contenidos/TarjetaClima.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IndicadorClima } from './IndicadorClima';

const { width, height } = Dimensions.get('window');

type Props = {
  dia: string;
  temperatura: number;
  minima: number;
  maxima: number;
  humedad: number;
  presion: number;
  viento: number;
  icono: string;
};

// Mapa de íconos personalizados para imitar el diseño técnico de image_7.png
const IconoGeometrico = ({ name }: { name: string }) => {
  switch (name) {
    case 'sunny':
      // Un círculo simple y grueso (Ionicon radio-button-off)
      return (
        <Ionicons
          name="radio-button-off"
          size={height * 0.22}
          color="black"
          style={styles.strokePesado}
        />
      );
    case 'rainy':
      // Barras inclinadas (imitando reorder-four con rotación)
      return (
        <Ionicons
          name="reorder-four"
          size={height * 0.2}
          color="black"
          style={{ transform: [{ rotate: '-45deg' }] }}
        />
      );
    case 'cloudy':
      // Formas de nubes abstractas (nubes personalizadas con Ionicon infinite-outline)
      return <Ionicons name="infinite-outline" size={height * 0.2} color="black" />;
    default:
      return <Ionicons name="help" size={height * 0.18} color="black" />;
  }
};

export function TarjetaClima({
  dia,
  temperatura,
  minima,
  maxima,
  humedad,
  presion,
  viento,
  icono,
}: Props) {
  return (
    <View style={styles.tarjeta}>
      {/* 2. Ciudad */}
      <Text testID="header-city" style={styles.ciudad}>
        TOKIO
      </Text>

      {/* 4. Ícono Climático (Glifos técnicos negros) */}
      <View
        testID={`icon-weather-${icono}`}
        accessibilityRole="image"
        style={styles.contenedorIcono}>
        <IconoGeometrico name={icono} />
      </View>

      {/* 5. Métricas (Iconos negros y texto alineado) */}
      <View style={styles.columnaMetricas}>
        <IndicadorClima icono="water-outline" valor={`${humedad}%`} />
        <IndicadorClima icono="speedometer-outline" valor={`${presion} hPa`} />
        <IndicadorClima icono="flag-outline" valor={`${viento} m/s`} />
      </View>

      {/* 6. Temperatura Principal (Enorme y bold) */}
      <Text testID="temp-current" style={styles.temperatura}>
        {temperatura}°
      </Text>

      {/* 7. Línea de tiempo y Rango Mín/Máx */}
      <View style={styles.footer}>
        <View style={styles.tempFila}>
          <Text testID="temp-min" style={styles.tempSecundaria}>
            {minima}°
          </Text>
          <Text style={styles.nowLabel}>NOW</Text>
          <Text testID="temp-max" style={styles.tempSecundaria}>
            {maxima}°
          </Text>
        </View>
        <View style={styles.lineaH} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: width,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: height * 0.08, // Desplazamos la ciudad hacia abajo
  },
  ciudad: {
    fontSize: 40,
    fontWeight: '900',
    color: 'black',
    letterSpacing: 3,
    marginBottom: 10,
  },
  contenedorIcono: {
    height: height * 0.3, // Contenedor grande para el ícono
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokePesado: {
    // Para Ionicon radio-button-off, aumentamos el grosor visual
    fontWeight: 'bold',
  },
  columnaMetricas: {
    alignSelf: 'flex-start',
    marginLeft: 50,
    gap: 8,
    marginVertical: 10,
  },
  temperatura: {
    fontSize: 100,
    fontWeight: '900',
    color: 'black',
    marginTop: 10,
  },
  footer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 15,
  },
  tempFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  tempSecundaria: { fontSize: 24, fontWeight: 'bold' },
  nowLabel: { fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  lineaH: {
    width: '100%',
    height: 3,
    backgroundColor: 'black',
    marginTop: 15,
  },
});
