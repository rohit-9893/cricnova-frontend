import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./SubHeaderTabs.styles";

const SubHeaderTabs = ({ tabs = [], activeTab, onTabPress }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            style={styles.tabItem}
            onPress={() => onTabPress && onTabPress(tab)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
            {isActive && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SubHeaderTabs;
