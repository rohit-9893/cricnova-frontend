import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      {/* Ready for CricNovas Header & UI implementation */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
