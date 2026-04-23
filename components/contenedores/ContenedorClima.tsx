import { ScrollView } from 'react-native';
import { TarjetaClima } from '../contenidos/TarjetaClima';

// Simulación de datos del clima
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

// Este componente se encarga de recorrer los datos
// y mostrar una tarjeta por cada día
export function ContenedorClima() {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {datosClima.map((item, index) => (
        <TarjetaClima key={index} {...item} />
      ))}
    </ScrollView>
  );
}
