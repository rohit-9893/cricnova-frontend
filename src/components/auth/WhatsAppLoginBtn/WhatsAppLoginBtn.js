import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WhatsAppLoginBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="w-full h-14 flex-row items-center justify-center rounded-2xl mb-4 bg-[#0D9488] border border-teal-400/40 shadow-xl shadow-teal-500/30"
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Ionicons name="chatbubble-ellipses" size={20} color="#FFFFFF" className="mr-2" />
      <Text className="text-white text-base font-black tracking-wider ml-2">
        Continue with WhatsApp ➔
      </Text>
    </TouchableOpacity>
  );
};

export default WhatsAppLoginBtn;
