import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    paddingBottom: 8,
  },
  valueText: {
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  dropdownCard: {
    width: "88%",
    maxHeight: height * 0.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  optionRow: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  selectedOptionRow: {
    backgroundColor: "#F0FDFA",
  },
  optionText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "400",
  },
  selectedOptionText: {
    color: "#0D9488",
    fontWeight: "bold",
  },
});
