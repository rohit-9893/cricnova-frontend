import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  PanResponder,
  BackHandler,
  Easing,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import useAuthStore from "../../../store/useAuthStore";

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

const SidebarDrawer = ({ visible, onClose, navigation, user: propsUser = {} }) => {
  const storeUser = useAuthStore((state) => state.user) || {};
  const activeUser = Object.keys(storeUser).length > 0 ? storeUser : propsUser;

  const displayName = activeUser.fullName || `${activeUser.firstName || ""} ${activeUser.lastName || ""}`.trim() || activeUser.name || "Cricket Player";
  const displayPhone = activeUser.mobileNumber || activeUser.phone || "Logged In";
  const avatarBg = activeUser.avatarColor || "#C59B27";
  const avatarText =
    activeUser.avatarInitials ||
    (displayName !== "Cricket Player" ? displayName.substring(0, 2).toUpperCase() : "CN");

  // Real-time Dynamic Profile Completion Percentage Calculator
  const calcProfileCompletion = (u) => {
    if (!u) return 0;
    const fields = [
      u.fullName || u.name,
      u.city || u.location,
      u.gender,
      u.dateOfBirth || u.dob,
      u.email,
      u.mobileNumber || u.phone,
      u.playingRole,
      u.battingStyle,
      u.bowlingStyle,
    ];
    const filled = fields.filter(
      (f) => f && String(f).trim() !== "" && f !== "None" && f !== "Prefer not to say"
    ).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPercent = calcProfileCompletion(activeUser);
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
        } else if (item.id === "add_tournament") {
          navigation.navigate("CreateTournament");
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
          35,
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
      <View className="flex-1">
        <StatusBar barStyle="light-content" backgroundColor="#143D2B" translucent={false} />

        {/* Fullscreen Backdrop Overlay (Closes drawer when tapped outside) */}
        <TouchableOpacity
          activeOpacity={1}
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          onPress={() => handleSmoothClose()}
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                opacity: fadeAnim,
              },
            ]}
          />
        </TouchableOpacity>

        {/* Sliding Drawer Container */}
        <Animated.View
          {...panResponder.panHandlers}
          className="absolute left-0 bottom-0 bg-white shadow-2xl elevation-xl"
          style={[
            {
              width: DRAWER_WIDTH,
              top: insets.top,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View
            className="flex-1 bg-white"
            onStartShouldSetResponder={() => true}
          >
              {/* Profile Top Header Section (Option 1: Deep Harmonious Brand Teal) */}
              <View className="bg-[#085E56] p-4 border-b border-teal-700/40 shadow-md">
                <View className="flex-row items-center mb-3.5">
                  {/* User Avatar Circle (Vibrant Teal with Gold Accent Ring) */}
                  <View className="relative mr-3.5">
                    <View
                      className="w-14 h-14 rounded-full justify-center items-center border-2 border-[#C59B27] shadow-md overflow-hidden bg-[#0D9488]"
                    >
                      {activeUser.profileImageUrl || activeUser.profilePhoto || activeUser.photo || activeUser.avatarUrl ? (
                        <Image
                          source={{
                            uri:
                              activeUser.profileImageUrl ||
                              activeUser.profilePhoto ||
                              activeUser.photo ||
                              activeUser.avatarUrl,
                          }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      ) : (
                        <Text className="text-white text-lg font-black tracking-wider">{avatarText}</Text>
                      )}
                    </View>
                  </View>

                  {/* User Info Details */}
                  <View className="flex-1">
                    <Text className="text-white text-lg font-black tracking-wide mb-0.5" numberOfLines={1}>
                      {displayName}
                    </Text>
                    <Text className="text-slate-400 text-xs font-medium mb-1.5">
                      {displayPhone}
                    </Text>
                    <View className="border border-teal-500/40 bg-teal-500/15 rounded-full px-2.5 py-0.5 self-start">
                      <Text className="text-[#5EEAD4] text-[10px] font-black tracking-wider uppercase">
                        {activeUser.isPro ? "PRO User" : "Free User"}
                      </Text>
                    </View>
                  </View>

                  {/* Profile Forward Arrow Button */}
                  <TouchableOpacity
                    className="p-1.5 bg-slate-800/80 rounded-full border border-slate-700"
                    activeOpacity={0.7}
                    onPress={() => handleItemPress({ title: "My Profile" })}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="#C59B27"
                    />
                  </TouchableOpacity>
                </View>

                {/* Profile Completion Progress Bar (Teal & Gold Styling) */}
                <View className="flex-row items-center mt-1 pt-1.5 border-t border-slate-800/80">
                  <View className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden mr-2.5">
                    <View
                      className="h-full bg-[#0D9488] rounded-full"
                      style={{ width: `${completionPercent}%` }}
                    />
                  </View>
                  <Text className="text-[#C59B27] text-xs font-black">
                    {completionPercent}%
                  </Text>
                </View>
              </View>

              {/* Menu Items List with NativeWind Styling */}
              <ScrollView
                className="flex-1 bg-white"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
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
                        className={`flex-row items-center px-4 py-3.5 border-b border-slate-100 ${
                          index === 0 ? "border-b-2 border-slate-200 bg-teal-50/40" : ""
                        }`}
                        activeOpacity={0.7}
                        onPress={() => handleItemPress(item)}
                      >
                        {/* Left Icon */}
                        <View className="w-8 items-center mr-3">
                          <Ionicons
                            name={item.icon}
                            size={21}
                            color={index === 0 ? "#0D9488" : "#475569"}
                          />
                        </View>

                        {/* Title */}
                        <Text
                          className={`flex-1 text-sm ${
                            index === 0 ? "font-bold text-brand-teal" : "font-medium text-slate-800"
                          }`}
                        >
                          {item.title}
                        </Text>

                        {/* Right Badge if present */}
                        {item.badge && (
                          <View
                            className={`px-2 py-0.5 rounded-full ${
                              item.badge === "Free" ? "bg-slate-500" : "bg-transparent"
                            }`}
                          >
                            <Text className="text-white text-[10px] font-bold">{item.badge}</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </ScrollView>
            </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SidebarDrawer;
