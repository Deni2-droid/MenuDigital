import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { TicketProvider } from "./context/TicketContext";
import CatalogScreen from "./screens/CatalogScreen";
import TicketScreen from "./screens/TicketScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TicketProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <Tab.Screen name="Catálogo" component={CatalogScreen} />
          <Tab.Screen name="Ticket" component={TicketScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TicketProvider>
  );
}
