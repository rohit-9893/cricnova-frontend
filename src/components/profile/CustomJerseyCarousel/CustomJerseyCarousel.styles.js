import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

export default StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 8,
    borderBottomColor: "#F1F5F9",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F172A",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  jerseyCard: {
    width: CARD_WIDTH,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
  },
  jerseyGraphicBox: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
    overflow: "hidden",
  },
  jerseyGraphicBoxGold: {
    backgroundColor: "#D97706",
  },
  jerseyGraphicBoxWhite: {
    backgroundColor: "#94A3B8",
  },
  jerseyBackText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  jerseyNumberText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 2,
  },
  getNowRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  getNowText: {
    color: "#0D9488",
    fontSize: 14,
    fontWeight: "bold",
  },
});
