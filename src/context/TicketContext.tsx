import React, { createContext, ReactNode, useState } from "react";
import { Product, TicketItem } from "../Domain";

interface TicketContextType {
  ticket: TicketItem[];
  addItem: (item: Product) => void;
  removeItem: (item: TicketItem) => void;
  clearTicket: () => void;
}

export const TicketContext = createContext<TicketContextType | null>(null);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [ticket, setTicket] = useState<TicketItem[]>([]);

  const addItem = (item: Product) => {
    setTicket(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (item: TicketItem) => {
    setTicket(prev =>
      prev
        .map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0)
    );
  };

  const clearTicket = () => setTicket([]);

  return (
    <TicketContext.Provider value={{ ticket, addItem, removeItem, clearTicket }}>
      {children}
    </TicketContext.Provider>
  );
};
