import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TeamCard = ({
  teamName,
  avatarColor = "#0D9488",
  avatarInitials = "TM",
  location = "Indore",
  captainName = "Captain",
  onPress,
  onQrPress,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between px-4 py-3.5 bg-white border-b border-slate-100"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1 mr-2">
        <View
          className="w-12 h-12 rounded-full justify-center items-center mr-3"
          style={{ backgroundColor: avatarColor }}
        >
          <Text className="text-white text-base font-bold tracking-wider">{avatarInitials}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold text-slate-900 mb-0.5">{teamName}</Text>

          <View className="flex-row items-center flex-wrap">
            <View className="flex-row items-center mr-3">
              <Ionicons name="location-outline" size={13} color="#64748B" />
              <Text className="text-xs text-slate-500 ml-0.5">{location}</Text>
            </View>

            <View className="flex-row items-center bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              <Ionicons name="person-circle-outline" size={12} color="#0D9488" />
              <Text className="text-xs text-brand-teal font-medium ml-1">{captainName}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity className="p-2" activeOpacity={0.7} onPress={onQrPress}>
        <Ionicons name="qr-code-outline" size={22} color="#64748B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TeamCard;
