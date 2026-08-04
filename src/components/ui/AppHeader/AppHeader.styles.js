import { StyleSheet } from "react-native";

export default StyleSheet.create({
  redHeaderWrapper: {
    backgroundColor: "#D32F2F",
    width: "100%",
  },
  headerBar: {
    height: 56,
    backgroundColor: "#D32F2F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backBtn: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    padding: 4,
    marginLeft: 8,
  },
});
