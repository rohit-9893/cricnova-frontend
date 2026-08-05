import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeTopHeader = ({ title = "CricNovas", onMenuPress, onNotificationPress }) => {
  return (
    <View className="flex-row items-center justify-between px-5 pt-3 pb-4 bg-transparent">
      {/* Left Section: Sidebar Menu Button + CricNovas Brand Title */}
      <View className="flex-row items-center">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white/80 justify-center items-center mr-3 shadow-xs"
          activeOpacity={0.7}
          onPress={onMenuPress}
        >
          <Ionicons name="menu" size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text className="text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </Text>
      </View>

      {/* Right Section: Notification Bell Icon */}
      <TouchableOpacity
        className="w-10 h-10 rounded-full bg-white/80 justify-center items-center shadow-xs"
        activeOpacity={0.7}
        onPress={onNotificationPress}
      >
        <Ionicons name="notifications" size={22} color="#F59E0B" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeTopHeader;
