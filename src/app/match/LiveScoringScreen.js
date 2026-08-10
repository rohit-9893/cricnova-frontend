import React, { useState } from "react";
import { View, ScrollView, StatusBar, Alert, TouchableOpacity, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import ScorecardHeader from "../../components/scoring/ScorecardHeader";
import OverTimeline from "../../components/scoring/OverTimeline";
import ScoringKeypad from "../../components/scoring/ScoringKeypad";
import WicketModal from "../../components/scoring/WicketModal";
import BallEventOverlay from "../../components/scoring/BallEventOverlay";
import useMatchScoringEngine from "../../hooks/useMatchScoringEngine";

const LiveScoringScreen = ({ navigation }) => {
  const [isWicketModalVisible, setIsWicketModalVisible] = useState(false);
  const [activeOverlayEvent, setActiveOverlayEvent] = useState(null);

  const {
    totalRuns,
    wickets,
    formattedOvers,
    currentRunRate,
    totalOvers,
    currentInning,
    targetRuns,
    isInningsComplete,
    isMatchFinished,
    matchWinner,
    striker,
    nonStriker,
    bowler,
    timeline,
    battingTeam,
    bowlingTeam,
    scoreRuns,
    scoreExtra,
    scoreWicket,
    undoLastBall,
    swapStrikers,
    startSecondInning,
  } = useMatchScoringEngine();

  const handleScoreRuns = (runs) => {
    scoreRuns(runs);
    if (runs === 4 || runs === 6) {
      setActiveOverlayEvent(String(runs));
    }
  };

  const handleScoreWicket = (wicketType) => {
    scoreWicket(wicketType);
    setActiveOverlayEvent("W");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <AppHeader
        title={`Live Match - ${currentInning === 1 ? "1st Inning" : "2nd Inning"}`}
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity
            className="p-1"
            onPress={() => Alert.alert("End Match", "Are you sure you want to end this match?", [
              { text: "Cancel" },
              { text: "End Match", onPress: () => navigation.replace("Home") },
            ])}
          >
            <Ionicons name="flag-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Target Banner for Inning 2 */}
        {currentInning === 2 && targetRuns && (
          <View className="bg-[#143D2B] p-3 rounded-xl mb-3 flex-row justify-between items-center border border-emerald-700">
            <Text className="text-emerald-300 font-extrabold text-xs">
              TARGET: {targetRuns} RUNS IN {totalOvers} OVERS
            </Text>
            <Text className="text-white font-black text-xs">
              NEED {Math.max(0, targetRuns - totalRuns)} RUNS
            </Text>
          </View>
        )}

        {/* Main Live Scorecard Header */}
        <ScorecardHeader
          teamName={battingTeam?.teamName || "Batting Team"}
          totalRuns={totalRuns}
          wickets={wickets}
          formattedOvers={`${formattedOvers} / ${totalOvers}`}
          currentRunRate={currentRunRate}
          striker={striker}
          nonStriker={nonStriker}
          bowler={bowler}
          onSwapStriker={swapStrikers}
        />

        {/* Current Over Timeline */}
        <OverTimeline timeline={timeline} />

        {/* Scoring Control Keypad */}
        <ScoringKeypad
          onScoreRuns={handleScoreRuns}
          onScoreExtra={scoreExtra}
          onOpenWicketModal={() => setIsWicketModalVisible(true)}
          onUndo={undoLastBall}
        />
      </ScrollView>

      {/* Animated Pop-up Event Overlay (4s, 6s, Wickets) */}
      <BallEventOverlay
        eventTag={activeOverlayEvent}
        visible={Boolean(activeOverlayEvent)}
        onDismiss={() => setActiveOverlayEvent(null)}
      />

      {/* Wicket Modal Selection */}
      <WicketModal
        visible={isWicketModalVisible}
        onClose={() => setIsWicketModalVisible(false)}
        onSelectWicket={handleScoreWicket}
      />

      {/* 1st Innings Complete Modal */}
      <Modal visible={isInningsComplete && !isMatchFinished} transparent animationType="fade">
        <View className="flex-1 bg-black/70 justify-center items-center px-6">
          <View className="bg-white w-full rounded-2xl p-6 items-center shadow-2xl">
            <MaterialCommunityIcons name="trophy-outline" size={54} color="#0D9488" />
            <Text className="text-xl font-black text-slate-900 mt-2 mb-1">
              1st Innings Complete!
            </Text>
            <Text className="text-slate-600 text-sm font-semibold text-center mb-4">
              {battingTeam?.teamName} scored {totalRuns}/{wickets} in {totalOvers} overs.
            </Text>
            <View className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl mb-6">
              <Text className="text-[#0D9488] font-black text-base text-center">
                Target for {bowlingTeam?.teamName}: {totalRuns + 1} Runs
              </Text>
            </View>

            <TouchableOpacity
              className="w-full h-13 bg-[#0D9488] rounded-xl justify-center items-center shadow-md"
              activeOpacity={0.85}
              onPress={startSecondInning}
            >
              <Text className="text-white text-base font-extrabold">
                Start 2nd Innings ➔
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Match Finished Winner Modal */}
      <Modal visible={isMatchFinished} transparent animationType="fade">
        <View className="flex-1 bg-black/80 justify-center items-center px-6">
          <View className="bg-white w-full rounded-2xl p-6 items-center shadow-2xl">
            <MaterialCommunityIcons name="crown" size={60} color="#C59B27" />
            <Text className="text-2xl font-black text-slate-900 mt-2 mb-1 text-center">
              🎉 MATCH WON BY {matchWinner?.teamName?.toUpperCase()}! 🎉
            </Text>
            <Text className="text-slate-600 text-sm font-bold text-center mb-6">
              Congratulations to {matchWinner?.teamName}!
            </Text>

            <TouchableOpacity
              className="w-full h-13 bg-[#0D9488] rounded-xl justify-center items-center shadow-md"
              activeOpacity={0.85}
              onPress={() => navigation.replace("Home")}
            >
              <Text className="text-white text-base font-extrabold">
                Back to Home Screen
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LiveScoringScreen;
