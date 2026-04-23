import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Este componente muestra una métrica simple del clima
// Ej: humedad, presión o viento

type Props = {
  icono: any;   // nombre del ícono
  valor: string; // valor a mostrar (ej: "58%")
};

export function IndicadorClima({ icono, valor }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Ionicons name={icono} size={16} />
      <Text style={{ fontSize: 12 }}>{valor}</Text>
    </View>
  );
}