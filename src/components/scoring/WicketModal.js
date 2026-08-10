import React from "react";
import { Modal, View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WICKET_TYPES } from "../../constants/matchConstants";

const WicketModal = ({ visible, onClose, onSelectWicket }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 justify-end">
        <StatusBar barStyle="light-content" translucent />

        <View className="bg-white rounded-t-3xl p-6 shadow-2xl">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-slate-200">
            <View className="flex-row items-center space-x-2">
              <View className="w-8 h-8 rounded-full bg-red-100 justify-center items-center mr-2">
                <Ionicons name="alert-circle" size={20} color="#DC2626" />
              </View>
              <Text className="text-xl font-black text-slate-900">
                Select Dismissal Type
              </Text>
            </View>

            <TouchableOpacity onPress={onClose} className="p-1">
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Dismissal Options Grid */}
          <View className="flex-row flex-wrap justify-between">
            {WICKET_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                className="w-[48%] py-3.5 px-4 mb-3 rounded-xl bg-slate-100 border border-slate-200 flex-row items-center justify-between"
                activeOpacity={0.75}
                onPress={() => {
                  onSelectWicket(type.id);
                  onClose();
                }}
              >
                <Text className="font-bold text-slate-800 text-sm">{type.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WicketModal;
