import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 16,
    height: 56,
    width: "100%",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBtn: {
    marginRight: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    flex: 1,
  },
});
