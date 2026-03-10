import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/useAuth";

// Pantallas normales
import CategoriesScreen from "../screens/CategoriesScreen";
import TicketScreen from "../screens/TicketScreen";
import UserInfoScreen from "../screens/UserInfoScreen";

// Pantallas de admin
import AdminProducts from "../screens/admin/AdminProducts";
import PromoteUser from "../screens/admin/PromoteUser";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { userRole, loading } = useAuth();

  if (loading) {
    return (
      <NavigationContainer>
        {/* Puedes reemplazar esto por un spinner o tu propio componente */}
        <CategoriesScreen />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Tabs comunes para todos */}
        <Tab.Screen name="Inicio" component={CategoriesScreen} />
        <Tab.Screen name="Ticket" component={TicketScreen} />
        <Tab.Screen name="Perfil" component={UserInfoScreen} />

        {/* Tabs extra solo para admin */}
        {userRole === "admin" && (
          <>
            <Tab.Screen name="Gestión Productos" component={AdminProducts} />
            <Tab.Screen name="Promover Usuario" component={PromoteUser} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
