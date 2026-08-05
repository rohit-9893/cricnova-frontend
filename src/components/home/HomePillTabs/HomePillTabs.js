import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TABS = ["For you", "Club"];

const HomePillTabs = ({ activeTab = "For you", onTabPress }) => {
  return (
    <View className="mx-5 mb-5 flex-row items-center p-1 rounded-full bg-[#D8EADF]">
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-2.5 items-center justify-center rounded-full ${
              isActive ? "bg-[#143D2B]" : "bg-transparent"
            }`}
            activeOpacity={0.8}
            onPress={() => onTabPress && onTabPress(tab)}
          >
            <Text
              className={`text-base ${
                isActive ? "text-white font-extrabold" : "text-[#143D2B] font-bold"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HomePillTabs;
