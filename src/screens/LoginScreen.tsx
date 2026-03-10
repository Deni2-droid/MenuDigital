import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../api/supabaseClient";

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.replace("/"); // después de login → CategoriesScreen
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Ingresa tu correo para recuperar la contraseña");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:8081/reset-password",
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Revisa tu correo para restablecer la contraseña");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/LOGO.png")} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggle}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword} style={{ marginBottom: 20 }}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")} style={{ marginTop: 15 }}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#E9A975" },
  logo: { width: 400, height: 400, marginBottom: 20, marginTop: -150, borderRadius: 50 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#fff" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  passwordInput: { flex: 1, padding: 10 },
  toggle: { paddingHorizontal: 10, color: "#FF7B00", fontWeight: "bold" },
  link: { color: "#fff", textAlign: "center", textDecorationLine: "underline" },
  loginButton: { backgroundColor: "#FF7B00", padding: 10, borderRadius: 8, width: "100%" },
  loginButtonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
