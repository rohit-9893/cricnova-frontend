import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TeamLogoPicker = ({ onPress }) => {
  return (
    <View className="align-center items-center my-4">
      <TouchableOpacity
        className="w-20 h-20 rounded-full border-2 border-dashed border-teal-500 bg-teal-50/50 justify-center items-center relative"
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Ionicons name="shield-outline" size={32} color="#0D9488" />
        <View className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-teal justify-center items-center border border-white">
          <Ionicons name="camera" size={12} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
      <Text className="mt-2 text-xs text-slate-500 font-medium">Select Team Logo</Text>
    </View>
  );
};

export default TeamLogoPicker;
