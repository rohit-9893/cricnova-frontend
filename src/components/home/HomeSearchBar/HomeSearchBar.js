import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeSearchBar = ({ value, onChangeText, placeholder = "Search matches, players..." }) => {
  return (
    <View className="mx-5 mb-5">
      <View
        className="flex-row items-center border rounded-2xl px-4 py-3 bg-emerald-50/40"
        style={{ borderColor: "#BCE3C9", borderWidth: 1.5 }}
      >
        <Ionicons name="search" size={20} color="#7C3AED" className="mr-2" />
        <TextInput
          className="flex-1 text-base text-slate-800 font-medium p-0 ml-2"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#64748B"
        />
        {value ? (
          <TouchableOpacity onPress={() => onChangeText && onChangeText("")}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default HomeSearchBar;
