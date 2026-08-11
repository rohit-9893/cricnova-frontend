import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";

const CustomRunsModal = ({ visible, onClose, onSubmitCustomRuns }) => {
  const [runsInput, setRunsInput] = useState("");

  const handleConfirm = () => {
    const parsedRuns = parseInt(runsInput, 10);
    if (!isNaN(parsedRuns) && parsedRuns >= 0) {
      onSubmitCustomRuns(parsedRuns);
      setRunsInput("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/65 justify-center items-center px-6"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="bg-white w-full rounded-2xl p-5 border border-slate-200 shadow-2xl items-center"
        >
          <Text className="text-slate-900 font-black text-lg mb-4 text-center">
            Runs scored by running
          </Text>

          {/* Numeric Input Box */}
          <View className="w-32 h-13 border border-slate-300 rounded-xl justify-center items-center mb-3 bg-slate-50">
            <TextInput
              className="text-slate-900 font-black text-2xl text-center w-full h-full"
              keyboardType="number-pad"
              autoFocus
              value={runsInput}
              onChangeText={setRunsInput}
              maxLength={2}
              placeholder="0"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Cricket Rule Disclaimer Note */}
          <Text className="text-slate-400 text-[11px] font-semibold italic text-center mb-6">
            *4 and 6 will not be considered boundaries.
          </Text>

          {/* Action Buttons Bar */}
          <View className="flex-row w-full border-t border-slate-200 divide-x divide-slate-200">
            <TouchableOpacity
              className="flex-1 py-3.5 justify-center items-center"
              activeOpacity={0.7}
              onPress={onClose}
            >
              <Text className="text-slate-500 font-bold text-sm">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3.5 bg-[#0D9488] rounded-br-2xl justify-center items-center active:bg-teal-700"
              activeOpacity={0.85}
              onPress={handleConfirm}
            >
              <Text className="text-white font-black text-sm">Ok</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomRunsModal;
