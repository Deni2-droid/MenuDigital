import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ProductList from "../components/ProductList";
import { TicketContext } from "../context/TicketContext";
import { Product } from "../Domain";
import { getProducts } from "../services/ProductService";

export default function ProductsScreen(): JSX.Element {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(""); // 👈 estado para búsqueda
  const { addItem } = useContext(TicketContext)!;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        if (category) {
          setProducts(allProducts.filter((p) => p.category === category));
        } else {
          setProducts(allProducts);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [category]);

  // Función para normalizar texto (quita acentos y pasa a minúsculas)
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredProducts = products.filter((p) =>
    normalize(p.name).includes(normalize(search))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {category ? `Productos de ${category}` : "Todos los productos"}
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar producto..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredProducts.length > 0 ? (
        <ProductList
          products={filteredProducts}
          onAdd={(p) =>
            addItem({
              id: p.id!,
              name: p.name,
              price: p.price,
              description: p.description,
              image: p.image,
              category: p.category,
            })
          }
        />
      ) : (
        <Text style={styles.noResults}>No se encontraron productos</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#E9A975" 
  },
  title: { 
    fontSize: 32, 
    color: "white",
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: "center" 
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  noResults: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
    fontWeight: "600",
  },
});
