import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  PanResponder,
  BackHandler,
  Easing,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.82;

const MENU_ITEMS = [
  { id: "pro", title: "PRO at ₹199 (No autopay)", icon: "ribbon-outline", badge: null },
  { id: "add_tournament", title: "Add a Tournament/Series", icon: "trophy-outline", badge: "Free" },
  { id: "start_match", title: "Start A Match", icon: "disc-outline", badge: "Free" },
  { id: "go_live", title: "Go Live", icon: "videocam-outline", badge: null },
  { id: "my_cricket", title: "My Cricket", icon: "fitness-outline", badge: null },
  { id: "my_performance", title: "My Performance", icon: "bar-chart-outline", badge: null },
  { id: "store", title: "CricNovas Store", icon: "bag-handle-outline", badge: "👕" },
  { id: "leaderboards", title: "Leaderboards", icon: "podium-outline", badge: null },
  { id: "awards", title: "CricNovas Awards", icon: "medal-outline", badge: null },
  { id: "associations", title: "Associations", icon: "git-network-outline", badge: null },
  { id: "clubs", title: "Clubs", icon: "shield-outline", badge: null },
  { id: "contact", title: "Contact", icon: "chatbox-ellipses-outline", badge: null },
  { id: "share", title: "Share the app", icon: "share-social-outline", badge: null },
  { id: "rate", title: "Rate us", icon: "star-outline", badge: null },
  { id: "app_code", title: "App code", icon: "qr-code-outline", badge: null },
];

const SidebarDrawer = ({ visible, onClose, navigation }) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isClosing = useRef(false);
  const insets = useSafeAreaInsets();

  // Staggered animated values for each menu item
  const itemAnims = useRef(MENU_ITEMS.map(() => new Animated.Value(0))).current;

  // Smooth Animated Close Function
  const handleSmoothClose = (onComplete) => {
    if (isClosing.current) return;
    isClosing.current = true;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      isClosing.current = false;
      onClose();
      if (typeof onComplete === "function") {
        onComplete();
      }
    });
  };

  const handleItemPress = (item) => {
    handleSmoothClose(() => {
      if (navigation && navigation.navigate) {
        if (item.id === "start_match") {
          navigation.navigate("SelectPlayingTeams");
        } else if (item.id === "profile" || item.title === "My Profile") {
          navigation.navigate("MyProfile");
        } else {
          navigation.navigate("Placeholder", { title: item.title });
        }
      }
    });
  };

  useEffect(() => {
    const onBackPress = () => {
      if (visible) {
        handleSmoothClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && gestureState.dx < 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40 || gestureState.vx < -0.3) {
          handleSmoothClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
            tension: 40,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      isClosing.current = false;
      slideAnim.setValue(-DRAWER_WIDTH);
      fadeAnim.setValue(0);
      itemAnims.forEach((anim) => anim.setValue(0));

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 360,
          easing: Easing.bezier(0.25, 1, 0.5, 1),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 360,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.stagger(
          35, // 35ms micro-stagger between items
          itemAnims.map((anim) =>
            Animated.timing(anim, {
              toValue: 1,
              duration: 240,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            })
          )
        ),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={() => handleSmoothClose()}
      statusBarTranslucent={false}
    >
      <View style={styles.modalRoot}>
        {/* Force Red Status Bar Across Entire Screen */}
        <StatusBar barStyle="light-content" backgroundColor="#D32F2F" translucent={false} />

        {/* Fullscreen Backdrop Overlay */}
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.backdropTouch}
            activeOpacity={1}
            onPress={() => handleSmoothClose()}
          />
        </Animated.View>

        {/* Sliding Drawer Container */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.drawerContent,
            { top: insets.top, transform: [{ translateX: slideAnim }] },
          ]}
        >
          <TouchableWithoutFeedback>
            <View style={styles.drawerInner}>
              {/* Profile Top Header Section */}
              <View style={styles.profileSection}>
                <View style={styles.profileTopRow}>
                  {/* User Avatar */}
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                      <Ionicons name="person" size={32} color="#CBD5E1" />
                    </View>
                    <View style={styles.addBadge}>
                      <Ionicons name="add" size={12} color="#FFFFFF" />
                    </View>
                  </View>

                  {/* User Info Details */}
                  <View style={styles.userDetails}>
                    <Text style={styles.userName} numberOfLines={1}>
                      Rohit Panchal
                    </Text>
                    <Text style={styles.userPhone}>7224012604</Text>
                    <View style={styles.freeUserBadge}>
                      <Text style={styles.freeUserText}>Free User</Text>
                    </View>
                  </View>

                  {/* Profile Forward Arrow */}
                  <TouchableOpacity
                    style={styles.profileArrowBtn}
                    activeOpacity={0.7}
                    onPress={() => handleItemPress({ title: "My Profile" })}
                  >
                    <Ionicons
                      name="chevron-forward-circle-outline"
                      size={24}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>

                {/* Profile Completion Progress Bar */}
                <View style={styles.progressRow}>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: "75%" }]} />
                  </View>
                  <Text style={styles.progressPercentText}>75%</Text>
                </View>
              </View>

              {/* Menu Items List with Staggered Slide-In Animation */}
              <ScrollView
                style={styles.menuContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.menuScrollContent}
              >
                {MENU_ITEMS.map((item, index) => {
                  const itemTranslateX = itemAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0],
                  });
                  const itemOpacity = itemAnims[index];

                  return (
                    <Animated.View
                      key={item.id}
                      style={{
                        opacity: itemOpacity,
                        transform: [{ translateX: itemTranslateX }],
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.menuItemRow,
                          index === 0 && styles.firstMenuItemBorder,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handleItemPress(item)}
                      >
                        {/* Left Icon */}
                        <View style={styles.menuIconContainer}>
                          <Ionicons name={item.icon} size={22} color="#475569" />
                        </View>

                        {/* Title */}
                        <Text style={styles.menuItemTitle}>{item.title}</Text>

                        {/* Right Badge if present */}
                        {item.badge && (
                          <View
                            style={[
                              styles.badgePill,
                              item.badge === "Free"
                                ? styles.freeBadgePill
                                : styles.shirtBadgePill,
                            ]}
                          >
                            <Text style={styles.badgeText}>{item.badge}</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SidebarDrawer;

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropTouch: {
    width: "100%",
    height: "100%",
  },
  drawerContent: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#2C2C2C",
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 16,
  },
  drawerInner: {
    flex: 1,
    backgroundColor: "#2C2C2C",
  },
  profileSection: {
    backgroundColor: "#2C2C2C",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  profileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#475569",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#94A3B8",
  },
  addBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#0D9488",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#2C2C2C",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 2,
  },
  userPhone: {
    color: "#CBD5E1",
    fontSize: 13,
    marginBottom: 4,
  },
  freeUserBadge: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 1,
    alignSelf: "flex-start",
  },
  freeUserText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
  },
  profileArrowBtn: {
    padding: 4,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00BCD4",
    borderRadius: 2,
  },
  progressPercentText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "500",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  menuScrollContent: {
    paddingBottom: 24,
  },
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  firstMenuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  menuIconContainer: {
    width: 32,
    alignItems: "center",
    marginRight: 12,
  },
  menuItemTitle: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  freeBadgePill: {
    backgroundColor: "#64748B",
  },
  shirtBadgePill: {
    backgroundColor: "transparent",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
