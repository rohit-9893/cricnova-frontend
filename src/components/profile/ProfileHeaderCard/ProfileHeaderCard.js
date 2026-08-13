import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileHeaderCard = ({
  name = "",
  location = "",
  sinceDate = "",
  followersCount = 0,
  viewsCount = 0,
  profileImageUrl = null,
  onGoProPress,
  onEditAvatarPress,
  onQrPress,
}) => {
  return (
    <View className="bg-white p-4 border-b-8 border-slate-100">
      {/* Top User Details Row */}
      <View className="flex-row items-start justify-between mb-4">
        {/* Avatar Circle with Plus (+) Badge */}
        <TouchableOpacity
          className="mr-3 relative"
          activeOpacity={0.8}
          onPress={onEditAvatarPress}
        >
          <View className="w-20 h-20 rounded-full bg-slate-800 justify-center items-center overflow-hidden border-2 border-[#0D9488] shadow-sm">
            {profileImageUrl ? (
              <Image source={{ uri: profileImageUrl }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <Ionicons name="person" size={44} color="#CBD5E1" />
            )}
          </View>
          <View className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0D9488] justify-center items-center border-2 border-white shadow-xs">
            <Ionicons name="add" size={14} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* User Info Details */}
        <View className="flex-1 justify-center py-1">
          <Text className="text-lg font-bold text-slate-900 mb-1">{name}</Text>

          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={15} color="#0D9488" />
            <Text className="text-xs text-slate-600 font-medium ml-1">{location || "India"}</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={15} color="#94A3B8" />
            <Text className="text-xs text-slate-500 font-medium ml-1">Since {sinceDate || "2026"}</Text>
          </View>
        </View>

        {/* Go PRO Button */}
        <TouchableOpacity
          className="bg-[#0D9488] px-3.5 py-1.5 rounded-full shadow-xs"
          activeOpacity={0.8}
          onPress={onGoProPress}
        >
          <Text className="text-white text-xs font-bold">Go PRO ›</Text>
        </TouchableOpacity>
      </View>

      {/* Stats / Quick Actions Bar */}
      <View className="flex-row items-center justify-around bg-slate-50 rounded-xl py-3 border border-slate-100">
        {/* QR Code Action */}
        <TouchableOpacity className="items-center flex-1" activeOpacity={0.7} onPress={onQrPress}>
          <View className="mb-1">
            <Ionicons name="qr-code-outline" size={22} color="#0D9488" />
          </View>
          <Text className="text-xs text-slate-600 font-medium">Your QR code</Text>
        </TouchableOpacity>

        <View className="w-px h-7 bg-slate-200" />

        {/* Followers */}
        <View className="items-center flex-1">
          <Text className="text-base font-black text-slate-900">{followersCount}</Text>
          <Text className="text-xs text-slate-600 font-medium">Followers</Text>
        </View>

        <View className="w-px h-7 bg-slate-200" />

        {/* Profile Views */}
        <View className="items-center flex-1">
          <Text className="text-base font-black text-slate-900">{viewsCount}</Text>
          <Text className="text-xs text-slate-600 font-medium">Profile views</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeaderCard;
