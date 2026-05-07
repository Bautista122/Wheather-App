import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IndicadorClima } from './IndicadorClima';

const { width: ANCHO_VENTANA, height: ALTO_VENTANA } = Dimensions.get('window');

interface PropiedadesTarjeta {
  dia: string;
  ciudad?: string;
  temperatura: number;
  minima: number;
  maxima: number;
  humedad: number;
  presion: number;
  viento: number;
  icono: string;
}

const SelectorIcono = ({ tipo }: { tipo: string }) => {
  const tamanioBase = ALTO_VENTANA * 0.2;
  switch (tipo) {
    case 'sunny':
      return <Ionicons name="radio-button-off" size={tamanioBase * 1.1} color="black" />;
    case 'rainy':
      return (
        <Ionicons
          name="reorder-four"
          size={tamanioBase}
          color="black"
          style={{ transform: [{ rotate: '-45deg' }] }}
        />
      );
    case 'cloudy':
      return <Ionicons name="cloud-outline" size={tamanioBase} color="black" />;
    default:
      return <Ionicons name="help" size={tamanioBase * 0.9} color="black" />;
  }
};

export function TarjetaClima({
  ciudad,
  temperatura,
  minima,
  maxima,
  humedad,
  presion,
  viento,
  icono,
}: PropiedadesTarjeta) {
  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.etiquetaCiudad}>{ciudad || 'CARGANDO...'}</Text>

      <View style={estilos.contenedorVisual}>
        <SelectorIcono tipo={icono} />
      </View>

      <View style={estilos.contenedorMetricas}>
        <IndicadorClima icono="water-outline" valor={`${humedad}%`} />
        <IndicadorClima icono="speedometer-outline" valor={`${presion} hPa`} />
        <IndicadorClima icono="flag-outline" valor={`${viento} m/s`} />
      </View>

      <Text style={estilos.textoTemperatura}>{temperatura}°</Text>

      <View style={estilos.seccionInferior}>
        <View style={estilos.filaTemperaturas}>
          <Text style={estilos.valorExtremo}>{minima}°</Text>
          <Text style={estilos.etiquetaAhora}>AHORA</Text>
          <Text style={estilos.valorExtremo}>{maxima}°</Text>
        </View>
        <View style={estilos.separadorHorizontal} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    width: ANCHO_VENTANA,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 120,
  },
  etiquetaCiudad: {
    fontSize: 24,
    fontWeight: '900',
    color: 'black',
    letterSpacing: 2,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  contenedorVisual: { height: ALTO_VENTANA * 0.3, justifyContent: 'center', alignItems: 'center' },
  contenedorMetricas: { alignSelf: 'flex-start', marginLeft: 50, gap: 8, marginVertical: 10 },
  textoTemperatura: { fontSize: 100, fontWeight: '900', color: 'black', marginTop: 10 },
  seccionInferior: { width: '80%', alignItems: 'center', marginTop: 15 },
  filaTemperaturas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  valorExtremo: { fontSize: 24, fontWeight: 'bold' },
  etiquetaAhora: { fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  separadorHorizontal: { width: '100%', height: 3, backgroundColor: 'black', marginTop: 15 },
});
