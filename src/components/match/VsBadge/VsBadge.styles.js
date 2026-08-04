import { StyleSheet } from "react-native";

export default StyleSheet.create({
  vsContainer: {
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  vsDiamond: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: "#94A3B8",
    transform: [{ rotate: "45deg" }],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  vsText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "bold",
    transform: [{ rotate: "-45deg" }],
  },
});
