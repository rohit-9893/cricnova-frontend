import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TeamSearchHeader = ({ searchQuery, onSearchChange, onAddTeamPress }) => {
  return (
    <View className="flex-row items-center px-4 py-3 bg-white border-b border-slate-100">
      <View className="flex-1 flex-row items-center bg-slate-100 h-10 px-3 rounded-lg mr-3">
        <Ionicons name="search-outline" size={18} color="#64748B" />
        <TextInput
          className="flex-1 text-sm text-slate-900 font-medium p-0 ml-2"
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Quick search"
          placeholderTextColor="#94A3B8"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => onSearchChange("")}>
            <Ionicons name="close-circle" size={16} color="#94A3B8" />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        className="flex-row items-center bg-brand-teal px-3.5 h-10 rounded-lg"
        activeOpacity={0.8}
        onPress={onAddTeamPress}
      >
        <Ionicons name="add" size={18} color="#FFFFFF" />
        <Text className="text-white text-sm font-bold ml-1">Add team</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamSearchHeader;
