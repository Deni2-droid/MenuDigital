import { supabase } from "../api/supabaseClient";
import { Product } from "../Domain";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;

  return data as Product[];
}

export async function createProduct(product: Omit<Product, "id">): Promise<void> {
  const { error } = await supabase.from("products").insert(product);
  if (error) throw error;
}

export async function updateProduct(product: Product): Promise<void> {
  const { error } = await supabase
    .from("products")
    .update({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    .eq("id", product.id);

  if (error) throw error;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
