import React, { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import { Profile } from "../Domain";

interface AuthContextType {
  session: any;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data as Profile);
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [session]);

  const login = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
