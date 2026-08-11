import React, { useState } from "react";
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

const FullScorecardScreen = ({ navigation }) => {
  const [selectedInning, setSelectedInning] = useState(1);

  const teamA = useMatchStore((s) => s.teamA);
  const teamB = useMatchStore((s) => s.teamB);
  const totalRuns = useMatchStore((s) => s.totalRuns);
  const wickets = useMatchStore((s) => s.wickets);
  const oversCompleted = useMatchStore((s) => s.oversCompleted);
  const legalBalls = useMatchStore((s) => s.legalBallsInCurrentOver);
  const totalOvers = useMatchStore((s) => s.totalOvers);
  const currentInning = useMatchStore((s) => s.currentInning);
  const targetRuns = useMatchStore((s) => s.targetRuns);
  const battingTeam = useMatchStore((s) => s.battingTeam);
  const bowlingTeam = useMatchStore((s) => s.bowlingTeam);

  // Mock scorecard data for 1st & 2nd innings
  const inning1Batting = [
    { name: `${teamA.teamName} Batter 1`, status: "c & b Bowler 1", runs: 45, balls: 28, fours: 6, sixes: 2, sr: "160.71" },
    { name: `${teamA.teamName} Batter 2`, status: "b Bowler 2", runs: 28, balls: 19, fours: 3, sixes: 1, sr: "147.37" },
    { name: `${teamA.teamName} Batter 3`, status: "not out", runs: 62, balls: 34, fours: 7, sixes: 3, sr: "182.35" },
    { name: `${teamA.teamName} Batter 4`, status: "run out (Fielder)", runs: 14, balls: 9, fours: 2, sixes: 0, sr: "155.56" },
    { name: `${teamA.teamName} Batter 5`, status: "not out", runs: 21, balls: 11, fours: 2, sixes: 1, sr: "190.91" },
  ];

  const inning1Bowling = [
    { name: `${teamB.teamName} Bowler 1`, overs: "4.0", maidens: 0, runs: 32, wickets: 2, econ: "8.00" },
    { name: `${teamB.teamName} Bowler 2`, overs: "4.0", maidens: 0, runs: 41, wickets: 1, econ: "10.25" },
    { name: `${teamB.teamName} Bowler 3`, overs: "3.0", maidens: 0, runs: 29, wickets: 0, econ: "9.67" },
    { name: `${teamB.teamName} Bowler 4`, overs: "4.0", maidens: 0, runs: 38, wickets: 0, econ: "9.50" },
  ];

  const inning2Batting = [
    { name: `${teamB.teamName} Batter 1`, status: "c Fielder b Bowler 1", runs: 32, balls: 20, fours: 4, sixes: 1, sr: "160.00" },
    { name: `${teamB.teamName} Batter 2`, status: "lbw b Bowler 2", runs: 18, balls: 14, fours: 2, sixes: 0, sr: "128.57" },
    { name: `${teamB.teamName} Batter 3`, status: "not out", runs: 58, balls: 31, fours: 6, sixes: 3, sr: "187.10" },
    { name: `${teamB.teamName} Batter 4`, status: "not out", runs: 44, balls: 22, fours: 5, sixes: 2, sr: "200.00" },
  ];

  const inning2Bowling = [
    { name: `${teamA.teamName} Bowler 1`, overs: "4.0", maidens: 0, runs: 36, wickets: 1, econ: "9.00" },
    { name: `${teamA.teamName} Bowler 2`, overs: "3.3", maidens: 0, runs: 42, wickets: 1, econ: "12.00" },
    { name: `${teamA.teamName} Bowler 3`, overs: "4.0", maidens: 0, runs: 35, wickets: 0, econ: "8.75" },
  ];

  const currentBatting = selectedInning === 1 ? inning1Batting : inning2Batting;
  const currentBowling = selectedInning === 1 ? inning1Bowling : inning2Bowling;
  const activeTeamName = selectedInning === 1 ? teamA.teamName : teamB.teamName;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <AppHeader
        title="Full Match Scorecard"
        onBackPress={() => navigation.goBack()}
      />

      {/* Innings Switcher Tab Bar */}
      <View className="flex-row bg-slate-200 p-1 mx-4 my-3 rounded-xl">
        <TouchableOpacity
          className={`flex-1 py-2.5 rounded-lg justify-center items-center ${
            selectedInning === 1 ? "bg-[#143D2B] shadow-sm" : ""
          }`}
          onPress={() => setSelectedInning(1)}
        >
          <Text
            className={`font-bold text-xs ${
              selectedInning === 1 ? "text-white" : "text-slate-700"
            }`}
          >
            1ST INNING ({teamA.teamName})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-2.5 rounded-lg justify-center items-center ${
            selectedInning === 2 ? "bg-[#143D2B] shadow-sm" : ""
          }`}
          onPress={() => setSelectedInning(2)}
        >
          <Text
            className={`font-bold text-xs ${
              selectedInning === 2 ? "text-white" : "text-slate-700"
            }`}
          >
            2ND INNING ({teamB.teamName})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Innings Summary Header Card */}
        <View className="bg-[#143D2B] p-4 rounded-2xl mb-4 flex-row justify-between items-center shadow-md">
          <View>
            <Text className="text-emerald-400 font-extrabold text-xs tracking-wider">
              {activeTeamName.toUpperCase()} BATTING
            </Text>
            <Text className="text-white text-2xl font-black mt-0.5">
              {selectedInning === 1 ? "180/3" : `${totalRuns}/${wickets}`}
              <Text className="text-slate-300 text-sm font-semibold">
                {" "}
                ({selectedInning === 1 ? `${totalOvers}.0` : `${oversCompleted}.${legalBalls}`} ov)
              </Text>
            </Text>
          </View>

          <View className="bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-400/40">
            <Text className="text-emerald-300 font-bold text-xs">
              CRR: {selectedInning === 1 ? "9.00" : ((totalRuns / Math.max(1, oversCompleted * 6 + legalBalls)) * 6).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Batting Scorecard Table Header */}
        <View className="bg-white rounded-2xl p-4 border border-slate-200 mb-4 shadow-xs">
          <View className="flex-row items-center mb-3 pb-2 border-b border-slate-100">
            <MaterialCommunityIcons name="cricket" size={18} color="#0D9488" />
            <Text className="text-slate-900 font-black text-sm ml-2">
              BATTING SCORECARD
            </Text>
          </View>

          {/* Table Column Labels */}
          <View className="flex-row justify-between pb-2 border-b border-slate-200">
            <Text className="text-slate-500 text-[11px] font-bold flex-2">BATTER</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-9 text-right">R</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-9 text-right">B</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-8 text-right">4s</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-8 text-right">6s</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-12 text-right">SR</Text>
          </View>

          {/* Batting Rows */}
          {currentBatting.map((item, idx) => (
            <View key={idx} className="flex-row justify-between items-center py-2.5 border-b border-slate-100">
              <View className="flex-2 pr-2">
                <Text className="text-slate-900 text-xs font-extrabold" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-slate-500 text-[10px] italic" numberOfLines={1}>
                  {item.status}
                </Text>
              </View>
              <Text className="text-slate-900 text-xs font-black w-9 text-right">{item.runs}</Text>
              <Text className="text-slate-600 text-xs font-bold w-9 text-right">{item.balls}</Text>
              <Text className="text-slate-600 text-xs font-medium w-8 text-right">{item.fours}</Text>
              <Text className="text-slate-600 text-xs font-medium w-8 text-right">{item.sixes}</Text>
              <Text className="text-teal-700 text-xs font-bold w-12 text-right">{item.sr}</Text>
            </View>
          ))}
        </View>

        {/* Bowling Scorecard Table Header */}
        <View className="bg-white rounded-2xl p-4 border border-slate-200 mb-8 shadow-xs">
          <View className="flex-row items-center mb-3 pb-2 border-b border-slate-100">
            <Ionicons name="baseball-outline" size={18} color="#0D9488" />
            <Text className="text-slate-900 font-black text-sm ml-2">
              BOWLING STATS
            </Text>
          </View>

          {/* Table Column Labels */}
          <View className="flex-row justify-between pb-2 border-b border-slate-200">
            <Text className="text-slate-500 text-[11px] font-bold flex-2">BOWLER</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-9 text-right">O</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-8 text-right">M</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-9 text-right">R</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-8 text-right">W</Text>
            <Text className="text-slate-500 text-[11px] font-bold w-12 text-right">ECON</Text>
          </View>

          {/* Bowling Rows */}
          {currentBowling.map((item, idx) => (
            <View key={idx} className="flex-row justify-between items-center py-2.5 border-b border-slate-100">
              <Text className="text-slate-900 text-xs font-extrabold flex-2" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-slate-600 text-xs font-bold w-9 text-right">{item.overs}</Text>
              <Text className="text-slate-600 text-xs font-medium w-8 text-right">{item.maidens}</Text>
              <Text className="text-slate-600 text-xs font-medium w-9 text-right">{item.runs}</Text>
              <Text className="text-red-600 text-xs font-black w-8 text-right">{item.wickets}</Text>
              <Text className="text-teal-700 text-xs font-bold w-12 text-right">{item.econ}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FullScorecardScreen;
