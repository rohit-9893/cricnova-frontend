import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * Bottom Navigation Bar Component
 * Exactly 5 tabs: Home | Looking | My Cricket | Community | Store
 * Pure white background, red active state, dark inactive state.
 */
const TABS = [
  {
    key: "Home",
    label: "Home",
    iconType: "ionicons",
    activeIcon: "home",
    inactiveIcon: "home-outline",
  },
  {
    key: "Looking",
    label: "Looking",
    iconType: "mci",
    activeIcon: "binoculars",
    inactiveIcon: "binoculars",
  },
  {
    key: "My Cricket",
    label: "My Cricket",
    iconType: "mci",
    activeIcon: "cricket",
    inactiveIcon: "cricket",
  },
  {
    key: "Community",
    label: "Community",
    iconType: "ionicons",
    activeIcon: "people",
    inactiveIcon: "people-outline",
  },
  {
    key: "Store",
    label: "Store",
    iconType: "ionicons",
    activeIcon: "bag-handle",
    inactiveIcon: "bag-handle-outline",
  },
];

const TabItem = ({ tab, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1.08 : 1.0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isActive ? 1.08 : 1.0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [isActive, scaleAnim]);

  const activeColor = "#0D9488"; // Header Teal Brand Color
  const inactiveColor = "#334155"; // Dark Slate / Near-black

  const iconColor = isActive ? activeColor : inactiveColor;
  const iconName = isActive ? tab.activeIcon : tab.inactiveIcon;

  return (
    <TouchableOpacity
      style={styles.tabButton}
      activeOpacity={0.75}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={tab.label}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tab.iconType === "mci" ? (
          <MaterialCommunityIcons name={iconName} size={25} color={iconColor} />
        ) : (
          <Ionicons name={iconName} size={25} color={iconColor} />
        )}
      </Animated.View>

      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={[
          styles.tabLabel,
          {
            color: iconColor,
            fontWeight: isActive ? "700" : "500",
          },
        ]}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
};

const BottomTabBar = ({ activeTab = "Home", onTabPress, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === "ios" ? 10 : 4);

  const handlePress = (tab) => {
    if (onTabPress) {
      onTabPress(tab.key);
    }

    if (navigation && navigation.navigate) {
      switch (tab.key) {
        case "Home":
          navigation.navigate("Home");
          break;
        case "Looking":
          navigation.navigate("Search");
          break;
        case "My Cricket":
          navigation.navigate("MyProfile");
          break;
        case "Community":
          navigation.navigate("Placeholder", { title: "Community" });
          break;
        case "Store":
          navigation.navigate("Placeholder", { title: "Store" });
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: bottomInset }]}>
      <View style={styles.tabBarRow}>
        {TABS.map((tab) => (
          <TabItem
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onPress={() => handlePress(tab)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 6,
  },
  tabBarRow: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  tabButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
});

export default BottomTabBar;
