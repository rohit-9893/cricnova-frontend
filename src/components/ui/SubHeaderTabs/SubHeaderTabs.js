import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const SubHeaderTabs = ({ tabs = [], activeTab, onTabPress }) => {
  return (
    <View className="bg-[#0D9488] border-b border-teal-700">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              className={`px-4 py-3 mr-1 relative ${
                isActive ? "opacity-100" : "opacity-75"
              }`}
              activeOpacity={0.7}
              onPress={() => onTabPress(tab)}
            >
              <Text
                className={`text-sm ${
                  isActive ? "text-white font-bold" : "text-teal-100 font-medium"
                }`}
              >
                {tab}
              </Text>
              {isActive && (
                <View className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-sm" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SubHeaderTabs;
