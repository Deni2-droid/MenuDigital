import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../api/supabaseClient";
import BottomNav from "../components/BottomNav";

interface User {
  email: string;
  user_metadata?: { name?: string };
}

export default function UserInfoScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user as User);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login" as const);
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      alert("Ingresa una nueva contraseña");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      alert(error.message);
    } else {
      alert("Contraseña actualizada. Revisa tu correo para confirmar.");
      setNewPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.title}>Perfil de Usuario</Text>
      </View>

      {user && (
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.info}>{user.user_metadata?.name || "No definido"}</Text>

          <Text style={styles.label}>Correo electrónico</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
      )}

      <View style={styles.inputBox}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

                <TouchableOpacity style={styles.primaryButton} onPress={handleChangePassword}>
          <Text style={styles.primaryButtonText}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutBox}>
        <TouchableOpacity style={styles.secondButton} onPress={handleLogout}>
          <Text style={styles.secondButtonText}>Cerrar sesión</Text>
          
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9A975",
  },
  profileBox: {
    alignItems: "center",
    marginBottom: 30
  },
  icon: {
    fontSize: 60,
    color: "#333",
    marginBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff"
  },
  infoBox: {
    marginBottom: 30
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10
  },
  info: {
    fontSize: 18,
    color: "#fff",
    marginTop: 4
  },
  inputBox: {
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  logoutBox: {
    marginBottom: 100,
    width:350,
    alignSelf:'center',
  },
  primaryButton: {
    backgroundColor: "#FF7B00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width:350,
    alignSelf:'center',
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondButton:{
    backgroundColor: "#e91b0c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width:350,
    alignSelf:'center',
  },
  secondButtonText:{
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },


});
