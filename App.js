import React from "react";
import { View, StyleSheet } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import ErrorBoundary from "./src/components/ui/ErrorBoundary/ErrorBoundary";
import "./src/app/global.css";

export default function App() {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <RootNavigator />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
