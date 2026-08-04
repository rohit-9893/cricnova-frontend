import { StyleSheet } from "react-native";

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
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    paddingBottom: 6,
  },
  prefix: {
    fontSize: 15,
    color: "#1E293B",
    marginRight: 6,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
    paddingVertical: 0,
  },
  rightIconContainer: {
    paddingLeft: 8,
  },
});
