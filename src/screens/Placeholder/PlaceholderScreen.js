import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const PlaceholderScreen = ({ navigation, route }) => {
  const title = route.params?.title || "Page";
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D32F2F" translucent={false} />

      {/* Red Top Header Wrapper (Exact Same Red Header as Home Page) */}
      <View style={[styles.redHeaderWrapper, { paddingTop: insets.top }]}>
        <View style={styles.topHeader}>
          {/* Left Section: Back Arrow & Screen Title */}
          <View style={styles.headerLeft}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.headerTitleText} numberOfLines={1}>
              {title}
            </Text>
          </View>

          {/* Right Section: Search, Chat, Notification (Exact Same Icons as Home) */}
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

      {/* Blank Page Content Body */}
      <View style={styles.blankContent} />
    </View>
  );
};

export default PlaceholderScreen;

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
    flex: 1,
  },
  iconButton: {
    padding: 6,
    position: "relative",
  },
  headerTitleText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
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
  blankContent: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
