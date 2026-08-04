import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ProfileHeaderCard.styles";

const ProfileHeaderCard = ({
  name = "Rohit Panchal",
  location = "Indore",
  sinceDate = "30-Jul-2026",
  followersCount = 0,
  viewsCount = 1,
  onGoProPress,
  onEditAvatarPress,
  onQrPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Top User Details Row */}
      <View style={styles.topRow}>
        {/* Avatar Circle with Edit Badge */}
        <TouchableOpacity
          style={styles.avatarContainer}
          activeOpacity={0.8}
          onPress={onEditAvatarPress}
        >
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={44} color="#CBD5E1" />
            <View style={styles.editBanner}>
              <Text style={styles.editText}>Edit</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* User Info Details */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{name}</Text>

          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={15} color="#0D9488" style={styles.metaIcon} />
            <Text style={styles.metaText}>{location}</Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={15} color="#94A3B8" style={styles.metaIcon} />
            <Text style={styles.metaText}>Since {sinceDate}</Text>
          </View>
        </View>

        {/* Go PRO Button */}
        <TouchableOpacity
          style={styles.goProBtn}
          activeOpacity={0.8}
          onPress={onGoProPress}
        >
          <Text style={styles.goProText}>Go PRO ›</Text>
        </TouchableOpacity>
      </View>

      {/* Stats / Quick Actions Bar */}
      <View style={styles.statsRow}>
        {/* QR Code Action */}
        <TouchableOpacity style={styles.statCol} activeOpacity={0.7} onPress={onQrPress}>
          <View style={styles.qrIconContainer}>
            <Ionicons name="qr-code-outline" size={22} color="#0D9488" />
          </View>
          <Text style={styles.statLabel}>Your QR code</Text>
        </TouchableOpacity>

        <View style={styles.statDivider} />

        {/* Followers */}
        <View style={styles.statCol}>
          <Text style={styles.statNumber}>{followersCount}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>

        <View style={styles.statDivider} />

        {/* Profile Views */}
        <View style={styles.statCol}>
          <Text style={styles.statNumber}>{viewsCount}</Text>
          <Text style={styles.statLabel}>Profile views</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeaderCard;
