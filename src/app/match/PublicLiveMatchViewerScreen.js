import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import useMatchScoringEngine from "../../hooks/useMatchScoringEngine";
import BallEventOverlay from "../../components/scoring/BallEventOverlay";

const PublicLiveMatchViewerScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("Live");
  const [selectedVote, setSelectedVote] = useState(null);
  const [activeOverlayEvent, setActiveOverlayEvent] = useState(null);

  const scoringEngine = useMatchScoringEngine();

  // Route Params overrides or fallback to live scoring engine
  const params = route?.params || {};
  const teamAName = params.teamAName || params.teamA || scoringEngine.teamA?.teamName || "ITA";
  const teamBName = params.teamBName || params.teamB || scoringEngine.teamB?.teamName || "UGN";
  const displayTotalRuns = params.totalRuns !== undefined ? params.totalRuns : scoringEngine.totalRuns;
  const displayWickets = params.wickets !== undefined ? params.wickets : scoringEngine.wickets;
  const displayOvers = params.overs || scoringEngine.formattedOvers;
  const displayCrr = params.crr || scoringEngine.currentRunRate;
  const displayToss = params.tossInfo || `${teamAName} won the toss and elected to field`;

  const striker = params.striker || scoringEngine.striker || "Justin Mosca";
  const nonStriker = params.nonStriker || scoringEngine.nonStriker || "Anthony Mosca";
  const bowler = params.bowler || scoringEngine.bowler || "Alpesh Ramjani";
  const timeline = scoringEngine.timeline || ["2", "0", "0", "0", "1", "0"];

  const handleVote = (team) => {
    setSelectedVote(team);
    Alert.alert("Vote Submitted! 🗳️", `You voted for ${team}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#143D2B]" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#143D2B" translucent={true} />

      {/* Top Header Bar */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-[#143D2B] border-b border-emerald-800">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text className="text-white text-base font-extrabold flex-1 ml-3" numberOfLines={1}>
          {teamAName} vs {teamBName}, Live Match
        </Text>

        <View className="flex-row items-center space-x-3">
          <Ionicons name="pin-outline" size={20} color="#A7F3D0" className="mr-2" />
          <Ionicons name="notifications-outline" size={20} color="#A7F3D0" className="mr-2" />
          <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
        </View>
      </View>

      {/* Sub-Header Horizontal Navigation Tabs (CricNovas Teal/Emerald Theme) */}
      <View className="flex-row bg-[#143D2B] border-b border-emerald-800/80 px-2">
        {["Fantasy", "Commentary", "Live", "Scorecard", "Graphs"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              className={`py-3 px-3 relative`}
              onPress={() => {
                setActiveTab(tab);
                if (tab === "Scorecard") navigation.navigate("FullScorecard");
              }}
            >
              <Text
                className={`text-xs font-black ${
                  isActive ? "text-emerald-300 font-black" : "text-slate-300 font-semibold"
                }`}
              >
                {tab}
              </Text>
              {isActive && (
                <View className="absolute bottom-0 left-3 right-3 h-1 bg-[#C59B27] rounded-full" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView className="flex-1 bg-[#F8FAFC]" showsVerticalScrollIndicator={false}>
        {/* Dark Emerald Hero Score Card Section */}
        <View className="bg-[#143D2B] p-4 border-b border-emerald-800 shadow-md">
          <View className="flex-row justify-between items-center mb-3">
            {/* Left: Flag & Score */}
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-emerald-600 justify-center items-center mr-3 border border-white/30 shadow-sm">
                <Text className="text-white font-black text-xs">
                  {teamAName.substring(0, 2).toUpperCase()}
                </Text>
              </View>
              <View>
                <View className="flex-row items-baseline">
                  <Text className="text-white text-3xl font-black mr-2">
                    {displayTotalRuns}-{displayWickets}
                  </Text>
                  <Text className="text-emerald-200 text-xs font-bold">
                    {displayOvers}
                  </Text>
                </View>
                <Text className="text-emerald-300 text-[10px] font-black tracking-wider">
                  {teamAName} P1
                </Text>
              </View>
            </View>

            {/* Right: Unmute Button & Over Label */}
            <View className="items-end">
              <TouchableOpacity className="flex-row items-center bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700 mb-1">
                <Ionicons name="volume-mute-outline" size={13} color="#A7F3D0" />
                <Text className="text-emerald-200 text-[10px] font-bold ml-1">Unmute</Text>
              </TouchableOpacity>
              <Text className="text-white text-xl font-black tracking-wider">Over</Text>
            </View>
          </View>

          {/* Sub-strip: CRR & Toss info */}
          <View className="flex-row justify-between items-center pt-2 border-t border-emerald-800/80">
            <Text className="text-emerald-200 text-xs font-bold">
              CRR: {displayCrr}
            </Text>
            <Text className="text-emerald-200 text-xs font-bold" numberOfLines={1}>
              {displayToss}
            </Text>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Live Video / Streaming Promotion Card (CricNovas Brand Palette) */}
          <View className="bg-[#143D2B] rounded-2xl p-3.5 flex-row justify-between items-center border border-emerald-700 shadow-md">
            <View className="flex-1 mr-2">
              <Text className="text-white text-sm font-black mb-2" numberOfLines={1}>
                {teamAName} vs {teamBName} live by <Text className="text-[#C59B27] italic font-black">CricNovas</Text>
              </Text>
              <TouchableOpacity
                className="bg-[#0D9488] px-4 py-2 rounded-full flex-row items-center self-start shadow-sm"
                activeOpacity={0.8}
                onPress={() => Alert.alert("Live Stream 📹", "Connecting to CricNovas HD live stream...")}
              >
                <Ionicons name="play" size={14} color="#FFFFFF" />
                <Text className="text-white font-black text-xs ml-1.5">Watch Live</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-[#C59B27] px-3 py-2 rounded-xl border border-amber-300 shadow-sm justify-center items-center">
              <Text className="text-slate-950 font-black text-xs">5 min Free</Text>
            </View>
          </View>

          {/* Recent Overs Ball-by-Ball Timeline Strip */}
          <View className="bg-white rounded-2xl p-3 border border-slate-200 flex-row items-center justify-between shadow-xs">
            <Text className="text-slate-500 text-xs font-bold">= 4</Text>

            <View className="flex-row items-center space-x-1.5 flex-1 justify-center px-2">
              <Text className="text-slate-800 text-xs font-black mr-1">Over 5</Text>
              {(timeline.length > 0 ? timeline : ["2", "0", "0", "0", "1", "0"]).map((ball, idx) => (
                <View
                  key={idx}
                  className={`w-6 h-6 rounded-full justify-center items-center border ${
                    ball === "W" || ball === "CAO"
                      ? "bg-red-600 border-red-700 text-white"
                      : "bg-slate-100 border-slate-300"
                  }`}
                >
                  <Text className={`text-[11px] font-extrabold ${ball === "W" || ball === "CAO" ? "text-white" : "text-slate-800"}`}>
                    {ball}
                  </Text>
                </View>
              ))}
              <Text className="text-slate-800 text-xs font-black ml-1">= 3</Text>
            </View>

            <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate("FullScorecard")}>
              <Text className="text-slate-500 text-xs font-bold">Overs</Text>
              <Ionicons name="chevron-forward" size={14} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Realtime Win % Probability Bar Card */}
          <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-900 font-black text-sm">{teamBName} 32%</Text>
              <View className="flex-row items-center">
                <Ionicons name="information-circle-outline" size={14} color="#0D9488" />
                <Text className="text-slate-500 text-[11px] font-semibold ml-1">Realtime Win %</Text>
              </View>
              <Text className="text-slate-900 font-black text-sm">{teamAName} 68%</Text>
            </View>

            {/* CricNovas Gold & Emerald Gradient Slider Bar */}
            <View className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex-row">
              <View className="h-full bg-[#C59B27]" style={{ width: "32%" }} />
              <View className="h-full bg-[#0D9488]" style={{ width: "68%" }} />
            </View>
          </View>

          {/* Live Batters Table Card */}
          <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <View className="flex-row justify-between border-b border-slate-200 pb-2 mb-2">
              <Text className="text-slate-400 text-xs font-bold flex-2">Batter</Text>
              <Text className="text-slate-400 text-xs font-bold w-14 text-right">R (B)</Text>
              <Text className="text-slate-400 text-xs font-bold w-9 text-right">4s</Text>
              <Text className="text-slate-400 text-xs font-bold w-9 text-right">6s</Text>
              <Text className="text-slate-400 text-xs font-bold w-12 text-right">SR</Text>
            </View>

            {/* Batter 1 */}
            <View className="flex-row justify-between items-center py-2 border-b border-slate-100">
              <Text className="text-slate-900 text-xs font-extrabold flex-2" numberOfLines={1}>
                Justin Mosca
              </Text>
              <Text className="text-slate-900 text-xs font-black w-14 text-right">6 (13)</Text>
              <Text className="text-slate-600 text-xs font-medium w-9 text-right">1</Text>
              <Text className="text-slate-600 text-xs font-medium w-9 text-right">0</Text>
              <Text className="text-slate-600 text-xs font-bold w-12 text-right">46.2 ∨</Text>
            </View>

            {/* Batter 2 (Striker) */}
            <View className="flex-row justify-between items-center py-2 border-b border-slate-100">
              <View className="flex-row items-center flex-2">
                <Text className="text-slate-900 text-xs font-black" numberOfLines={1}>
                  {striker || "Anthony Mosca"}
                </Text>
                <MaterialCommunityIcons name="cricket" size={14} color="#0D9488" className="ml-1" />
              </View>
              <Text className="text-slate-900 text-xs font-black w-14 text-right">8 (17)</Text>
              <Text className="text-slate-600 text-xs font-medium w-9 text-right">1</Text>
              <Text className="text-slate-600 text-xs font-medium w-9 text-right">0</Text>
              <Text className="text-slate-600 text-xs font-bold w-12 text-right">47.1 ∨</Text>
            </View>

            <TouchableOpacity className="pt-2">
              <Text className="text-[#0D9488] text-xs font-extrabold">P'ship: 14 (30) ›</Text>
            </TouchableOpacity>
          </View>

          {/* Live Bowlers Table Card */}
          <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <View className="flex-row justify-between border-b border-slate-200 pb-2 mb-2">
              <Text className="text-slate-400 text-xs font-bold flex-2">Bowler</Text>
              <Text className="text-slate-400 text-xs font-bold w-14 text-right">W-R</Text>
              <Text className="text-slate-400 text-xs font-bold w-12 text-right">Overs</Text>
              <Text className="text-slate-400 text-xs font-bold w-12 text-right">Econ</Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-slate-900 text-xs font-extrabold flex-2" numberOfLines={1}>
                {bowler || "Alpesh Ramjani"}
              </Text>
              <Text className="text-slate-900 text-xs font-black w-14 text-right">0-3</Text>
              <Text className="text-slate-600 text-xs font-bold w-12 text-right">2.0</Text>
              <Text className="text-slate-600 text-xs font-bold w-12 text-right">1.50 ∨</Text>
            </View>
          </View>

          {/* "Who Will Win?" Interactive Poll Card */}
          <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-slate-900 font-black text-sm">Who will win?</Text>
              <Text className="text-slate-400 text-[11px] font-semibold">Total Votes: 9,038</Text>
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity
                className={`flex-1 py-3 rounded-xl border justify-center items-center ${
                  selectedVote === teamAName
                    ? "bg-[#0D9488] border-teal-700"
                    : "bg-slate-50 border-slate-300"
                }`}
                activeOpacity={0.8}
                onPress={() => handleVote(teamAName)}
              >
                <Text className={`font-black text-sm ${selectedVote === teamAName ? "text-white" : "text-slate-900"}`}>
                  {teamAName}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-3 rounded-xl border justify-center items-center ${
                  selectedVote === teamBName
                    ? "bg-[#0D9488] border-teal-700"
                    : "bg-slate-50 border-slate-300"
                }`}
                activeOpacity={0.8}
                onPress={() => handleVote(teamBName)}
              >
                <Text className={`font-black text-sm ${selectedVote === teamBName ? "text-white" : "text-slate-900"}`}>
                  {teamBName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Spectator TV Celebration Popups (4s, 6s, Wickets) */}
      <BallEventOverlay
        eventTag={activeOverlayEvent}
        visible={Boolean(activeOverlayEvent)}
        onDismiss={() => setActiveOverlayEvent(null)}
      />
    </SafeAreaView>
  );
};

export default PublicLiveMatchViewerScreen;
