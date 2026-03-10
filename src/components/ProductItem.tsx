import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product, TicketItem } from "../types";

export default function ProductItem({
  product,
  onAdd,
  onRemove,
  isTicket = false,
}: {
  product: Product | TicketItem;
  onAdd: () => void;
  onRemove?: () => void;
  isTicket?: boolean;
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {isTicket && "quantity" in product ? (
          <Text style={styles.price}>
            ${product.price} x {product.quantity} = ${product.price * product.quantity}
          </Text>
        ) : (
          <Text style={styles.price}>${product.price}</Text>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          {isTicket && onRemove && (
            <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 10 },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  description: { fontSize: 14, color: "#666", marginVertical: 4 },
  price: { fontSize: 16, fontWeight: "bold", color: "#FF7B00" },
  buttons: { flexDirection: "row", marginTop: 8 },
  addButton: {
    flex: 1,
    backgroundColor: "#FF7B00",
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    marginRight: 5,
  },
  removeButton: {
    flex: 1,
    backgroundColor: "#bf0d0d",
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
