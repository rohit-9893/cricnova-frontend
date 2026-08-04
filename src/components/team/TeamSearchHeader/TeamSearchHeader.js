import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./TeamSearchHeader.styles";

const TeamSearchHeader = ({
  searchQuery,
  onSearchChange,
  onAddTeamPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Quick Search Input */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Quick search"
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {/* Add Team Teal Button */}
      <TouchableOpacity
        style={styles.addTeamBtn}
        activeOpacity={0.8}
        onPress={onAddTeamPress}
      >
        <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" style={styles.addIcon} />
        <Text style={styles.addTeamText}>Add team</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamSearchHeader;
