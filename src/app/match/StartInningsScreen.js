import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import useMatchStore from "../../store/useMatchStore";

const DEMO_BATTERS = [
  { id: "1", name: "Anurag Patidar", role: "Batter" },
  { id: "2", name: "Pradhumn Patidar", role: "Batter" },
  { id: "3", name: "Shivam Solanki", role: "All-rounder" },
  { id: "4", name: "Gautam Maurya", role: "Aspirant" },
];

const DEMO_BOWLERS = [
  { id: "101", name: "Rohit Panchal", role: "Bowler" },
  { id: "102", name: "Ayush Shivde", role: "Bowler" },
];

const StartInningsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const battingTeam = useMatchStore((s) => s.battingTeam) || {};
  const bowlingTeam = useMatchStore((s) => s.bowlingTeam) || {};
  const storeStriker = useMatchStore((s) => s.striker);
  const storeNonStriker = useMatchStore((s) => s.nonStriker);
  const storeBowler = useMatchStore((s) => s.currentBowler);
  const setOpeningPlayers = useMatchStore((s) => s.setOpeningPlayers);

  // Dynamic player lists from team store rosters with fallback
  const battingPlayers =
    battingTeam?.playersList?.length > 0
      ? battingTeam.playersList
      : battingTeam?.roster?.length > 0
      ? battingTeam.roster
      : DEMO_BATTERS;

  const bowlingPlayers =
    bowlingTeam?.playersList?.length > 0
      ? bowlingTeam.playersList
      : bowlingTeam?.roster?.length > 0
      ? bowlingTeam.roster
      : DEMO_BOWLERS;

  const [striker, setStriker] = useState(
    battingPlayers[0] || { name: storeStriker || "Striker 1" }
  );
  const [nonStriker, setNonStriker] = useState(
    battingPlayers[1] || { name: storeNonStriker || "Non-Striker" }
  );
  const [bowler, setBowler] = useState(
    bowlingPlayers[0] || { name: storeBowler || "Bowler 1" }
  );

  const [activePickerModal, setActivePickerModal] = useState(null); // 'STRIKER' | 'NON_STRIKER' | 'BOWLER'

  const handleSelectPlayer = (player) => {
    if (activePickerModal === "STRIKER") setStriker(player);
    else if (activePickerModal === "NON_STRIKER") setNonStriker(player);
    else if (activePickerModal === "BOWLER") setBowler(player);
    setActivePickerModal(null);
  };

  const handleStartScoring = () => {
    // Sync selected opening players into match store before navigating
    if (setOpeningPlayers) {
      setOpeningPlayers(
        striker.name || "Striker 1",
        nonStriker.name || "Non-Striker",
        bowler.name || "Bowler 1"
      );
    }
    navigation.navigate("LiveScoring");
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="light-content" backgroundColor="#0D9488" translucent={true} />

      {/* Top Header Bar */}
      <View style={{ paddingTop: insets.top }} className="bg-[#0D9488] w-full">
        <View className="flex-row justify-between items-center px-4 h-14 bg-[#0D9488]">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text className="text-white text-lg font-bold flex-1 ml-3">
            Start Innings
          </Text>

          <TouchableOpacity className="p-1">
            <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Batting Section */}
        <Text className="text-slate-900 font-extrabold text-base mb-3">
          Batting - {battingTeam.teamName || "Team A"}
        </Text>

        <View className="flex-row justify-between mb-6 space-x-3">
          {/* Striker Picker Card */}
          <TouchableOpacity
            className="flex-1 bg-white rounded-2xl p-4 border border-teal-200 shadow-xs items-center active:bg-teal-50/50"
            activeOpacity={0.8}
            onPress={() => setActivePickerModal("STRIKER")}
          >
            <View className="w-20 h-20 rounded-2xl bg-teal-50 border border-teal-200 justify-center items-center mb-2">
              <MaterialCommunityIcons name="cricket" size={40} color="#0D9488" />
            </View>
            <Text className="text-slate-900 font-black text-sm text-center" numberOfLines={1}>
              {striker ? striker.name : "Select striker"}
            </Text>
            <Text className="text-[#0D9488] text-[10px] font-extrabold mt-0.5">Striker</Text>
          </TouchableOpacity>

          {/* Non-Striker Picker Card */}
          <TouchableOpacity
            className="flex-1 bg-white rounded-2xl p-4 border border-teal-200 shadow-xs items-center active:bg-teal-50/50"
            activeOpacity={0.8}
            onPress={() => setActivePickerModal("NON_STRIKER")}
          >
            <View className="w-20 h-20 rounded-2xl bg-teal-50/60 border border-teal-200 justify-center items-center mb-2">
              <MaterialCommunityIcons name="cricket" size={40} color="#0D9488" />
            </View>
            <Text className="text-slate-900 font-black text-sm text-center" numberOfLines={1}>
              {nonStriker ? nonStriker.name : "Select non-striker"}
            </Text>
            <Text className="text-[#0D9488] text-[10px] font-extrabold mt-0.5">Non-Striker</Text>
          </TouchableOpacity>
        </View>

        {/* Bowling Section */}
        <Text className="text-slate-900 font-extrabold text-base mb-3">
          Bowling - {bowlingTeam.teamName || "Team B"}
        </Text>

        <TouchableOpacity
          className="w-1/2 bg-white rounded-2xl p-4 border border-amber-200 shadow-xs items-center active:bg-amber-50/50 mb-8"
          activeOpacity={0.8}
          onPress={() => setActivePickerModal("BOWLER")}
        >
          <View className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 justify-center items-center mb-2">
            <MaterialCommunityIcons name="baseball" size={40} color="#C59B27" />
          </View>
          <Text className="text-slate-900 font-black text-sm text-center" numberOfLines={1}>
            {bowler ? bowler.name : "Select bowler"}
          </Text>
          <Text className="text-[#C59B27] text-[10px] font-extrabold mt-0.5">Bowler</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 flex-row items-center justify-between space-x-3 shadow-lg">
        <TouchableOpacity
          className="flex-1 h-14 bg-white border-2 border-slate-200 rounded-2xl justify-center items-center mr-2 active:bg-slate-50"
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Text className="text-slate-800 font-extrabold text-sm">Match rules</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-14 bg-[#0D9488] rounded-2xl justify-center items-center shadow-lg shadow-teal-500/30 active:bg-teal-700"
          activeOpacity={0.85}
          onPress={handleStartScoring}
        >
          <Text className="text-white font-black text-base">Start scoring ➔</Text>
        </TouchableOpacity>
      </View>

      {/* Player Selector Modal Sheet */}
      <Modal visible={Boolean(activePickerModal)} transparent animationType="slide">
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-end"
          activeOpacity={1}
          onPress={() => setActivePickerModal(null)}
        >
          <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-5 border-t border-slate-200 max-h-[70%]">
            <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-4" />

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-900 font-black text-base">
                Select {activePickerModal === "BOWLER" ? "Bowler" : "Batter"}
              </Text>
              <TouchableOpacity className="bg-[#0D9488] px-3.5 py-1.5 rounded-xl">
                <Text className="text-white font-bold text-xs">+ Add new</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {(activePickerModal === "BOWLER" ? bowlingPlayers : battingPlayers).map((player, idx) => (
                <TouchableOpacity
                  key={player.id || player._id || String(idx)}
                  className="flex-row items-center p-3.5 mb-2 bg-slate-50 rounded-xl border border-slate-200 active:border-[#0D9488]"
                  onPress={() => handleSelectPlayer(player)}
                >
                  <View className="w-10 h-10 rounded-full bg-[#0D9488]/20 justify-center items-center mr-3">
                    <Ionicons name="person" size={20} color="#0D9488" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-extrabold text-sm">{player.name}</Text>
                    <Text className="text-slate-500 text-xs">{player.role || "Player"}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default StartInningsScreen;
