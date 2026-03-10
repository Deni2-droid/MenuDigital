export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface TicketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
  category?: string;
}


export interface Profile {
  id: string;
  role: string; // "admin" | "user"
  name?: string;
  email?: string;
}
