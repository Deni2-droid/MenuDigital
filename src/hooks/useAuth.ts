// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";

export function useAuth() {
  const [userRole, setUserRole] = useState<"user" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      setLoading(true);

      // Obtener el usuario actual
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Consultar el rol en profiles usando user_id
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", user.id) 
          .single();

        if (!error && data) {
          setUserRole(data.role as "user" | "admin");
        }
      }

      setLoading(false);
    }

    fetchRole();
  }, []);

  return { userRole, loading };
}
