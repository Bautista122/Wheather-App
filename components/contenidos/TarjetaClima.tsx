import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IndicadorClima } from './IndicadorClima';

const { width } = Dimensions.get('window');

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
    <View style={styles.contenedorFlotante}>
      {/* 3. Navegación actual */}
      <Text testID="navigation-current-day" style={styles.textoDia}>
        {dia}
      </Text>

      {/* 2. Encabezado Ciudad */}
      <Text testID="header-city" style={styles.textoCiudad}>
        TOKIO
      </Text>

      {/* 4. Ícono climático */}
      <View
        testID={`icon-weather-${icono}`}
        accessibilityRole="image"
        style={styles.contenedorIcono}>
        <Ionicons name={icono} size={160} color="#FFFFFF" />
      </View>

      {/* 5. Métricas secundarias (Aquí se pasan los datos al componente hijo) */}
      <View style={styles.filaMetricas}>
        <IndicadorClima icono="water" valor={`${humedad}%`} />
        <IndicadorClima icono="speedometer" valor={`${presion} hPa`} />
        <IndicadorClima icono="flag" valor={`${viento} m/s`} />
      </View>

      {/* 6. Temperatura Principal */}
      <Text testID="temp-current" style={styles.temperaturaGrande}>
        {temperatura}°
      </Text>

      {/* 7. Temperaturas mín y máx */}
      <View style={styles.contenedorMinMax}>
        <Text testID="temp-min" style={styles.textoMin}>
          {minima}°
        </Text>
        <Text testID="temp-max" style={styles.textoMax}>
          {maxima}°
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorFlotante: { width, alignItems: 'center', justifyContent: 'center', padding: 20 },
  textoDia: { fontSize: 16, color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' },
  textoCiudad: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: 6,
    marginVertical: 10,
  },
  contenedorIcono: { marginVertical: 35 },
  filaMetricas: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  temperaturaGrande: { fontSize: 120, fontWeight: '100', color: '#F8FAFC' },
  contenedorMinMax: { flexDirection: 'row', gap: 35 },
  textoMin: { fontSize: 20, color: '#94A3B8' },
  textoMax: { fontSize: 20, color: '#F8FAFC', fontWeight: 'bold' },
});
