import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ScoringKeypad = ({
  onScoreRuns,
  onScoreExtra,
  onOpenWicketModal,
  onUndo,
}) => {
  return (
    <View className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md">
      <Text className="text-slate-800 text-xs font-black uppercase mb-3">
        Scoring Keypad
      </Text>

      {/* Main Run Buttons: 0, 1, 2, 3, 4, 6 */}
      <View className="flex-row justify-between mb-3">
        {[0, 1, 2, 3, 4, 6].map((num) => (
          <TouchableOpacity
            key={num}
            className={`w-12 h-14 rounded-xl justify-center items-center shadow-xs border ${
              num === 4
                ? "bg-blue-600 border-blue-700"
                : num === 6
                ? "bg-emerald-600 border-emerald-700"
                : "bg-slate-100 border-slate-300"
            }`}
            activeOpacity={0.7}
            onPress={() => onScoreRuns(num)}
          >
            <Text
              className={`text-lg font-black ${
                num === 4 || num === 6 ? "text-white" : "text-slate-900"
              }`}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Extras Row: Wide, No Ball, Bye, Leg Bye */}
      <View className="flex-row justify-between mb-3">
        {[
          { label: "Wide", type: "WD" },
          { label: "No Ball", type: "NB" },
          { label: "Bye", type: "B" },
          { label: "Leg Bye", type: "LB" },
        ].map((item) => (
          <TouchableOpacity
            key={item.type}
            className="flex-1 h-11 bg-amber-500 rounded-xl justify-center items-center mx-1 border border-amber-600 shadow-xs"
            activeOpacity={0.75}
            onPress={() => onScoreExtra(item.type, 0)}
          >
            <Text className="text-white font-extrabold text-xs">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Row: Wicket & Undo Ball */}
      <View className="flex-row space-x-3">
        <TouchableOpacity
          className="flex-1 h-13 bg-red-600 rounded-xl justify-center items-center flex-row space-x-2 shadow-md border border-red-700 mr-2"
          activeOpacity={0.8}
          onPress={onOpenWicketModal}
        >
          <Ionicons name="close-circle" size={20} color="#FFFFFF" />
          <Text className="text-white font-extrabold text-sm">WICKET!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-24 h-13 bg-slate-200 rounded-xl justify-center items-center flex-row space-x-1 border border-slate-300"
          activeOpacity={0.75}
          onPress={onUndo}
        >
          <Ionicons name="arrow-undo" size={18} color="#475569" />
          <Text className="text-slate-700 font-extrabold text-xs">UNDO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScoringKeypad;
