import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#F1F5F9",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0D9488",
  },
  grid: {
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  gridCol: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 13,
    color: "#94A3B8",
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0D9488",
    borderRadius: 3,
  },
  progressPercentText: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#94A3B8",
  },
  completeProfileBtn: {
    alignSelf: "center",
    paddingVertical: 4,
  },
  completeProfileText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0D9488",
  },
});
