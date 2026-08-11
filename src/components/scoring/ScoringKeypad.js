import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ScoringKeypad = ({
  onScoreRuns,
  onOpenWicketModal,
  onOpenWideModal,
  onOpenNoBallModal,
  onOpenByeModal,
  onOpenLegByeModal,
  onOpenCustomRunsModal,
  onOpenShortcutsModal,
  onUndo,
}) => {
  const [showSyncedToast, setShowSyncedToast] = useState(false);

  const handleScore = (actionFn) => {
    if (actionFn) actionFn();
    setShowSyncedToast(true);
    setTimeout(() => {
      setShowSyncedToast(false);
    }, 1200);
  };

  return (
    <View className="bg-slate-200 border-t border-slate-300 w-full shadow-2xl relative">
      {/* Floating Synced Toast Badge */}
      {showSyncedToast && (
        <View className="absolute -top-12 self-center z-50 bg-slate-900/90 px-4 py-2 rounded-xl flex-row items-center shadow-2xl border border-slate-700">
          <Ionicons name="checkmark-sharp" size={16} color="#FFFFFF" />
          <Text className="text-white text-xs font-black ml-1.5">Synced</Text>
        </View>
      )}

      {/* Grid Row 1: 0, 1, 2, UNDO */}
      <View className="flex-row border-b border-slate-300">
        <TouchableOpacity
          className="flex-1 h-20 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.7}
          onPress={() => handleScore(() => onScoreRuns(0))}
        >
          <Text className="text-slate-800 text-2xl font-black">0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-20 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.7}
          onPress={() => handleScore(() => onScoreRuns(1))}
        >
          <Text className="text-slate-800 text-2xl font-black">1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-20 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.7}
          onPress={() => handleScore(() => onScoreRuns(2))}
        >
          <Text className="text-slate-800 text-2xl font-black">2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-20 bg-slate-50 justify-center items-center"
          activeOpacity={0.75}
          onPress={() => handleScore(onUndo)}
        >
          <Text className="text-[#0D9488] text-sm font-black tracking-wider">UNDO</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Row 2: 3, 4 (Four), 6 (Six), 5,7 / OUT Column */}
      <View className="flex-row border-b border-slate-300">
        <TouchableOpacity
          className="flex-1 h-20 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.7}
          onPress={() => handleScore(() => onScoreRuns(3))}
        >
          <Text className="text-slate-800 text-2xl font-black">3</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-20 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.7}
          onPress={() => handleScore(() => onScoreRuns(4))}
        >
          <Text className="text-slate-800 text-2xl font-black">4</Text>
          <Text className="text-slate-400 text-[10px] font-semibold">Four</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-20 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.7}
          onPress={() => handleScore(() => onScoreRuns(6))}
        >
          <Text className="text-slate-800 text-2xl font-black">6</Text>
          <Text className="text-slate-400 text-[10px] font-semibold">Six</Text>
        </TouchableOpacity>

        {/* 4th Column Split: 5,7 on top, OUT on bottom */}
        <View className="flex-1 h-20 flex-col">
          <TouchableOpacity
            className="flex-1 bg-slate-50 justify-center items-center border-b border-slate-200"
            activeOpacity={0.7}
            onPress={onOpenCustomRunsModal}
          >
            <Text className="text-slate-600 text-xs font-black">5, 7</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-slate-50 justify-center items-center"
            activeOpacity={0.8}
            onPress={onOpenWicketModal}
          >
            <Text className="text-[#DC2626] text-xs font-black tracking-wider">OUT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grid Row 3: WD, NB, BYE, LB */}
      <View className="flex-row border-b border-slate-300">
        <TouchableOpacity
          className="flex-1 h-16 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.75}
          onPress={onOpenWideModal}
        >
          <Text className="text-slate-700 text-sm font-extrabold">WD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-16 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.75}
          onPress={onOpenNoBallModal}
        >
          <Text className="text-slate-700 text-sm font-extrabold">NB</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-16 bg-white justify-center items-center border-r border-slate-300"
          activeOpacity={0.75}
          onPress={onOpenByeModal}
        >
          <Text className="text-slate-700 text-sm font-extrabold">BYE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-16 bg-white justify-center items-center"
          activeOpacity={0.75}
          onPress={onOpenLegByeModal}
        >
          <Text className="text-slate-700 text-sm font-extrabold">LB</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Shortcuts Bar */}
      <TouchableOpacity
        className="bg-slate-400/80 py-3 justify-center items-center flex-row"
        activeOpacity={0.8}
        onPress={onOpenShortcutsModal}
      >
        <Text className="text-white text-xs font-bold mr-1">Scoring shortcuts</Text>
        <Ionicons name="chevron-up" size={14} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ScoringKeypad;
