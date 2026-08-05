import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AuthLogoBadge = () => {
  return (
    <View className="items-center mb-6">
      {/* Light Green Circle Avatar */}
      <View
        className="rounded-full justify-center items-center bg-[#10B981] shadow-md"
        style={{ width: 88, height: 88, borderRadius: 44 }}
      >
        <MaterialCommunityIcons name="cricket" size={48} color="#FFFFFF" />
      </View>

      {/* Brand Title */}
      <Text className="text-2xl font-black text-slate-900 tracking-tight mt-3">
        Cric<Text className="text-[#10B981]">Novas</Text>
      </Text>
    </View>
  );
};

export default AuthLogoBadge;
