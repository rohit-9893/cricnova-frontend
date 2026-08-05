import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AVATAR_BG_COLORS = ["#0D9488", "#1E293B", "#D97706", "#475569", "#2563EB"];

const ConnectionsCard = ({ onFindCricketersPress }) => {
  return (
    <View className="bg-white p-5 items-center border-b-8 border-slate-100">
      <Text className="text-lg font-bold text-slate-900 self-start mb-4">Connections</Text>

      {/* Overlapping Player Avatars Row */}
      <View className="flex-row items-center justify-center mb-4">
        {AVATAR_BG_COLORS.map((color, index) => (
          <View
            key={index}
            className="w-15 h-15 rounded-full border-2 border-white justify-center items-center -mx-2"
            style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: color }}
          >
            <Ionicons name="person" size={32} color="#CBD5E1" />
          </View>
        ))}
      </View>

      {/* Subtitle */}
      <Text className="text-xs text-slate-600 text-center leading-4 max-w-[85%] mb-3.5">
        Connect with cricketers to challenge, motivate & inspire each other.
      </Text>

      {/* Find Cricketers Link */}
      <TouchableOpacity
        className="py-1 px-2"
        activeOpacity={0.7}
        onPress={onFindCricketersPress}
      >
        <Text className="text-base font-bold text-brand-teal">Find Cricketers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionsCard;
