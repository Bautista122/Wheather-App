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
import { TarjetaClima } from '../contenidos/TarjetaClima';

const { width: ANCHO_PANTALLA } = Dimensions.get('window');

const DATOS_RESPALDO = [
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

  const CLAVE_API = 'e5a96edd3802433e97f194410263004';
  const LATITUD = '-34.6131';
  const LONGITUD = '-58.3772';

  const determinarIcono = (climaPrincipal: string) => {
    const clima = climaPrincipal.toLowerCase();
    if (clima.includes('cloud')) return 'cloudy';
    if (clima.includes('rain')) return 'rainy';
    return 'sunny';
  };

  const obtenerClimaActual = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUD}&lon=${LONGITUD}&appid=${CLAVE_API}&units=metric&lang=es`;
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (respuesta.ok) {
        const nuevoClimaHoy = {
          dia: 'HOY',
          temperatura: Math.round(datos.main.temp),
          minima: Math.round(datos.main.temp_min),
          maxima: Math.round(datos.main.temp_max),
          humedad: datos.main.humidity,
          presion: datos.main.pressure,
          viento: datos.wind.speed,
          icono: determinarIcono(datos.weather[0].main),
        };
        setDatosClima([nuevoClimaHoy, DATOS_RESPALDO[1], DATOS_RESPALDO[2]]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEstaCargando(false);
    }
  };

  useEffect(() => {
    obtenerClimaActual();
  }, []);

  const manejarNavegacion = (direccion: number) => {
    const siguientePagina = Math.max(0, Math.min(datosClima.length - 1, indicePagina + direccion));
    referenciaScroll.current?.scrollTo({ x: siguientePagina * ANCHO_PANTALLA, animated: true });
    setIndicePagina(siguientePagina);
  };

  if (estaCargando)
    return <ActivityIndicator size="large" color="black" style={estilos.cargando} />;

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
              <Text style={estilos.textoFechaLateral}>{datosClima[indicePagina - 1].dia}</Text>
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
              <Text style={estilos.textoFechaLateral}>{datosClima[indicePagina + 1].dia}</Text>
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
  cargando: { flex: 1, justifyContent: 'center' },
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
