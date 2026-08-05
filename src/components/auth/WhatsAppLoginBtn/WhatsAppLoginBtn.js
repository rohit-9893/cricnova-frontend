import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WhatsAppLoginBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-center rounded-2xl py-4 mb-4 bg-[#10B981] shadow-sm"
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Ionicons name="chatbubble-ellipses" size={20} color="#FFFFFF" className="mr-2" />
      <Text className="text-white text-base font-extrabold ml-2">WhatsApp</Text>
    </TouchableOpacity>
  );
};

export default WhatsAppLoginBtn;
