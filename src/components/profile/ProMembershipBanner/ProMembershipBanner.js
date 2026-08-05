import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProMembershipBanner = ({ onBecomeProPress }) => {
  return (
    <View className="bg-brand-teal p-5 mx-4 my-4 rounded-xl shadow-md">
      {/* Header Row */}
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-white rounded-sm mr-2" />
        <Text className="text-white text-lg font-bold">PRO Membership</Text>
      </View>

      {/* Price Row */}
      <View className="flex-row items-baseline mb-3 flex-wrap">
        <Text className="text-white text-2xl font-black">₹399</Text>
        <Text className="text-white/80 text-sm font-medium ml-1">/year</Text>
        <Text className="text-white/80 text-sm font-bold mx-2.5">OR</Text>
        <Text className="text-white text-2xl font-black">₹3,999</Text>
        <Text className="text-white/80 text-sm font-medium ml-1">/lifetime</Text>
      </View>

      {/* Description */}
      <Text className="text-white/90 text-sm leading-5 mb-5">
        Access unlimited CricInsights and additional benefits with PRO membership.
      </Text>

      {/* Become A PRO Button */}
      <TouchableOpacity
        className="bg-white px-5 py-3 rounded-md self-start shadow-sm"
        activeOpacity={0.85}
        onPress={onBecomeProPress}
      >
        <Text className="text-slate-900 text-sm font-bold">Become A PRO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProMembershipBanner;
