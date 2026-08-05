import React from "react";
import { View, Text } from "react-native";

const VsBadge = () => {
  return (
    <View className="my-4 items-center justify-center">
      <View className="w-9 h-9 bg-brand-red rotate-45 justify-center items-center rounded-sm shadow-md">
        <Text className="text-white text-xs font-black -rotate-45">VS</Text>
      </View>
    </View>
  );
};

export default VsBadge;
