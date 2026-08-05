import React from "react";
import { View, Text, Dimensions } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const OnboardingSlide = ({ item }) => {
  return (
    <View className="items-center justify-center px-7" style={{ width: width }}>
      {/* Central Graphic Visual Box */}
      <View
        className="rounded-3xl justify-center items-center mb-9 shadow-lg border border-white/10"
        style={{
          width: width * 0.72,
          height: height * 0.32,
          backgroundColor: item.cardBg,
        }}
      >
        {item.iconType === "material" ? (
          <MaterialCommunityIcons name={item.iconName} size={72} color="#FFFFFF" />
        ) : (
          <Ionicons name={item.iconName} size={72} color="#FFFFFF" />
        )}
      </View>

      {/* Feature Tagline Badge */}
      <View className="flex-row items-center bg-teal-500/10 px-3.5 py-1.5 rounded-full mb-3.5 border border-teal-500/30">
        <Text className="text-brand-teal text-xs font-bold tracking-widest">{item.badge}</Text>
      </View>

      {/* Slide Title */}
      <Text className="text-2xl font-black text-slate-900 text-center leading-8 mb-3">
        {item.title}
      </Text>

      {/* Slide Description */}
      <Text className="text-sm text-slate-500 text-center leading-5 px-2">
        {item.description}
      </Text>
    </View>
  );
};

export default OnboardingSlide;
