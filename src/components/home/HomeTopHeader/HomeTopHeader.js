import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HomeTopHeader = ({
  onMenuPress,
  onProPress,
  onSearchPress,
  onChatPress,
  onNotificationPress,
  notificationCount = 2,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor: "#0D9488", paddingTop: insets.top }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D9488" translucent />
      <View style={styles.container}>
        {/* LEFT: Hamburger Menu + Cricket Logo Badge */}
        <View style={styles.leftGroup}>
          <TouchableOpacity
            style={styles.iconTouchable}
            activeOpacity={0.7}
            onPress={onMenuPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="menu" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.logoBadge}>
            <MaterialCommunityIcons name="cricket" size={22} color="#0D9488" />
          </View>
        </View>

        {/* CENTER: Outlined PRO Pill Button */}
        <TouchableOpacity
          style={styles.proPill}
          activeOpacity={0.8}
          onPress={onProPress}
        >
          <Text style={styles.proPillText}>PRO @ ₹199</Text>
        </TouchableOpacity>

        {/* RIGHT: Search + Chat + Notification Bell with Badge */}
        <View style={styles.rightGroup}>
          <TouchableOpacity
            style={styles.iconTouchable}
            activeOpacity={0.7}
            onPress={onSearchPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="search" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconTouchable}
            activeOpacity={0.7}
            onPress={onChatPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chatbox-ellipses-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bellTouchable}
            activeOpacity={0.7}
            onPress={onNotificationPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="notifications-outline" size={23} color="#FFFFFF" />
            {notificationCount > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeTopHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 58,
    backgroundColor: "#0D9488",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconTouchable: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  proPill: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  proPillText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  bellTouchable: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeCount: {
    position: "absolute",
    top: -5,
    right: -6,
    backgroundColor: "#F59E0B",
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: "#0D9488",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
});
