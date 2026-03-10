import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../api/supabaseClient";

export default function RegisterScreen(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Usuario creado. Revisa tu correo para confirmar la cuenta.");
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Image source={require("../../assets/images/user.webp")} style={styles.logo} />

      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")} style={{ marginTop: 15 }}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#E9A975" },
  logo: { width: 150, height: 150, marginBottom: 20 },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
    marginTop: -100,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  link: { color: "#fff", textAlign: "center", textDecorationLine: "underline" },
  button: {
    backgroundColor: "#FF7B00",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
