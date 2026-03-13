import React from "react";
import { FlatList } from "react-native";
import { Product, TicketItem } from "../Domain";
import ProductItem from "./ProductItem";

export default function ProductList({
  products,
  onAdd,
  onRemove,
  isTicket = false,
}: {
  products: (Product | TicketItem)[];
  onAdd: (p: Product) => void;
  onRemove?: (p: TicketItem) => void;
  isTicket?: boolean;
}) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onAdd={() => onAdd(item as Product)}
          onRemove={onRemove ? () => onRemove(item as TicketItem) : undefined}
          isTicket={isTicket}
        />
      )}
    />
  );
}
