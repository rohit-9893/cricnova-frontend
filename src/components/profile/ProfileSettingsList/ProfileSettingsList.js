import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SETTINGS_ITEMS = [
  { id: "notifications", title: "Edit notification preferences" },
  { id: "language", title: "Change language" },
  { id: "purchases", title: "Purchase history" },
];

const ProfileSettingsList = ({
  appVersion = "Version 1.0.0 (490)",
  onItemPress,
  onLogoutPress,
  onClearDataPress,
  onDeleteAccountPress,
}) => {
  return (
    <View className="bg-slate-50 pt-2 pb-6">
      {/* Settings Navigation Items */}
      {SETTINGS_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="bg-white flex-row items-center justify-between px-4 py-4 border-b border-slate-100"
          activeOpacity={0.7}
          onPress={() => onItemPress && onItemPress(item)}
        >
          <Text className="text-sm font-medium text-slate-800">{item.title}</Text>
          <Ionicons
            name="chevron-forward-circle-outline"
            size={20}
            color="#94A3B8"
          />
        </TouchableOpacity>
      ))}

      {/* Logout & Clear Data Outline Buttons Row */}
      <View className="flex-row items-center justify-center mt-6 mb-4 px-4">
        <TouchableOpacity
          className="flex-1 h-10.5 border border-slate-600 rounded justify-center items-center mx-1.5 bg-white"
          activeOpacity={0.7}
          onPress={onLogoutPress}
        >
          <Text className="text-slate-600 text-sm font-bold">Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-10.5 border border-slate-600 rounded justify-center items-center mx-1.5 bg-white"
          activeOpacity={0.7}
          onPress={onClearDataPress}
        >
          <Text className="text-slate-600 text-sm font-bold">Clear data</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Account Link */}
      <TouchableOpacity
        className="self-center py-1.5 mb-6"
        activeOpacity={0.7}
        onPress={onDeleteAccountPress}
      >
        <Text className="text-slate-500 text-sm font-medium">Delete Account</Text>
      </TouchableOpacity>

      {/* App Version Info Text */}
      <Text className="text-center text-slate-400 text-xs font-medium">{appVersion}</Text>
    </View>
  );
};

export default ProfileSettingsList;
