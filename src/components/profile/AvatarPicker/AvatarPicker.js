import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AvatarPicker = ({ onPress, profileImageUrl, isLoading = false }) => {
  return (
    <View className="items-center my-5">
      {/* Outer Wrapper for Avatar + Camera Badge */}
      <View className="relative" style={{ width: 104, height: 104 }}>
        {/* Circle Avatar Button */}
        <TouchableOpacity
          className="w-full h-full rounded-full bg-slate-800 justify-center items-center border-2 border-[#0D9488] shadow-md overflow-hidden"
          activeOpacity={0.8}
          onPress={onPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#0D9488" />
          ) : profileImageUrl ? (
            <Image
              source={{ uri: profileImageUrl }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="person" size={60} color="#94A3B8" />
          )}
        </TouchableOpacity>

        {/* Camera Badge Button (Positioned outside overflow-hidden to prevent clipping) */}
        <TouchableOpacity
          className="absolute bottom-0 right-0 rounded-full bg-[#0D9488] justify-center items-center border-2 border-white shadow-md"
          style={{ width: 34, height: 34, borderRadius: 17 }}
          activeOpacity={0.85}
          onPress={onPress}
          disabled={isLoading}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Ionicons name="camera" size={17} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={isLoading}>
        <Text className="mt-2.5 text-sm text-[#0D9488] font-bold">
          {isLoading ? "Uploading photo..." : "Change photo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;
