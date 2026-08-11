import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import useMatchStore from "../../store/useMatchStore";

const MatchSummaryScreen = ({ navigation }) => {
  const teamA = useMatchStore((s) => s.teamA);
  const teamB = useMatchStore((s) => s.teamB);
  const totalRuns = useMatchStore((s) => s.totalRuns);
  const wickets = useMatchStore((s) => s.wickets);
  const oversCompleted = useMatchStore((s) => s.oversCompleted);
  const legalBalls = useMatchStore((s) => s.legalBallsInCurrentOver);
  const totalOvers = useMatchStore((s) => s.totalOvers);
  const matchWinner = useMatchStore((s) => s.matchWinner);

  const winningTeamName = matchWinner?.teamName || teamA?.teamName || "WINNING TEAM";

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <AppHeader
        title="Match Result & Summary"
        onBackPress={() => navigation.replace("Home")}
      />

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {/* Trophy Winner Banner */}
        <View className="bg-[#143D2B] p-6 rounded-3xl items-center border border-emerald-800 shadow-xl mb-5">
          <View className="w-20 h-20 rounded-full bg-[#C59B27] justify-center items-center mb-3 shadow-lg border-2 border-white/40">
            <MaterialCommunityIcons name="crown" size={46} color="#FFFFFF" />
          </View>

          <Text className="text-amber-300 text-xs font-black tracking-widest uppercase mb-1">
            MATCH RESULT
          </Text>
          <Text className="text-white text-2xl font-black text-center tracking-wide mb-1">
            {winningTeamName.toUpperCase()} WON! 🎉
          </Text>
          <Text className="text-emerald-300 text-xs font-bold text-center">
            Won by 6 wickets ({totalOvers - oversCompleted} overs remaining)
          </Text>
        </View>

        {/* Quick Teams Score Summary Card */}
        <View className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-5">
          <Text className="text-slate-500 text-xs font-black tracking-wider uppercase mb-4">
            TEAMS MATCH SCORE
          </Text>

          {/* Team A Score Row */}
          <View className="flex-row justify-between items-center pb-3 border-b border-slate-100 mb-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-indigo-600 justify-center items-center mr-3">
                <Text className="text-white font-bold text-xs">{teamA.avatarInitials || "TA"}</Text>
              </View>
              <Text className="text-slate-900 font-extrabold text-sm">{teamA.teamName}</Text>
            </View>

            <View className="items-end">
              <Text className="text-slate-900 font-black text-base">180/3</Text>
              <Text className="text-slate-500 text-[10px] font-semibold">{totalOvers}.0 ov</Text>
            </View>
          </View>

          {/* Team B Score Row */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-pink-600 justify-center items-center mr-3">
                <Text className="text-white font-bold text-xs">{teamB.avatarInitials || "TB"}</Text>
              </View>
              <Text className="text-slate-900 font-extrabold text-sm">{teamB.teamName}</Text>
            </View>

            <View className="items-end">
              <Text className="text-slate-900 font-black text-base">
                {totalRuns}/{wickets}
              </Text>
              <Text className="text-slate-500 text-[10px] font-semibold">
                {oversCompleted}.{legalBalls} ov
              </Text>
            </View>
          </View>
        </View>

        {/* Man of the Match Card */}
        <View className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex-row items-center mb-6 shadow-xs">
          <View className="w-14 h-14 rounded-full bg-[#0D9488] justify-center items-center mr-4 border-2 border-white">
            <MaterialCommunityIcons name="star-face" size={32} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-[#0D9488] text-[10px] font-black uppercase tracking-wider">
              MAN OF THE MATCH
            </Text>
            <Text className="text-slate-900 font-black text-base">
              {winningTeamName} Batter 3
            </Text>
            <Text className="text-slate-600 text-xs font-semibold">
              62 Runs (34b) • 7x4s, 3x6s
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          className="w-full h-13 bg-[#0D9488] rounded-xl flex-row justify-center items-center shadow-md mb-3"
          activeOpacity={0.85}
          onPress={() => navigation.navigate("FullScorecard")}
        >
          <Ionicons name="stats-chart" size={18} color="#FFFFFF" className="mr-2" />
          <Text className="text-white font-extrabold text-base ml-2">
            View Full Detailed Scorecard 📊
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full h-13 bg-slate-900 rounded-xl flex-row justify-center items-center shadow-md mb-8"
          activeOpacity={0.85}
          onPress={() => navigation.replace("Home")}
        >
          <Ionicons name="home-outline" size={18} color="#FFFFFF" className="mr-2" />
          <Text className="text-white font-extrabold text-base ml-2">
            Back to Home Screen 🏠
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MatchSummaryScreen;
