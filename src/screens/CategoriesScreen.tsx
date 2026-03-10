// src/screens/CategoriesScreen.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";

export default function CategoriesScreen(): JSX.Element {
  const router = useRouter();

  const goToCategory = (category: string) => {
    router.push({ pathname: "/products", params: { category } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Principal</Text>

      <TouchableOpacity style={styles.button} onPress={() => goToCategory("comidas")}>
        <Text style={styles.buttonText}>🍽️ Comidas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => goToCategory("bebidas")}>
        <Text style={styles.buttonText}>🥤 Bebidas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => goToCategory("otros")}>
        <Text style={styles.buttonText}>📦 Otros</Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E9A975" },
  title: { fontSize: 45, fontWeight: "bold", marginBottom: 30, color: "#fff", marginTop: -150 },
  button: {
    backgroundColor: "#FF7B00",
    paddingVertical: 30,
    borderRadius: 20,
    marginBottom: 20,
    width: "70%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
