import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const HomePillTabs = ({ activeTab = "For you", onTabPress }) => {
  const isForYou = activeTab === "For you";
  const isClub = activeTab === "Club";

  return (
    <View className="flex-row bg-white border-b border-slate-200 h-12 w-full">
      {/* Tab 1: For you */}
      <TouchableOpacity
        className="flex-1 items-center justify-center relative"
        activeOpacity={0.7}
        onPress={() => onTabPress && onTabPress("For you")}
      >
        <Text
          className={`text-base ${
            isForYou ? "text-slate-900 font-bold" : "text-slate-500 font-semibold"
          }`}
        >
          For you
        </Text>
        {isForYou && (
          <View className="absolute bottom-0 left-[20%] right-[20%] h-1 bg-[#0D9488] rounded-t-sm" />
        )}
      </TouchableOpacity>

      {/* Tab 2: PRO Club */}
      <TouchableOpacity
        className="flex-1 items-center justify-center relative"
        activeOpacity={0.7}
        onPress={() => onTabPress && onTabPress("Club")}
      >
        <View className="flex-row items-center">
          <View className="bg-[#0D9488] px-1.5 py-0.5 rounded mr-1">
            <Text className="text-white text-[9px] font-black tracking-wider">
              PRO
            </Text>
          </View>
          <Text
            className={`text-base ${
              isClub ? "text-slate-900 font-bold" : "text-slate-500 font-semibold"
            }`}
          >
            Club
          </Text>
        </View>
        {isClub && (
          <View className="absolute bottom-0 left-[20%] right-[20%] h-1 bg-[#0D9488] rounded-t-sm" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HomePillTabs;
