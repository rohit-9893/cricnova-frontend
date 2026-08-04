import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ProMembershipBanner.styles";

const ProMembershipBanner = ({ onBecomeProPress }) => {
  return (
    <View style={styles.bannerCard}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.verticalIndicator} />
        <Text style={styles.titleText}>PRO Membership</Text>
      </View>

      {/* Price Row */}
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>₹399</Text>
        <Text style={styles.priceUnitText}>/year</Text>
        <Text style={styles.orText}>OR</Text>
        <Text style={styles.priceText}>₹3,999</Text>
        <Text style={styles.priceUnitText}>/lifetime</Text>
      </View>

      {/* Description */}
      <Text style={styles.descText}>
        Access unlimited CricInsights and additional benefits with PRO membership.
      </Text>

      {/* Become A PRO Button */}
      <TouchableOpacity
        style={styles.becomeProBtn}
        activeOpacity={0.85}
        onPress={onBecomeProPress}
      >
        <Text style={styles.becomeProBtnText}>Become A PRO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProMembershipBanner;
