import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16,
  },
  circleContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F1F5F9",
    borderWidth: 2,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  shieldIcon: {
    marginBottom: 4,
  },
  addBanner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 28,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
  },
  addBannerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
});
