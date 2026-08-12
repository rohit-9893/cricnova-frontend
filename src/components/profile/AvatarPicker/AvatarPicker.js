import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AvatarPicker = ({ onPress, profileImageUrl, isLoading = false }) => {
  return (
    <View className="items-center my-5">
      <TouchableOpacity
        className="w-26 h-26 rounded-full bg-slate-800 justify-center items-center relative border-2 border-[#0D9488] shadow-md overflow-hidden"
        style={{ width: 104, height: 104, borderRadius: 52 }}
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

        <View
          className="absolute bottom-0 right-0 rounded-full bg-[#0D9488] justify-center items-center border-2 border-white shadow-sm"
          style={{ width: 32, height: 32, borderRadius: 16 }}
        >
          <Ionicons name="camera" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={isLoading}>
        <Text className="mt-2.5 text-sm text-[#0D9488] font-bold">
          {isLoading ? "Uploading photo..." : "Change photo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;
