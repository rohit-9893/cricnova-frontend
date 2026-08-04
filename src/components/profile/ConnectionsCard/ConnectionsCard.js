import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ConnectionsCard.styles";

const AVATAR_BG_COLORS = ["#0D9488", "#1E293B", "#D97706", "#475569", "#2563EB"];

const ConnectionsCard = ({ onFindCricketersPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Connections</Text>

      {/* Overlapping Player Avatars Row */}
      <View style={styles.avatarsRow}>
        {AVATAR_BG_COLORS.map((color, index) => (
          <View
            key={index}
            style={[styles.avatarItem, { backgroundColor: color }]}
          >
            <Ionicons name="person" size={32} color="#CBD5E1" />
          </View>
        ))}
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Connect with cricketers to challenge, motivate & inspire each other.
      </Text>

      {/* Find Cricketers Link */}
      <TouchableOpacity
        style={styles.findCricketersBtn}
        activeOpacity={0.7}
        onPress={onFindCricketersPress}
      >
        <Text style={styles.findCricketersText}>Find Cricketers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionsCard;
