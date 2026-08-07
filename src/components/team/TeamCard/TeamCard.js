import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const TeamCard = ({
  teamName,
  avatarColor = "#0D9488",
  avatarInitials = "TM",
  location = "Indore",
  captainName = "Captain",
  isSelected = false,
  onPress,
  onQrPress,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-4 py-3.5 mx-2 my-1 rounded-xl transition-all ${
        isSelected
          ? "bg-emerald-50/40 border-2 border-[#0D9488] shadow-sm"
          : "bg-white border border-slate-200/80"
      }`}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1 mr-2">
        {/* Avatar Circle with Selected Checkmark Overlay */}
        <View className="relative mr-3">
          <View
            className="w-12 h-12 rounded-full justify-center items-center shadow-2xs"
            style={{ backgroundColor: avatarColor }}
          >
            <Text className="text-white text-base font-black tracking-wider">
              {avatarInitials}
            </Text>
          </View>

          {isSelected && (
            <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0D9488] justify-center items-center border-2 border-white shadow-xs">
              <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
            </View>
          )}
        </View>

        {/* Team Details */}
        <View className="flex-1">
          <Text className="text-base font-bold text-slate-900 mb-0.5" numberOfLines={1}>
            {teamName}
          </Text>

          <View className="flex-row items-center flex-wrap space-x-3">
            {/* Location */}
            <View className="flex-row items-center mr-3">
              <Ionicons name="location-outline" size={13} color="#64748B" />
              <Text className="text-xs text-slate-500 font-semibold ml-0.5">
                {location}
              </Text>
            </View>

            {/* Captain Name */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="copyright" size={13} color="#0D9488" />
              <Text className="text-xs text-slate-700 font-semibold ml-1">
                {captainName}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* QR Code Icon Button */}
      <TouchableOpacity
        className="p-2 bg-slate-50 rounded-lg border border-slate-200"
        activeOpacity={0.7}
        onPress={onQrPress}
      >
        <Ionicons name="qr-code-outline" size={20} color="#0D9488" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TeamCard;
