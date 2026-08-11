import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [striker, setStriker] = useState(DEMO_BATTERS[0]);
  const [nonStriker, setNonStriker] = useState(DEMO_BATTERS[1]);
  const [bowler, setBowler] = useState(DEMO_BOWLERS[0]);

  const [activePickerModal, setActivePickerModal] = useState(null); // 'STRIKER' | 'NON_STRIKER' | 'BOWLER'

  const handleSelectPlayer = (player) => {
    if (activePickerModal === "STRIKER") setStriker(player);
    else if (activePickerModal === "NON_STRIKER") setNonStriker(player);
    else if (activePickerModal === "BOWLER") setBowler(player);
    setActivePickerModal(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#143D2B]" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#143D2B" translucent={true} />

      {/* Top Header Bar */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-[#143D2B] border-b border-emerald-800">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-black flex-1 ml-3">
          Start innings
        </Text>

        <TouchableOpacity className="p-1">
          <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-[#F8FAFC] p-4" showsVerticalScrollIndicator={false}>
        {/* Batting Section */}
        <Text className="text-slate-900 font-extrabold text-base mb-3">
          Batting - Team WD-B
        </Text>

        <View className="flex-row justify-between mb-6 space-x-3">
          {/* Striker Picker Card */}
          <TouchableOpacity
            className="flex-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm items-center active:bg-slate-50"
            activeOpacity={0.8}
            onPress={() => setActivePickerModal("STRIKER")}
          >
            <View className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200 justify-center items-center mb-2">
              <MaterialCommunityIcons name="cricket" size={40} color="#0D9488" />
            </View>
            <Text className="text-slate-900 font-black text-sm text-center" numberOfLines={1}>
              {striker ? striker.name : "Select striker"}
            </Text>
            <Text className="text-emerald-600 text-[10px] font-bold mt-0.5">Striker</Text>
          </TouchableOpacity>

          {/* Non-Striker Picker Card */}
          <TouchableOpacity
            className="flex-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm items-center active:bg-slate-50"
            activeOpacity={0.8}
            onPress={() => setActivePickerModal("NON_STRIKER")}
          >
            <View className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 justify-center items-center mb-2">
              <MaterialCommunityIcons name="cricket" size={40} color="#64748B" />
            </View>
            <Text className="text-slate-900 font-black text-sm text-center" numberOfLines={1}>
              {nonStriker ? nonStriker.name : "Select non-striker"}
            </Text>
            <Text className="text-slate-500 text-[10px] font-bold mt-0.5">Non-Striker</Text>
          </TouchableOpacity>
        </View>

        {/* Bowling Section */}
        <Text className="text-slate-900 font-extrabold text-base mb-3">
          Bowling - Team WD-A
        </Text>

        <TouchableOpacity
          className="w-1/2 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm items-center active:bg-slate-50 mb-8"
          activeOpacity={0.8}
          onPress={() => setActivePickerModal("BOWLER")}
        >
          <View className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-200 justify-center items-center mb-2">
            <MaterialCommunityIcons name="baseball" size={40} color="#6366F1" />
          </View>
          <Text className="text-slate-900 font-black text-sm text-center" numberOfLines={1}>
            {bowler ? bowler.name : "Select bowler"}
          </Text>
          <Text className="text-indigo-600 text-[10px] font-bold mt-0.5">Bowler</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Camera Button */}
      <TouchableOpacity
        className="absolute bottom-20 right-6 w-14 h-14 rounded-full bg-[#E11D48] justify-center items-center shadow-2xl"
        activeOpacity={0.85}
      >
        <Ionicons name="camera" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bottom Split Action Bar */}
      <View className="flex-row bg-white border-t border-slate-200">
        <TouchableOpacity
          className="flex-1 py-4 justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text className="text-slate-600 font-extrabold text-sm">Match rules</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 py-4 bg-[#0D9488] justify-center items-center active:bg-teal-700"
          activeOpacity={0.85}
          onPress={() => navigation.navigate("LiveScoring")}
        >
          <Text className="text-white font-black text-sm">Start scoring ➔</Text>
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
              <TouchableOpacity className="bg-[#0D9488] px-3 py-1.5 rounded-lg">
                <Text className="text-white font-bold text-xs">+ Add new</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {(activePickerModal === "BOWLER" ? DEMO_BOWLERS : DEMO_BATTERS).map((player) => (
                <TouchableOpacity
                  key={player.id}
                  className="flex-row items-center p-3.5 mb-2 bg-slate-50 rounded-xl border border-slate-200 active:border-[#0D9488]"
                  onPress={() => handleSelectPlayer(player)}
                >
                  <View className="w-10 h-10 rounded-full bg-[#0D9488]/20 justify-center items-center mr-3">
                    <Ionicons name="person" size={20} color="#0D9488" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-extrabold text-sm">{player.name}</Text>
                    <Text className="text-slate-500 text-xs">{player.role}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default StartInningsScreen;
