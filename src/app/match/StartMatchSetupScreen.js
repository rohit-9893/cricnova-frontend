import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import VsBadge from "../../components/match/VsBadge";

const MATCH_TYPES = [
  "Limited Overs",
  "Box/Turf Cricket",
  "Pair Cricket",
  "Test Match",
  "The Hundred",
];

const BALL_TYPES = [
  { id: "tennis", label: "Tennis", icon: "tennisball-outline", color: "#84CC16" },
  { id: "leather", label: "Leather", icon: "baseball-outline", color: "#EF4444" },
  { id: "other", label: "Other", icon: "ellipse-outline", color: "#F59E0B" },
];

const PITCH_TYPES = ["ROUGH", "CEMENT", "TURF", "ASTROTURF", "MATTING"];

const StartMatchSetupScreen = ({ navigation, route }) => {
  const teamA = route.params?.teamA || {
    teamName: "CSK",
    avatarInitials: "CS",
    avatarColor: "#7C3AED",
    playerCount: 11,
  };
  const teamB = route.params?.teamB || {
    teamName: "Team WD-B",
    avatarInitials: "TW",
    avatarColor: "#EC4899",
    playerCount: 11,
  };

  // Form State
  const [selectedMatchType, setSelectedMatchType] = useState("Limited Overs");
  const [noOfOvers, setNoOfOvers] = useState("20");
  const [oversPerBowler, setOversPerBowler] = useState("4");
  const [city, setCity] = useState("Indore");
  const [ground, setGround] = useState("");
  const [dateTime, setDateTime] = useState("Thu, Aug 06 2026 11:32 AM");
  const [selectedBallType, setSelectedBallType] = useState("tennis");
  const [showWagonWheel, setShowWagonWheel] = useState(true);
  const [selectedPitchType, setSelectedPitchType] = useState("TURF");

  const handleNextToss = () => {
    if (!noOfOvers.trim()) {
      Alert.alert("Required Field", "Please enter number of overs.");
      return;
    }

    navigation.navigate("Toss", {
      teamA,
      teamB,
      totalOvers: noOfOvers,
      oversPerBowler,
      selectedBallType,
      selectedPitchType,
      venue: ground || city,
    });
  };

  const handleScheduleMatch = () => {
    Alert.alert("Match Scheduled! 📅", `Match between ${teamA.teamName} and ${teamB.teamName} scheduled for ${dateTime}`);
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Top Header */}
      <AppHeader
        title="Start a match"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="p-1" activeOpacity={0.7}>
              <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity className="p-1 ml-2" activeOpacity={0.7}>
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Top Teams Vs Banner */}
        <View className="w-full bg-[#F1F5F9] border-b border-slate-200 py-6 px-4 flex-row items-center justify-around mb-6">
          {/* Team A Badge */}
          <View className="items-center">
            <View
              className="w-18 h-18 rounded-full justify-center items-center mb-2 shadow-sm border-2 border-white"
              style={{ backgroundColor: teamA.avatarColor || "#0D9488" }}
            >
              <Text className="text-white text-2xl font-black">
                {teamA.avatarInitials || "TA"}
              </Text>
            </View>
            <Text className="text-slate-900 font-extrabold text-base mb-1.5" numberOfLines={1}>
              {teamA.teamName}
            </Text>
            <TouchableOpacity
              className="bg-[#0D9488] px-3 py-1 rounded-md"
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("TeamRoster", { team: teamA, teamType: "A" })
              }
            >
              <Text className="text-white text-xs font-bold">
                Squad ({teamA.playerCount || 0})
              </Text>
            </TouchableOpacity>
          </View>

          {/* VS Divider */}
          <VsBadge />

          {/* Team B Badge */}
          <View className="items-center">
            <View
              className="w-18 h-18 rounded-full justify-center items-center mb-2 shadow-sm border-2 border-white"
              style={{ backgroundColor: teamB.avatarColor || "#EC4899" }}
            >
              <Text className="text-white text-2xl font-black">
                {teamB.avatarInitials || "TB"}
              </Text>
            </View>
            <Text className="text-slate-900 font-extrabold text-base mb-1.5" numberOfLines={1}>
              {teamB.teamName}
            </Text>
            <TouchableOpacity
              className="bg-[#0D9488] px-3 py-1 rounded-md"
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("TeamRoster", { team: teamB, teamType: "B" })
              }
            >
              <Text className="text-white text-xs font-bold">
                Squad ({teamB.playerCount || 0})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Container */}
        <View className="px-5">
          {/* Section 1: Match Type Pills */}
          <View className="mb-6">
            <Text className="text-slate-800 text-sm font-bold mb-2.5">
              Match type <Text className="text-red-500">*</Text>
            </Text>
            <View className="flex-row flex-wrap">
              {MATCH_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`px-4 py-2.5 rounded-full mr-2 mb-2 border ${
                    selectedMatchType === type
                      ? "bg-[#0D9488] border-[#0D9488]"
                      : "bg-slate-100 border-slate-200"
                  }`}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMatchType(type)}
                >
                  <Text
                    className={`text-xs font-bold ${
                      selectedMatchType === type ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section 2: Overs & Powerplay Row */}
          <View className="flex-row items-center justify-between mb-6 space-x-3">
            <View className="flex-1 border-b border-slate-300 pb-1 mr-2">
              <Text className="text-slate-400 text-xs font-medium mb-1">
                No. of overs *
              </Text>
              <TextInput
                className="text-base font-bold text-slate-900 p-0"
                keyboardType="number-pad"
                value={noOfOvers}
                onChangeText={setNoOfOvers}
              />
            </View>

            <View className="flex-1 border-b border-slate-300 pb-1 mr-2">
              <Text className="text-slate-400 text-xs font-medium mb-1">
                Overs per bowler
              </Text>
              <TextInput
                className="text-base font-bold text-slate-900 p-0"
                keyboardType="number-pad"
                value={oversPerBowler}
                onChangeText={setOversPerBowler}
              />
            </View>

            <TouchableOpacity className="py-2">
              <Text className="text-[#0D9488] text-sm font-bold">
                Power play ›
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section 3: City, Ground & Date Inputs */}
          <View className="mb-6 space-y-4">
            <View className="border-b border-slate-300 pb-1 mb-4">
              <Text className="text-slate-400 text-xs font-medium mb-1">
                City / town *
              </Text>
              <TextInput
                className="text-base font-bold text-slate-900 p-0"
                value={city}
                onChangeText={setCity}
                placeholder="City / town"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View className="border-b border-slate-300 pb-1 mb-4">
              <Text className="text-slate-400 text-xs font-medium mb-1">
                Ground *
              </Text>
              <TextInput
                className="text-base font-bold text-slate-900 p-0"
                value={ground}
                onChangeText={setGround}
                placeholder="Enter ground name"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View className="border-b border-slate-300 pb-1">
              <Text className="text-slate-400 text-xs font-medium mb-1">
                Date & time
              </Text>
              <Text className="text-base font-bold text-slate-900">
                {dateTime}
              </Text>
            </View>
          </View>

          {/* Section 4: Ball Type Selector */}
          <View className="mb-6">
            <Text className="text-slate-800 text-sm font-bold mb-3">
              Ball type <Text className="text-red-500">*</Text>
            </Text>
            <View className="flex-row items-center space-x-6">
              {BALL_TYPES.map((ball) => (
                <TouchableOpacity
                  key={ball.id}
                  className="items-center mr-4"
                  activeOpacity={0.8}
                  onPress={() => setSelectedBallType(ball.id)}
                >
                  <View
                    className={`w-14 h-14 rounded-full justify-center items-center mb-1.5 border-2 ${
                      selectedBallType === ball.id
                        ? "border-[#0D9488] bg-emerald-50"
                        : "border-slate-200 bg-slate-100"
                    }`}
                  >
                    <Ionicons name={ball.icon} size={28} color={ball.color} />
                  </View>
                  <Text
                    className={`text-xs font-bold ${
                      selectedBallType === ball.id ? "text-[#0D9488]" : "text-slate-600"
                    }`}
                  >
                    {ball.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section 5: Wagon Wheel Toggle */}
          <View className="flex-row items-center justify-between py-3 border-y border-slate-200 mb-6">
            <View className="flex-1 pr-4">
              <Text className="text-slate-900 font-bold text-base">
                Wagon Wheel
              </Text>
              <Text className="text-slate-500 text-xs font-semibold mt-0.5">
                Show Wagon Wheel for 1s, 2s, & 3s
              </Text>
            </View>
            <Switch
              value={showWagonWheel}
              onValueChange={setShowWagonWheel}
              trackColor={{ false: "#CBD5E1", true: "#0D9488" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Section 6: Pitch Type Pills */}
          <View className="mb-6">
            <Text className="text-slate-800 text-sm font-bold mb-2.5">
              Pitch type
            </Text>
            <View className="flex-row flex-wrap">
              {PITCH_TYPES.map((pitch) => (
                <TouchableOpacity
                  key={pitch}
                  className={`px-4 py-2.5 rounded-full mr-2 mb-2 border ${
                    selectedPitchType === pitch
                      ? "bg-[#0D9488] border-[#0D9488]"
                      : "bg-slate-100 border-slate-200"
                  }`}
                  activeOpacity={0.8}
                  onPress={() => setSelectedPitchType(pitch)}
                >
                  <Text
                    className={`text-xs font-bold ${
                      selectedPitchType === pitch ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {pitch}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section 7: Match Officials Matrix */}
          <View className="mb-8">
            <Text className="text-slate-800 text-sm font-bold mb-3">
              Match officials
            </Text>
            <View className="flex-row justify-between">
              {[
                { name: "Umpires", icon: "shield-checkmark-outline" },
                { name: "Scorers", icon: "clipboard-outline" },
                { name: "Live streamer", icon: "videocam-outline" },
                { name: "Others", icon: "person-outline" },
              ].map((official, idx) => (
                <TouchableOpacity
                  key={idx}
                  className="items-center w-[22%]"
                  activeOpacity={0.7}
                  onPress={() => Alert.alert("Match Official 👔", `Select ${official.name}`)}
                >
                  <View className="w-13 h-13 rounded-full bg-slate-100 border border-slate-300 justify-center items-center mb-1 shadow-xs">
                    <Ionicons name={official.icon} size={22} color="#334155" />
                  </View>
                  <Text className="text-slate-700 text-[11px] font-bold text-center">
                    {official.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Action Bar (Schedule Match & Next Toss) */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex-row h-14">
        {/* Schedule Match */}
        <TouchableOpacity
          className="flex-1 bg-slate-200 justify-center items-center"
          activeOpacity={0.8}
          onPress={handleScheduleMatch}
        >
          <Text className="text-slate-700 text-base font-extrabold">
            Schedule match
          </Text>
        </TouchableOpacity>

        {/* Next (toss) */}
        <TouchableOpacity
          className="flex-1 bg-[#0D9488] justify-center items-center"
          activeOpacity={0.85}
          onPress={handleNextToss}
        >
          <Text className="text-white text-base font-extrabold">
            Next (toss)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartMatchSetupScreen;
