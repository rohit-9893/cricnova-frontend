import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  circleContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "500",
  },
});
