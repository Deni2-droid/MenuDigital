import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "./BottomNav";

interface ScreenLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
}

export default function ScreenLayout({ children, backgroundColor = "#E9A975" }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>{children}</View>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
});
