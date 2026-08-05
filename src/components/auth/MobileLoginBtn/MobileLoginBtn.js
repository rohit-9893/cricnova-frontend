import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MobileLoginBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-center border border-slate-300 rounded-2xl py-4 bg-white"
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Ionicons name="phone-portrait-outline" size={20} color="#0F172A" className="mr-2" />
      <Text className="text-slate-900 text-base font-extrabold ml-2">Mobile number</Text>
    </TouchableOpacity>
  );
};

export default MobileLoginBtn;
