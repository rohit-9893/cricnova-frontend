import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing } from "../../../theme";

export default StyleSheet.create({
  button: {
    height: 52,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  disabled: {
    backgroundColor: Colors.disabled,
  },
});
