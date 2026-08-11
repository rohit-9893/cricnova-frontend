import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NoBallModal = ({ visible, onClose, onSelectNoBall }) => {
  const noBallOptions = [
    { label: "NB + 0", extraRuns: 0 },
    { label: "NB + 1", extraRuns: 1 },
    { label: "NB + 2", extraRuns: 2 },
    { label: "NB + 3", extraRuns: 3 },
    { label: "NB + 4", extraRuns: 4 },
    { label: "NB + 5", extraRuns: 5 },
    { label: "NB + 6", extraRuns: 6 },
    { label: "+", extraRuns: "custom" },
  ];

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

          {/* Modal Title Bar */}
          <View className="flex-row justify-between items-center mb-5 px-1">
            <Text className="text-slate-900 font-extrabold text-base">
              No ball <Text className="text-slate-500 font-semibold text-xs">(NB=1)</Text>
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Ionicons name="settings-outline" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* 8 Pill Buttons Grid Matrix (2 Rows x 4 Columns) */}
          <View className="flex-row flex-wrap justify-between">
            {noBallOptions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                className="w-[23%] py-3 mb-3 bg-white rounded-xl border border-[#0D9488] justify-center items-center active:bg-teal-50"
                onPress={() => {
                  onSelectNoBall(item.extraRuns);
                  onClose();
                }}
              >
                <Text className="text-[#0D9488] font-extrabold text-xs">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default NoBallModal;
