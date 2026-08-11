import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const WICKET_TYPES = [
  { id: "BOWLED", name: "Bowled", icon: "cricket" },
  { id: "CAUGHT", name: "Caught", icon: "hand-left" },
  { id: "CAUGHT_BEHIND", name: "Caught Behind", icon: "baseball" },
  { id: "CAUGHT_BOWLED", name: "Caught & bowled", icon: "target" },
  { id: "RUN_OUT", name: "Run out", icon: "run-fast" },
  { id: "LBW", name: "LBW", icon: "human-handsdown" },
  { id: "STUMPED", name: "Stumped", icon: "gate" },
  { id: "RETIRED_HURT", name: "Retired hurt", icon: "bandage" },
  { id: "MANKADED", name: "Run out (mankaded)", icon: "lightning-bolt" },
  { id: "HIT_WICKET", name: "Hit wicket", icon: "close-box" },
  { id: "ABSENT_HURT", name: "Absent Hurt", icon: "hospital-building" },
  { id: "RETIRED_OUT", name: "Retired out", icon: "account-cancel" },
  { id: "HIT_TWICE", name: "Hit the ball twice", icon: "numeric-2-circle" },
  { id: "OBSTRUCTING", name: "Obstructing the field", icon: "hand-back-left" },
  { id: "TIMED_OUT", name: "Timed out", icon: "clock-alert" },
  { id: "RETIRED", name: "Retired", icon: "walk" },
];

const WicketModal = ({ visible, onClose, onSelectWicket }) => {
  const [showAll, setShowAll] = useState(false);
  const displayWickets = showAll ? WICKET_TYPES : WICKET_TYPES.slice(0, 8);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/60 justify-end"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-5 border-t border-slate-200 max-h-[85%]">
          {/* Top Handle */}
          <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-3" />

          <Text className="text-slate-900 font-black text-center text-base mb-4">
            Select out type
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 4-Column Wicket Circular Grid */}
            <View className="flex-row flex-wrap justify-between">
              {displayWickets.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="w-[23%] items-center mb-5"
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelectWicket(item.id);
                    onClose();
                  }}
                >
                  <View className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 justify-center items-center mb-1.5 shadow-xs">
                    <MaterialCommunityIcons name={item.icon} size={24} color="#334155" />
                  </View>
                  <Text className="text-slate-800 text-[10px] font-bold text-center leading-3" numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Show More / Show Less Toggle Button */}
            <TouchableOpacity
              className="py-3 items-center"
              activeOpacity={0.7}
              onPress={() => setShowAll(!showAll)}
            >
              <Text className="text-[#0D9488] font-extrabold text-xs">
                {showAll ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default WicketModal;
