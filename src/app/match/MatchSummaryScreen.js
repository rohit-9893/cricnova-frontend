import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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

  const winningTeamName = matchWinner?.teamName || teamA?.teamName || "First";
  const team1Score = 180;
  const team2Score = totalRuns > 0 ? totalRuns : 154;
  const runsMargin = team1Score - team2Score;

  // Correct Cricket Margin Calculation
  const resultText =
    runsMargin > 0
      ? `Won by ${runsMargin} runs`
      : wickets < 10
      ? `Won by ${10 - wickets} wickets`
      : `Won the match`;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <AppHeader
        title="Match Result & Summary"
        onBackPress={() => navigation.replace("Home")}
      />

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {/* Trophy Winner Banner */}
        <View className="bg-[#0D9488] p-6 rounded-3xl items-center shadow-xl mb-5">
          <View className="w-20 h-20 rounded-full bg-[#C59B27] justify-center items-center mb-3 shadow-lg border-2 border-white/40">
            <MaterialCommunityIcons name="crown" size={46} color="#FFFFFF" />
          </View>

          <Text className="text-amber-300 text-xs font-black tracking-widest uppercase mb-1">
            MATCH RESULT
          </Text>
          <Text className="text-white text-2xl font-black text-center tracking-wide mb-1">
            {winningTeamName.toUpperCase()} WON! 🎉
          </Text>
          <Text className="text-teal-100 text-xs font-bold text-center">
            {resultText}
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
              <View className="w-9 h-9 rounded-full bg-[#0D9488] justify-center items-center mr-3">
                <Text className="text-white font-black text-xs">{teamA.avatarInitials || "FI"}</Text>
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
              <View className="w-9 h-9 rounded-full bg-[#C59B27] justify-center items-center mr-3">
                <Text className="text-white font-black text-xs">{teamB.avatarInitials || "SE"}</Text>
              </View>
              <Text className="text-slate-900 font-extrabold text-sm">{teamB.teamName}</Text>
            </View>

            <View className="items-end">
              <Text className="text-slate-900 font-black text-base">
                {team2Score}/{wickets}
              </Text>
              <Text className="text-slate-500 text-[10px] font-semibold">
                {oversCompleted > 0 ? `${oversCompleted}.${legalBalls}` : "8.2"} ov
              </Text>
            </View>
          </View>
        </View>

        {/* Man of the Match Card */}
        <View className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex-row items-center mb-6 shadow-xs">
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
          className="w-full h-14 bg-[#0D9488] rounded-2xl flex-row justify-center items-center shadow-lg shadow-teal-500/30 mb-3 active:bg-teal-700"
          activeOpacity={0.85}
          onPress={() => navigation.navigate("FullScorecard")}
        >
          <Ionicons name="stats-chart" size={18} color="#FFFFFF" />
          <Text className="text-white font-extrabold text-base ml-2">
            View Full Detailed Scorecard 📊
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full h-14 bg-white border-2 border-slate-200 rounded-2xl flex-row justify-center items-center mb-8 active:bg-slate-50"
          activeOpacity={0.85}
          onPress={() => navigation.replace("Home")}
        >
          <Ionicons name="home-outline" size={18} color="#0F172A" />
          <Text className="text-slate-900 font-extrabold text-base ml-2">
            Back to Home Screen 🏠
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MatchSummaryScreen;
