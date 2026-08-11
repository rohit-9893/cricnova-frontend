import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AuthLogoBadge = () => {
  return (
    <View className="items-center mb-6">
      {/* CricNovas Brand Teal Circle Avatar */}
      <View
        className="rounded-full justify-center items-center bg-[#0D9488] shadow-lg shadow-teal-500/30"
        style={{ width: 88, height: 88, borderRadius: 44 }}
      >
        <MaterialCommunityIcons name="cricket" size={48} color="#FFFFFF" />
      </View>

      {/* Brand Title */}
      <Text className="text-2xl font-black text-slate-900 tracking-tight mt-3">
        Cric<Text className="text-[#0D9488]">Novas</Text>
      </Text>
    </View>
  );
};

export default AuthLogoBadge;
