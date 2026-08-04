import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ProfileSettingsList.styles";

const SETTINGS_ITEMS = [
  { id: "notifications", title: "Edit notification preferences" },
  { id: "language", title: "Change language" },
  { id: "purchases", title: "Purchase history" },
];

const ProfileSettingsList = ({
  appVersion = "Version 1.0.0 (490)",
  onItemPress,
  onLogoutPress,
  onClearDataPress,
  onDeleteAccountPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Settings Navigation Items */}
      {SETTINGS_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItemRow}
          activeOpacity={0.7}
          onPress={() => onItemPress && onItemPress(item)}
        >
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Ionicons
            name="chevron-forward-circle-outline"
            size={20}
            color="#94A3B8"
          />
        </TouchableOpacity>
      ))}

      {/* Logout & Clear Data Outline Buttons Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.outlineBtn}
          activeOpacity={0.7}
          onPress={onLogoutPress}
        >
          <Text style={styles.outlineBtnText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineBtn}
          activeOpacity={0.7}
          onPress={onClearDataPress}
        >
          <Text style={styles.outlineBtnText}>Clear data</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Account Link */}
      <TouchableOpacity
        style={styles.deleteLinkBtn}
        activeOpacity={0.7}
        onPress={onDeleteAccountPress}
      >
        <Text style={styles.deleteLinkText}>Delete Account</Text>
      </TouchableOpacity>

      {/* App Version Info Text */}
      <Text style={styles.versionText}>{appVersion}</Text>
    </View>
  );
};

export default ProfileSettingsList;
