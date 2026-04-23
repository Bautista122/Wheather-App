import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IndicadorClima } from './IndicadorCima';

// Obtenemos el ancho de la pantalla para que cada tarjeta ocupe toda la pantalla
const { width } = Dimensions.get('window');

// Datos que recibe la tarjeta
type Props = {
  dia: string;
  temperatura: number;
  minima: number;
  maxima: number;
  humedad: number;
  presion: number;
  viento: number;
  icono: any;
};

// Este componente representa UNA tarjeta completa del clima
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
      {/* Día */}
      <Text style={styles.dia}>{dia}</Text>

      {/* Ciudad */}
      <Text style={styles.ciudad}>TOKYO</Text>

      {/* Icono del clima */}
      <Ionicons name={icono} size={120} color="black" style={styles.icono} />

      {/* Métricas secundarias */}
      <View style={styles.metricas}>
        <IndicadorClima icono="water" valor={`${humedad}%`} />
        <IndicadorClima icono="speedometer" valor={`${presion} hPa`} />
        <IndicadorClima icono="flag" valor={`${viento} m/s`} />
      </View>

      {/* Temperatura principal */}
      <Text style={styles.temperatura}>{temperatura}°</Text>

      {/* Temperaturas mínima y máxima */}
      <View style={styles.minMax}>
        <Text style={styles.min}>{minima}°</Text>
        <Text style={styles.max}>{maxima}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dia: {
    position: 'absolute',
    top: 50,
    fontSize: 12,
    color: '#888',
  },
  ciudad: {
    marginTop: 80,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  icono: {
    marginVertical: 30,
  },
  metricas: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
  },
  temperatura: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  minMax: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  min: {
    fontSize: 14,
    color: '#666',
  },
  max: {
    fontSize: 14,
    color: '#000',
  },
});
