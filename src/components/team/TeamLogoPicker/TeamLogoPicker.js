import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./TeamLogoPicker.styles";

const TeamLogoPicker = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circleContainer}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Ionicons name="shield-checkmark-outline" size={42} color="#94A3B8" style={styles.shieldIcon} />
        <View style={styles.addBanner}>
          <Text style={styles.addBannerText}>Add</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>Team logo</Text>
    </View>
  );
};

export default TeamLogoPicker;
