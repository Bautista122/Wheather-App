import { View, StyleSheet } from "react-native";
import { ContenedorClima } from "@/components/contenedores/ContenedorClima";

// Pantalla principal de la app
export default function Index() {
  return (
    <View style={styles.container}>
      <ContenedorClima />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeef2",
    justifyContent: "center",
  },
});