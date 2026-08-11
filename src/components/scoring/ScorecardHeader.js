import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Alert, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STADIUM_BG_URI = "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop";

const ScorecardHeader = ({
  teamName = "Srk",
  totalRuns = 0,
  wickets = 0,
  formattedOvers = "0.0 / 6",
  tossInfo = "King won the toss and elected to field",
  matchId = "26303040",
  striker = "Srk Batter 2",
  strikerRuns = 0,
  strikerBalls = 0,
  nonStriker = "Non-Striker",
  bowler = "King Bowler 1",
  bowlerStats = "0.0-0-0-0",
  onBackPress,
  onSharePress,
  onSettingsPress,
  onSwapStriker,
}) => {
  const insets = useSafeAreaInsets();

  const handleCopyMatchId = () => {
    Alert.alert("Match ID Copied! 📋", `Match ID: ${matchId}`);
  };

  return (
    <View style={{ width: SCREEN_WIDTH }} className="bg-slate-950 overflow-hidden shadow-2xl">
      <ImageBackground
        source={{ uri: STADIUM_BG_URI }}
        resizeMode="cover"
        style={{ width: SCREEN_WIDTH, paddingTop: Math.max(12, insets.top) }}
        className="pb-4 px-4"
      >
        {/* Ultra-Sleek Glassmorphism Dark Blurred Overlay */}
        <View className="absolute inset-0 bg-slate-950/85" />

        <View className="relative z-10 w-full">
          {/* Top Header Bar */}
          <View className="flex-row justify-between items-center py-2 mb-2">
            <TouchableOpacity onPress={onBackPress} className="p-2 -ml-2" activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Text className="text-white text-xl font-black flex-1 ml-2" numberOfLines={1}>
              {teamName}
            </Text>

            <View className="flex-row items-center space-x-3">
              <TouchableOpacity onPress={onSharePress} className="p-2" activeOpacity={0.7}>
                <Ionicons name="share-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onSettingsPress} className="p-2 -mr-2" activeOpacity={0.7}>
                <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Main Score Banner */}
          <View className="items-center py-2">
            <View className="flex-row items-baseline justify-center">
              <Text className="text-white text-5xl font-black tracking-tight drop-shadow-md">
                {totalRuns}/{wickets}
              </Text>
              <Text className="text-slate-300 text-lg font-bold ml-2">
                ({formattedOvers})
              </Text>
            </View>

            {/* Toss Info Subtitle */}
            <Text className="text-slate-300 text-xs font-medium text-center mt-1.5 px-4">
              {tossInfo}
            </Text>

            {/* Match ID Pill */}
            <TouchableOpacity
              className="flex-row items-center bg-slate-900/90 px-3.5 py-1.5 rounded-full mt-3 border border-white/20 shadow-sm"
              activeOpacity={0.8}
              onPress={handleCopyMatchId}
            >
              <Text className="text-slate-200 text-[11px] font-bold">
                Match ID: {matchId}
              </Text>
              <Ionicons name="copy-outline" size={13} color="#E2E8F0" className="ml-1.5" />
            </TouchableOpacity>
          </View>

          {/* Striker, Non-Striker & Bowler Player Strip (Ultra-High Contrast) */}
          <View className="bg-slate-900/95 rounded-2xl border border-slate-800 overflow-hidden mt-3 shadow-lg">
            <View className="flex-row divide-x divide-slate-800 border-b border-slate-800">
              {/* Left Column: Striker */}
              <View className="flex-1 p-3 flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 mr-1">
                  <View className="w-8 h-8 rounded-full bg-emerald-500/20 justify-center items-center mr-2 border border-emerald-400">
                    <MaterialCommunityIcons name="cricket" size={16} color="#10B981" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-emerald-400 font-extrabold text-xs" numberOfLines={1}>
                      {striker}
                    </Text>
                    <TouchableOpacity onPress={onSwapStriker}>
                      <Text className="text-teal-400 text-[10px] font-extrabold underline">
                        Replace
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-white font-black text-xs ml-1">
                  {strikerRuns}({strikerBalls})
                </Text>
              </View>

              {/* Right Column: Non-Striker */}
              <View className="flex-1 p-3 flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 mr-1">
                  <View className="w-8 h-8 rounded-full bg-slate-800 justify-center items-center mr-2 border border-slate-700">
                    <MaterialCommunityIcons name="cricket" size={16} color="#94A3B8" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-300 font-extrabold text-xs" numberOfLines={1}>
                      {nonStriker}
                    </Text>
                    <TouchableOpacity onPress={onSwapStriker}>
                      <Text className="text-teal-400 text-[10px] font-extrabold underline">
                        Replace
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Bottom Row: Bowler */}
            <View className="p-3 flex-row items-center justify-between bg-slate-950/60">
              <View className="flex-row items-center flex-1">
                <View className="w-7 h-7 rounded-full bg-slate-800 justify-center items-center mr-2 border border-slate-600">
                  <MaterialCommunityIcons name="baseball" size={14} color="#FFFFFF" />
                </View>
                <Text className="text-white font-extrabold text-xs flex-1" numberOfLines={1}>
                  {bowler}
                </Text>
              </View>
              <Text className="text-slate-300 text-xs font-black">
                {bowlerStats}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ScorecardHeader;
