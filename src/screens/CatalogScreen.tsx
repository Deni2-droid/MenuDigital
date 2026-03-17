import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductList from "../components/ProductList";
import { TicketContext } from "../context/TicketContext";
import { Product } from "../Domain";

// Simulación de servicio
const getProducts = async (): Promise<Product[]> => {
  return [
    {
      id: 1,
      name: "Hamburguesa",
      description: "Carne y queso",
      price: 80,
      image: "https://via.placeholder.com/200",
      category: "comidas",
    },
    {
      id: 2,
      name: "Refresco",
      description: "Coca-Cola 600ml",
      price: 25,
      image: "https://via.placeholder.com/200",
      category: "bebidas",
    },
    {
      id: 3,
      name: "Papas fritas",
      description: "Porción mediana",
      price: 40,
      image: "https://via.placeholder.com/200",
      category: "comidas",
    },
  ];
};

export default function CatalogScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const ticketContext = useContext(TicketContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!ticketContext) {
    return (
      <View style={styles.container}>
        <Text>Error: TicketContext no disponible</Text>
      </View>
    );
  }

  const { addItem } = ticketContext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo</Text>
      <ProductList
        products={products}
        onAdd={addItem}
        isTicket={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});