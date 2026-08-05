import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const HomeFeedCard = ({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity
      className="mx-5 mb-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[110px] justify-center"
      style={{
        borderRadius: 24,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {title ? (
        <Text className="text-lg font-extrabold text-slate-900 mb-1">{title}</Text>
      ) : null}
      {subtitle ? (
        <Text className="text-sm font-medium text-slate-500">{subtitle}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default HomeFeedCard;
