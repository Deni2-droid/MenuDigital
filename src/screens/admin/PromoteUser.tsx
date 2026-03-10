import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { supabase } from "../../api/supabaseClient";

export default function PromoteUser() {
  const [email, setEmail] = useState("");

  async function handlePromote() {
    try {
      const { error } = await supabase.rpc("promote_user_to_admin", {
        target_email: email,
      });

      if (error) throw error;

      Alert.alert("Éxito", "Usuario promovido a administrador");
      setEmail("");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Correo del usuario"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Promover a Admin" onPress={handlePromote} />
    </View>
  );
}
