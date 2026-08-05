import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AvatarPicker = ({ onPress }) => {
  return (
    <View className="items-center my-5">
      <TouchableOpacity
        className="w-26 h-26 rounded-full bg-slate-700 justify-center items-center relative border-2 border-slate-300"
        style={{ width: 104, height: 104, borderRadius: 52 }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Ionicons name="person" size={60} color="#CBD5E1" />
        <View className="absolute bottom-0.5 right-0.5 rounded-full bg-red-600 justify-center items-center border-2 border-white" style={{ width: 30, height: 30, borderRadius: 15 }}>
          <Ionicons name="camera" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text className="mt-2 text-sm text-red-600 font-medium">Change photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;
