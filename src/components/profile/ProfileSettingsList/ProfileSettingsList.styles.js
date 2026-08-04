import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
    paddingTop: 8,
    paddingBottom: 24,
  },
  menuItemRow: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  outlineBtn: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    backgroundColor: "#FFFFFF",
  },
  outlineBtnText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteLinkBtn: {
    alignSelf: "center",
    paddingVertical: 6,
    marginBottom: 24,
  },
  deleteLinkText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
  },
  versionText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "500",
  },
});
