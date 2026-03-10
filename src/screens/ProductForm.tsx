import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { createProduct } from "../services/ProductService";
import { Product } from "../types";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    const product: Product = {
      name, price: parseFloat(price), category: "general",
      id: 0,
      description: "",
      image: ""
    };
    await createProduct(product);
    router.replace("/products");
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Precio" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8, borderRadius: 5 },
});
