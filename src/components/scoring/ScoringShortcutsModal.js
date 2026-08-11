import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export const SHORTCUTS = [
  { id: "NEED_HELP", name: "Need Help", icon: "help-circle-outline" },
  { id: "MATCH_RULES", name: "Match Rules", icon: "cog-outline" },
  { id: "CHANGE_SCORER", name: "Change Scorer", icon: "account-switch-outline" },
  { id: "CHANGE_SQUAD", name: "Change Squad", icon: "account-group-outline" },
  { id: "FULL_SCORECARD", name: "Full Scorecard", icon: "clipboard-text-outline" },
  { id: "MATCH_OVERS", name: "Match Overs", icon: "pencil-outline" },
  { id: "REPLACE_BATTERS", name: "Replace Batters", icon: "swap-horizontal" },
  { id: "BONUS_RUNS", name: "Bonus Runs", icon: "plus-circle-outline" },
];

const ScoringShortcutsModal = ({ visible, onClose, onSelectShortcut }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/60 justify-end"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-5 border-t border-slate-200">
          {/* Top Handle */}
          <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-3" />

          <Text className="text-slate-900 font-black text-center text-base mb-5">
            Select a shortcut
          </Text>

          {/* 4x2 Circular Shortcut Icons Matrix */}
          <View className="flex-row flex-wrap justify-between">
            {SHORTCUTS.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-[23%] items-center mb-5"
                activeOpacity={0.7}
                onPress={() => {
                  onSelectShortcut(item.id);
                  onClose();
                }}
              >
                <View className="w-13 h-13 rounded-full bg-slate-100 border border-slate-200 justify-center items-center mb-1.5 shadow-xs">
                  <MaterialCommunityIcons name={item.icon} size={22} color="#1E293B" />
                </View>
                <Text className="text-slate-800 text-[10px] font-bold text-center leading-3" numberOfLines={2}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Action Link */}
          <TouchableOpacity
            className="py-2.5 items-center mt-1"
            activeOpacity={0.7}
            onPress={onClose}
          >
            <Text className="text-[#0D9488] font-extrabold text-xs">
              More shortcuts
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ScoringShortcutsModal;
