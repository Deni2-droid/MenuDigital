import { useRouter } from "expo-router";
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

// 🔴 IMPORTANTE: verifica bien esta ruta
// Cambia ../api/ por ../../api/ si te marca error
import { supabase } from "../api/supabaseClient";

export default function LoginScreen() {
  // 📌 Estados para manejar los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👁️ Mostrar / ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  // ⏳ Loader mientras inicia sesión
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔐 FUNCIÓN LOGIN
  const handleLogin = async () => {
    // ✅ Validación básica
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      // 🔑 Login con Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // ❌ Mostrar error real
        console.log("Error login:", error);
        alert(error.message);
      } else {
        // ✅ Redirigir al home
        router.replace("/");
      }

    } catch (err) {
      console.log("Error inesperado:", err);
      alert("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  // 📩 RECUPERAR CONTRASEÑA
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Ingresa tu correo primero");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // ⚠️ En Expo localhost puede fallar
        // Cambia esto por tu dominio real en producción
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

      {/* 🖼️ LOGO */}
      {/* 🔴 Verifica que esta ruta exista */}
      <Image
        source={require("../../assets/images/LOGO.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* 🧾 TÍTULO */}
      <Text style={styles.title}>Bienvenido 👋</Text>

      {/* 📧 INPUT EMAIL */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* 🔑 INPUT PASSWORD */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        {/* 👁️ BOTÓN MOSTRAR CONTRASEÑA */}
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggle}>
            {showPassword ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔗 OLVIDASTE CONTRASEÑA */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* 🚀 BOTÓN LOGIN */}
      <TouchableOpacity
        onPress={handleLogin}
        style={[
          styles.loginButton,
          (!email || !password) && { opacity: 0.6 } // 🔸 deshabilita visualmente
        ]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* 🆕 IR A REGISTRO */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.linkSecondary}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>

    </View>
  );
}

// 🎨 ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#121212",
  },

  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 10,
  },

  passwordInput: {
    flex: 1,
    padding: 15,
    color: "#fff",
  },

  toggle: {
    paddingHorizontal: 15,
    fontSize: 18,
  },

  link: {
    color: "#FF7B00",
    textAlign: "right",
    marginBottom: 20,
  },

  linkSecondary: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },

  loginButton: {
    backgroundColor: "#FF7B00",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#FF7B00",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },

  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});