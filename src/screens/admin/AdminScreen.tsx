import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>
      <Text>Desde aquí el administrador puede gestionar productos, categorías y usuarios.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
