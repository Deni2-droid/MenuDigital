import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../../services/ProductService";
import { Product } from "../../types";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [editing, setEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 👈 estado para búsqueda

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  async function handleCreate() {
    try {
      await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        category: form.category,
      });
      resetForm();
      loadProducts();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  async function handleUpdate() {
    try {
      await updateProduct({
        id: form.id,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        category: form.category,
      });
      resetForm();
      setEditing(false);
      loadProducts();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  function startEdit(product: Product) {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: String(product.price),
      image: product.image,
      category: product.category,
    });
    setEditing(true);
  }

  function resetForm() {
    setForm({
      id: "",
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });
  }

  // 👇 Filtramos productos según búsqueda
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editing ? "Editar Producto" : "Crear Producto"}
      </Text>

      <TextInput
        placeholder="Nombre"
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={form.description}
        onChangeText={(t) => setForm({ ...form, description: t })}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        keyboardType="numeric"
        value={form.price}
        onChangeText={(t) => setForm({ ...form, price: t })}
        style={styles.input}
      />
      <TextInput
        placeholder="Imagen URL"
        value={form.image}
        onChangeText={(t) => setForm({ ...form, image: t })}
        style={styles.input}
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={form.category}
          onValueChange={(value) => setForm({ ...form, category: value })}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una categoría..." value="" />
          <Picker.Item label="Comidas" value="Comidas" />
          <Picker.Item label="Bebidas" value="Bebidas" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={editing ? handleUpdate : handleCreate}
      >
        <Text style={styles.buttonText}>
          {editing ? "Actualizar producto" : "Crear producto"}
        </Text>
      </TouchableOpacity>

      {/* 👇 Barra de búsqueda */}
      <TextInput
        placeholder="Buscar productos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>${item.price}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEdit(item)}
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.actionText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FF7B00",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 6,
    padding: 10,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 4,
    color: "#333",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 6,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#FF7B00",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#f1f1f1",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  cardPrice: { fontSize: 14, color: "#555", marginBottom: 8 },
  cardActions: { flexDirection: "row", justifyContent: "space-between" },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#E53935",
    padding: 8,
    borderRadius: 6,
  },
  actionText: { color: "#fff", fontWeight: "600" },
});
