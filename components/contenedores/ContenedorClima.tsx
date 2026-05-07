import React, { useRef, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { TarjetaClima } from '../contenidos/TarjetaClima';

const { width: ANCHO_PANTALLA } = Dimensions.get('window');

const DATOS_RESPALDO = [
  {
    dia: 'HOY',
    ciudad: 'CARGANDO...',
    temperatura: 0,
    minima: 0,
    maxima: 0,
    humedad: 0,
    presion: 0,
    viento: 0,
    icono: 'sunny',
  },
  {
    dia: '4/22',
    ciudad: 'CABA',
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
    ciudad: 'CABA',
    temperatura: 18,
    minima: 14,
    maxima: 20,
    humedad: 70,
    presion: 1012,
    viento: 1.5,
    icono: 'cloudy',
  },
];

export function ContenedorClima() {
  const referenciaScroll = useRef<ScrollView>(null);
  const [indicePagina, setIndicePagina] = useState(0);
  const [datosClima, setDatosClima] = useState<any[]>(DATOS_RESPALDO);
  const [estaCargando, setEstaCargando] = useState(true);

  // USAMOS TU CLAVE DE WEATHERAPI (la que pasaste al principio)
  const CLAVE_API = 'e5a96edd3802433e97f194410263004';

  const determinarIcono = (condicion: string) => {
    const clima = condicion.toLowerCase();
    if (clima.includes('cloud') || clima.includes('nublado') || clima.includes('nubes'))
      return 'cloudy';
    if (clima.includes('rain') || clima.includes('lluvia') || clima.includes('llovizna'))
      return 'rainy';
    return 'sunny';
  };

  const obtenerClimaActual = async (lat: number, lon: number) => {
    try {
      // CAMBIAMOS LA URL A WEATHERAPI QUE ES LA QUE COINCIDE CON TU CLAVE
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${CLAVE_API}&q=${lat},${lon}&days=3&lang=es`;

      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (respuesta.ok) {
        const nombreLugar = datos.location.name.toUpperCase();

        const nuevoClimaHoy = {
          dia: 'HOY',
          ciudad: nombreLugar,
          temperatura: Math.round(datos.current.temp_c),
          minima: Math.round(datos.forecast.forecastday[0].day.mintemp_c),
          maxima: Math.round(datos.forecast.forecastday[0].day.maxtemp_c),
          humedad: datos.current.humidity,
          presion: datos.current.pressure_mb,
          viento: datos.current.wind_kph,
          icono: determinarIcono(datos.current.condition.text),
        };

        setDatosClima([
          nuevoClimaHoy,
          { ...DATOS_RESPALDO[1], ciudad: nombreLugar },
          { ...DATOS_RESPALDO[2], ciudad: nombreLugar },
        ]);
      } else {
        console.log('Error de API:', datos.error?.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    } finally {
      setEstaCargando(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          await obtenerClimaActual(-34.6131, -58.3772);
          return;
        }

        let ubicacion = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        await obtenerClimaActual(ubicacion.coords.latitude, ubicacion.coords.longitude);
      } catch (err) {
        await obtenerClimaActual(-34.6131, -58.3772);
      }
    })();
  }, []);

  const manejarNavegacion = (direccion: number) => {
    const siguientePagina = Math.max(0, Math.min(datosClima.length - 1, indicePagina + direccion));
    referenciaScroll.current?.scrollTo({ x: siguientePagina * ANCHO_PANTALLA, animated: true });
    setIndicePagina(siguientePagina);
  };

  if (estaCargando) {
    return (
      <View style={estilos.cargando}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={estilos.contenedorPrincipal}>
      <ScrollView
        ref={referenciaScroll}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}>
        {datosClima.map((item, index) => (
          <TarjetaClima key={index} {...item} />
        ))}
      </ScrollView>

      <View style={estilos.capaNavegacion}>
        <TouchableOpacity
          onPress={() => manejarNavegacion(-1)}
          disabled={indicePagina === 0}
          style={estilos.botonNav}>
          {indicePagina > 0 && (
            <>
              <Text style={estilos.flecha}>‹</Text>
              <Text style={estilos.textoFechaLateral}>{datosClima[indicePagina - 1]?.dia}</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={estilos.bloqueCentral}>
          <Text style={estilos.textoFechaPrincipal}>{datosClima[indicePagina]?.dia || ''}</Text>
        </View>

        <TouchableOpacity
          onPress={() => manejarNavegacion(1)}
          disabled={indicePagina === datosClima.length - 1}
          style={estilos.botonNav}>
          {indicePagina < datosClima.length - 1 && (
            <>
              <Text style={estilos.textoFechaLateral}>{datosClima[indicePagina + 1]?.dia}</Text>
              <Text style={estilos.flecha}>›</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: { flex: 1, backgroundColor: 'white' },
  cargando: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  capaNavegacion: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  botonNav: { flexDirection: 'row', alignItems: 'center', width: 80, height: 40 },
  bloqueCentral: { alignItems: 'center' },
  flecha: { fontSize: 24, color: '#CCC', marginHorizontal: 5 },
  textoFechaLateral: { fontSize: 12, color: '#CCC', fontWeight: '600' },
  textoFechaPrincipal: { fontSize: 16, fontWeight: '900', color: 'black' },
});
