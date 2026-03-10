import React, { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";
import AdminScreen from "../src/screens/admin/AdminScreen";
import LoginScreen from "../src/screens/LoginScreen";
import CategoriesScreen from "./(tabs)/categories";

export default function Index() {
  const { session, profile } = useContext(AuthContext)!;

  if (!session) return <LoginScreen />;
  if (profile?.role === "admin") return <AdminScreen />;
  return <CategoriesScreen />;
}
