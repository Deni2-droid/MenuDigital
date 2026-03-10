import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth"; // 👈 usamos el hook

export default function BottomNav(): JSX.Element {
  const router = useRouter();
  const { userRole } = useAuth(); // "user" o "admin"

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/categories")}
      >
        <Ionicons name="fast-food-outline" size={28} color="#fff" />
        <Text style={styles.label}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/ticket")}
      >
        <Ionicons name="receipt-outline" size={28} color="#fff" />
        <Text style={styles.label}>Ticket</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/userinfo")}
      >
        <Ionicons name="person-circle-outline" size={28} color="#fff" />
        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>

      {/* 👇 Opciones extra solo para admin */}
      {userRole === "admin" && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/adminProducts")}
          >
            <Ionicons name="construct-outline" size={28} color="#fff" />
            <Text style={styles.label}>Gestión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/promoteUser")}
          >
            <Ionicons name="people-outline" size={28} color="#fff" />
            <Text style={styles.label}>Promover</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FF7B00",
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});
