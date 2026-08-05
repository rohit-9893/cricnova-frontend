import React from "react";
import { View, StyleSheet } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import "./src/app/global.css";

export default function App() {
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
  },
});
