import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./TeamCard.styles";

const TeamCard = ({
  teamName,
  avatarColor = "#9333EA",
  avatarInitials = "CS",
  location = "Indore",
  captainName = "Player",
  onPress,
  onQrPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Team Circle Avatar */}
      <View style={[styles.avatarCircle, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{avatarInitials}</Text>
      </View>

      {/* Team Info Details */}
      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{teamName}</Text>
        <View style={styles.metaRow}>
          {/* Location */}
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color="#94A3B8" style={styles.metaIcon} />
            <Text style={styles.metaText}>{location}</Text>
          </View>

          {/* Captain */}
          <View style={styles.metaItem}>
            <View style={styles.captainBadge}>
              <Text style={styles.captainBadgeText}>C</Text>
            </View>
            <Text style={styles.metaText}>{captainName}</Text>
          </View>
        </View>
      </View>

      {/* Right QR Icon */}
      <TouchableOpacity
        style={styles.qrIconBtn}
        activeOpacity={0.7}
        onPress={onQrPress}
      >
        <Ionicons name="qr-code-outline" size={24} color="#0D9488" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TeamCard;
