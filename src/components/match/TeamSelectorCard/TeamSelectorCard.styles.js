import { StyleSheet } from "react-native";

export default StyleSheet.create({
  teamBlock: {
    alignItems: "center",
  },
  circleContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  pulsingAuraRing: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(13, 148, 136, 0.4)",
  },
  teamCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  teamCircleActive: {
    borderWidth: 2,
    borderColor: "#0D9488",
  },
  teamCircleTouch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitialsText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  selectTeamBtn: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  selectTeamBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
