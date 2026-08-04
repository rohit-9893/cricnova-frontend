import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bannerCard: {
    backgroundColor: "#0D9488",
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  verticalIndicator: {
    width: 4,
    height: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginRight: 8,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
  },
  priceUnitText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 15,
    fontWeight: "500",
  },
  orText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  descText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  becomeProBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  becomeProBtnText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "bold",
  },
});
