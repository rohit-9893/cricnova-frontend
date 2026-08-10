import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const ScorecardHeader = ({
  teamName = "Team A",
  totalRuns = 0,
  wickets = 0,
  formattedOvers = "0.0",
  currentRunRate = "0.00",
  striker = "Striker",
  nonStriker = "Non-Striker",
  bowler = "Bowler",
  onSwapStriker,
}) => {
  return (
    <View className="bg-[#143D2B] p-4 rounded-2xl shadow-lg mb-4">
      {/* Top Team & Main Score Row */}
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
            {teamName} Batting
          </Text>
          <View className="flex-row items-baseline mt-1">
            <Text className="text-white text-4xl font-black">
              {totalRuns}/{wickets}
            </Text>
            <Text className="text-emerald-200 text-base font-bold ml-3">
              ({formattedOvers} ov)
            </Text>
          </View>
        </View>

        <View className="items-end bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/40">
          <Text className="text-slate-300 text-[11px] font-medium">CRR</Text>
          <Text className="text-emerald-300 text-base font-bold">{currentRunRate}</Text>
        </View>
      </View>

      {/* Players Row (Striker, Non-Striker, Bowler) */}
      <View className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/50 flex-row justify-between items-center">
        {/* Striker & Non-Striker */}
        <View className="flex-1 mr-2">
          <View className="flex-row items-center mb-1">
            <MaterialCommunityIcons name="cricket" size={16} color="#10B981" />
            <Text className="text-white font-bold text-xs ml-1.5" numberOfLines={1}>
              {striker} <Text className="text-emerald-400 font-black">*</Text>
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="cricket" size={16} color="#64748B" />
            <Text className="text-slate-300 font-semibold text-xs ml-1.5" numberOfLines={1}>
              {nonStriker}
            </Text>
          </View>
        </View>

        {/* Swap Striker Button */}
        {onSwapStriker && (
          <TouchableOpacity
            className="p-1.5 bg-emerald-800/60 rounded-full mr-3"
            onPress={onSwapStriker}
          >
            <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {/* Current Bowler */}
        <View className="items-end border-l border-emerald-800/60 pl-3">
          <Text className="text-slate-400 text-[10px] font-medium">BOWLING</Text>
          <Text className="text-emerald-200 font-bold text-xs mt-0.5" numberOfLines={1}>
            {bowler}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ScorecardHeader;
