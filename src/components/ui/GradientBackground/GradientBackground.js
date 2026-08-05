import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = ({ colors, locations, style, children, className }) => {
  return (
    <View style={[{ backgroundColor: colors[0] || "#0A192F" }, style, { flex: 1 }]} className={className}>
      <LinearGradient
        colors={colors}
        locations={locations}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {children}
    </View>
  );
};

export default GradientBackground;
