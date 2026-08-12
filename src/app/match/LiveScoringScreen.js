import React, { useState } from "react";
import { View, ScrollView, StatusBar, TouchableOpacity, Text, Modal, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScorecardHeader from "../../components/scoring/ScorecardHeader";
import OverTimeline from "../../components/scoring/OverTimeline";
import ScoringKeypad from "../../components/scoring/ScoringKeypad";
import WicketModal from "../../components/scoring/WicketModal";
import WideBallModal from "../../components/scoring/WideBallModal";
import NoBallModal from "../../components/scoring/NoBallModal";
import ByeLegByeModal from "../../components/scoring/ByeLegByeModal";
import CustomRunsModal from "../../components/scoring/CustomRunsModal";
import ScoringShortcutsModal from "../../components/scoring/ScoringShortcutsModal";
import useMatchScoringEngine from "../../hooks/useMatchScoringEngine";

const LiveScoringScreen = ({ navigation }) => {
  const [isWicketModalVisible, setIsWicketModalVisible] = useState(false);
  const [isWideModalVisible, setIsWideModalVisible] = useState(false);
  const [isNoBallModalVisible, setIsNoBallModalVisible] = useState(false);
  const [byeModalType, setByeModalType] = useState(null); // 'BYE' | 'LB' | null
  const [isCustomRunsModalVisible, setIsCustomRunsModalVisible] = useState(false);
  const [isShortcutsModalVisible, setIsShortcutsModalVisible] = useState(false);

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
  };

  const handleScoreWicket = (wicketType) => {
    scoreWicket(wicketType);
  };

  const handleSelectWide = (extraRuns) => {
    const runsToAdd = extraRuns === "custom" ? 1 : extraRuns;
    scoreExtra("WD", runsToAdd);
  };

  const handleSelectNoBall = (extraRuns) => {
    const runsToAdd = extraRuns === "custom" ? 1 : extraRuns;
    scoreExtra("NB", runsToAdd);
  };

  const handleSelectByeLegBye = (runs) => {
    const runsToAdd = runs === "+" ? 1 : parseInt(runs, 10);
    scoreExtra(byeModalType, runsToAdd);
  };

  const handleSelectShortcut = (shortcutId) => {
    if (shortcutId === "FULL_SCORECARD") {
      navigation.navigate("FullScorecard");
    } else {
      Alert.alert("Shortcut Selected ⌨️", `Activated shortcut: ${shortcutId}`);
    }
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Main Screen Flex Container */}
      <View className="flex-1 justify-between bg-[#F8FAFC]">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Main Glassmorphism Dark Blurred Stadium Scorecard Header */}
          <ScorecardHeader
            teamName={battingTeam?.teamName || "Srk"}
            totalRuns={totalRuns}
            wickets={wickets}
            formattedOvers={`${formattedOvers}/${totalOvers}`}
            tossInfo={`${bowlingTeam?.teamName || "King"} won the toss and elected to field`}
            matchId="26303040"
            striker={striker}
            strikerRuns={totalRuns > 0 ? Math.max(1, Math.floor(totalRuns / 2)) : 0}
            strikerBalls={totalRuns > 0 ? 3 : 0}
            nonStriker={nonStriker}
            bowler={bowler}
            bowlerStats={`${formattedOvers}-0-${totalRuns}-${wickets}`}
            onBackPress={() => navigation.goBack()}
            onSharePress={() => {}}
            onSettingsPress={() => {}}
            onSwapStriker={swapStrikers}
          />

          {/* Target Banner for Inning 2 */}
          {currentInning === 2 && targetRuns && (
            <View className="bg-emerald-900 px-4 py-2.5 flex-row justify-between items-center border-b border-emerald-700">
              <Text className="text-emerald-300 font-extrabold text-xs">
                TARGET: {targetRuns} RUNS IN {totalOvers} OVERS
              </Text>
              <Text className="text-white font-black text-xs">
                NEED {Math.max(0, targetRuns - totalRuns)} RUNS
              </Text>
            </View>
          )}

          {/* Current Over Timeline Circles */}
          <OverTimeline timeline={timeline} />
        </ScrollView>

        {/* 4x4 Keypad Grid Matrix Sitting Flush at Bottom Edge */}
        <ScoringKeypad
          onScoreRuns={handleScoreRuns}
          onOpenWicketModal={() => setIsWicketModalVisible(true)}
          onOpenWideModal={() => setIsWideModalVisible(true)}
          onOpenNoBallModal={() => setIsNoBallModalVisible(true)}
          onOpenByeModal={() => setByeModalType("BYE")}
          onOpenLegByeModal={() => setByeModalType("LB")}
          onOpenCustomRunsModal={() => setIsCustomRunsModalVisible(true)}
          onOpenShortcutsModal={() => setIsShortcutsModalVisible(true)}
          onUndo={undoLastBall}
        />
      </View>

      {/* 1. Full 16 Wicket Dismissals Selection Modal */}
      <WicketModal
        visible={isWicketModalVisible}
        onClose={() => setIsWicketModalVisible(false)}
        onSelectWicket={handleScoreWicket}
      />

      {/* 2. Wide Ball Extra Runs Modal */}
      <WideBallModal
        visible={isWideModalVisible}
        onClose={() => setIsWideModalVisible(false)}
        onSelectWide={handleSelectWide}
      />

      {/* 3. No Ball Extra Runs Modal */}
      <NoBallModal
        visible={isNoBallModalVisible}
        onClose={() => setIsNoBallModalVisible(false)}
        onSelectNoBall={handleSelectNoBall}
      />

      {/* 4. Bye / Leg Bye Runs Modal */}
      <ByeLegByeModal
        visible={Boolean(byeModalType)}
        type={byeModalType || "BYE"}
        onClose={() => setByeModalType(null)}
        onSelectRuns={handleSelectByeLegBye}
        onSetKeeper={() => Alert.alert("Set Keeper 🧤", "Select team wicketkeeper")}
      />

      {/* 5. Custom Running Runs Input Modal */}
      <CustomRunsModal
        visible={isCustomRunsModalVisible}
        onClose={() => setIsCustomRunsModalVisible(false)}
        onSubmitCustomRuns={(runs) => scoreRuns(runs)}
      />

      {/* 6. Scoring Shortcuts Bottom Sheet Modal */}
      <ScoringShortcutsModal
        visible={isShortcutsModalVisible}
        onClose={() => setIsShortcutsModalVisible(false)}
        onSelectShortcut={handleSelectShortcut}
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
          <View className="bg-white w-full rounded-3xl p-6 items-center shadow-2xl border border-slate-100">
            <View className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-300 justify-center items-center mb-3 shadow-sm">
              <MaterialCommunityIcons name="crown" size={48} color="#C59B27" />
            </View>
            <Text className="text-xl font-black text-slate-900 mt-1 mb-1 text-center tracking-wide">
              🎉 {matchWinner?.teamName?.toUpperCase() || "FIRST"} WON THE MATCH! 🎉
            </Text>
            <Text className="text-slate-600 text-sm font-bold text-center mb-6">
              Congratulations to {matchWinner?.teamName || "First"}!
            </Text>

            <TouchableOpacity
              className="w-full h-14 bg-[#0D9488] rounded-2xl justify-center items-center shadow-lg shadow-teal-500/30 active:bg-teal-700 mb-2"
              activeOpacity={0.85}
              onPress={() => navigation.navigate("MatchSummary")}
            >
              <Text className="text-white text-base font-extrabold">
                View Match Summary & Scorecard 📊
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LiveScoringScreen;
