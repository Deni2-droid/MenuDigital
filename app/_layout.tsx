import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";
import { TicketProvider } from "../src/context/TicketContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Stack />
      </TicketProvider>
    </AuthProvider>
  );
}
