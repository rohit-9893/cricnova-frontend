import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 8,
    borderBottomColor: "#F1F5F9",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  avatarsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -8,
  },
  subtitle: {
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
    lineHeight: 18,
    maxWidth: "85%",
    marginBottom: 14,
  },
  findCricketersBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  findCricketersText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D9488",
  },
});
