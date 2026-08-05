import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SubHeaderTabs = ({ tabs = [], activeTab, onTabPress }) => {
  return (
    <View className="h-12 bg-white flex-row border-b border-slate-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            className="flex-1 justify-center items-center relative"
            onPress={() => onTabPress && onTabPress(tab)}
          >
            <Text
              className={`text-sm ${
                isActive ? "text-slate-900 font-bold" : "text-slate-600 font-medium"
              }`}
            >
              {tab}
            </Text>
            {isActive && (
              <View className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red rounded-t-sm" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SubHeaderTabs;
