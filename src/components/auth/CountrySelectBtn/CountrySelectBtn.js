import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CountrySelectBtn = ({ countryName = "India", countryFlag = "🇮🇳", onPress }) => {
  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-between border border-slate-300 rounded-2xl px-4 py-3.5 mb-4 bg-white"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <Text className="text-xl mr-2.5">{countryFlag}</Text>
        <Text className="text-base font-bold text-slate-900">{countryName}</Text>
      </View>
      <Ionicons name="chevron-down" size={16} color="#0F172A" />
    </TouchableOpacity>
  );
};

export default CountrySelectBtn;
