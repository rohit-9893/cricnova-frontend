import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CountrySelectBtn = ({ countryName = "India", countryCode = "IN", onPress }) => {
  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-between border border-slate-300 rounded-2xl px-4 py-3.5 mb-4 bg-white"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text className="text-base font-bold text-slate-900">
        <Text className="font-extrabold">{countryCode}</Text> {countryName}
      </Text>
      <Ionicons name="chevron-down" size={16} color="#0F172A" />
    </TouchableOpacity>
  );
};

export default CountrySelectBtn;
