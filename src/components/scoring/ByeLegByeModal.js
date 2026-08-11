import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ByeLegByeModal = ({ visible, onClose, type = "BYE", onSelectRuns, onSetKeeper }) => {
  const isBye = type === "BYE";
  const title = isBye ? "Bye runs" : "Leg bye runs";
  const runsList = [1, 2, 3, 4, "+"];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/60 justify-end"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-5 border-t border-slate-200">
          {/* Top Indicator Handle */}
          <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-4" />

          {/* Modal Title */}
          <Text className="text-slate-900 font-extrabold text-base text-center mb-5">
            {title}
          </Text>

          {/* Run Selection Pill Buttons */}
          <View className="flex-row justify-between mb-4">
            {runsList.map((run, idx) => (
              <TouchableOpacity
                key={idx}
                className="w-[18%] py-3 bg-white rounded-xl border border-[#0D9488] justify-center items-center active:bg-teal-50"
                onPress={() => {
                  onSelectRuns(run);
                  onClose();
                }}
              >
                <Text className="text-[#0D9488] font-extrabold text-sm">
                  {run}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dynamic Set Keeper Action Link for Bye runs */}
          {isBye && (
            <TouchableOpacity
              className="flex-row justify-center items-center py-2.5 mt-1"
              activeOpacity={0.7}
              onPress={() => {
                onClose();
                if (onSetKeeper) onSetKeeper();
              }}
            >
              <MaterialCommunityIcons name="baseball-bat" size={18} color="#0D9488" className="mr-1.5" />
              <Text className="text-[#0D9488] font-extrabold text-xs">
                Set keeper
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ByeLegByeModal;
