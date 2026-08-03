import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home Screen</Text>
      <Text style={styles.subtitle}>Welcome to CricApp!</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#15803D",
  },
});
