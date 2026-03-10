import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import ProductList from "../components/ProductList";
import { TicketContext } from "../context/TicketContext";

export default function TicketScreen() {
  const { ticket, addItem, removeItem } = useContext(TicketContext)!;
  const total = ticket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket</Text>

      <ProductList
        products={ticket}
        onAdd={addItem}
        onRemove={removeItem}
        isTicket={true}
      />

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Finalizar compra</Text>
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
    paddingBottom: 180 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#fff" 
  },
  totalBox: {
    position: "absolute",
    bottom: 80, // 👈 justo arriba del BottomNav
    right: 20,
    left:20,
    backgroundColor: "#0dbf13",
    paddingVertical: 5,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  totalText: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 10 
  },
  payButton: {
    backgroundColor: "#FF7B00",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
