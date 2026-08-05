import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SidebarDrawer from "../../components/ui/SidebarDrawer";

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("For you");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D32F2F" translucent={false} />

      {/* Red Top Header Wrapper (Covers Status Bar & Notch with Red #D32F2F) */}
      <View style={[styles.redHeaderWrapper, { paddingTop: insets.top }]}>
        <View style={styles.topHeader}>
          {/* Left Section: Menu, Logo, PRO Badge */}
          <View style={styles.headerLeft}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconButton}
              onPress={() => setIsSidebarOpen(true)}
            >
              <Ionicons name="menu" size={26} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.logoBadge}>
              <MaterialCommunityIcons name="cricket" size={22} color="#FFFFFF" />
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.proBadge}>
              <Text style={styles.proText}>PRO @ ₹199</Text>
            </TouchableOpacity>
          </View>

          {/* Right Section: Search, Chat, Notification */}
          <View style={styles.headerRight}>
            <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
              <Ionicons name="chatbubble-ellipses-outline" size={21} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* White Sub-Header Tabs Bar */}
      <View style={styles.tabsContainer}>
        {/* Tab 1: For You */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => setActiveTab("For you")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "For you" && styles.activeTabText,
            ]}
          >
            For you
          </Text>
          {activeTab === "For you" && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>

        {/* Tab 2: PRO Club */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => setActiveTab("PRO Club")}
        >
          <View style={styles.proClubContainer}>
            <View style={styles.greenProPill}>
              <Text style={styles.greenProText}>PRO</Text>
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === "PRO Club" && styles.activeTabText,
              ]}
            >
              Club
            </Text>
          </View>
          {activeTab === "PRO Club" && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Main Content Body (Blank for now) */}
      <View style={styles.bodyContent} />

      {/* Animated Sidebar Drawer */}
      <SidebarDrawer
        navigation={navigation}
        visible={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  redHeaderWrapper: {
    backgroundColor: "#D32F2F",
    width: "100%",
  },
  topHeader: {
    height: 56,
    backgroundColor: "#D32F2F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
    position: "relative",
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  proBadge: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 4,
  },
  proText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#10B981",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  tabsContainer: {
    height: 48,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#475569",
  },
  activeTabText: {
    color: "#0F172A",
    fontWeight: "bold",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#D32F2F",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  proClubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenProPill: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 5,
  },
  greenProText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  bodyContent: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
