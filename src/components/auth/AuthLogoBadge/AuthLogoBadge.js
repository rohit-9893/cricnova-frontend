import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AuthLogoBadge = () => {
  return (
    <View className="items-center mb-6">
      {/* Golden Yellow Circle Avatar */}
      <View
        className="w-22 h-22 rounded-full justify-center items-center shadow-sm"
        style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: "#C59B27" }}
      >
        <MaterialCommunityIcons name="cricket" size={48} color="#FFFFFF" />
      </View>

      {/* Brand Title */}
      <Text className="text-2xl font-black text-slate-900 tracking-tight mt-3">
        CricNovas
      </Text>
    </View>
  );
};

export default AuthLogoBadge;
