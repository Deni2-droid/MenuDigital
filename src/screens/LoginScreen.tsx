import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// 🔴 Verifica esta ruta si marca error
import { supabase } from "../api/supabaseClient";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("Error login:", error);
        alert(error.message);
      } else {
        router.replace("/");
      }

    } catch (err) {
      console.log("Error inesperado:", err);
      alert("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Ingresa tu correo primero");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://example.com/reset-password",
      });

      if (error) {
        console.log("Error reset:", error);
        alert(error.message);
      } else {
        alert("Revisa tu correo 📩");
      }

    } catch (err) {
      console.log("Error inesperado:", err);
      alert("Ocurrió un error");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Image
        source={require("../../assets/images/LOGO.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bienvenido 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggle}>
            {showPassword ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        style={[
          styles.loginButton,
          (!email || !password) && { opacity: 0.6 }
        ]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.linkSecondary}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#0D0D0D",
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 30,
    letterSpacing: 1,
  },

  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    marginBottom: 10,
  },

  passwordInput: {
    flex: 1,
    padding: 15,
    color: "#FFF",
  },

  toggle: {
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#FF8C42",
  },

  link: {
    color: "#FF8C42",
    textAlign: "right",
    marginBottom: 20,
    fontSize: 13,
  },

  linkSecondary: {
    color: "#888",
    textAlign: "center",
    marginTop: 25,
    fontSize: 13,
  },

  loginButton: {
    backgroundColor: "#FF8C42",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#FF8C42",
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },

  loginButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});