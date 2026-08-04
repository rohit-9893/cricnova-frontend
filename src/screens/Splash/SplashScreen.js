import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // 1. Entrance animation (Fade & Scale in)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(textSlideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Pulse animation for cricket ball icon
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // 3. Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2400,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && navigation && navigation.replace) {
        navigation.replace("Login");
      }
    });

    return () => {
      pulseLoop.stop();
    };
  }, [fadeAnim, scaleAnim, textSlideAnim, pulseAnim, progressAnim, navigation]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B132B" />

      {/* Stadium Light Glow Background Circles */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Animated Badge & Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Outer Pulsing Glow */}
          <Animated.View
            style={[
              styles.pulseGlow,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />

          {/* Center Cricket Emblem */}
          <View style={styles.emblemCircle}>
            <MaterialCommunityIcons name="cricket" size={54} color="#FFFFFF" />
          </View>
        </Animated.View>

        {/* Animated App Title & Subtitle */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: textSlideAnim }],
            },
          ]}
        >
          <Text style={styles.appTitle}>
            CRIC<Text style={styles.titleHighlight}>NOVAS</Text>
          </Text>
          <View style={styles.taglineBadge}>
            <Ionicons name="trophy-outline" size={14} color="#F59E0B" style={styles.trophyIcon} />
            <Text style={styles.taglineText}>LIVE SCORES • TOURNAMENTS • STATS</Text>
          </View>
        </Animated.View>

        {/* Loading Progress Section */}
        <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
          <View style={styles.loadingInfo}>
            <Text style={styles.loadingText}>Initializing Cricket Arena...</Text>
          </View>

          {/* Progress Track */}
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>

          {/* Skip Button for quick testing */}
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation && navigation.replace("Login")}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip directly to Login →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B132B",
  },
  glowTopRight: {
    position: "absolute",
    top: -120,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(16, 185, 129, 0.15)",
  },
  glowBottomLeft: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(220, 38, 38, 0.15)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  pulseGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(220, 38, 38, 0.3)",
  },
  emblemCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  appTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  titleHighlight: {
    color: "#EF4444",
  },
  taglineBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  trophyIcon: {
    marginRight: 6,
  },
  taglineText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  bottomSection: {
    width: "100%",
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingInfo: {
    marginBottom: 10,
  },
  loadingText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "500",
  },
  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#DC2626",
    borderRadius: 3,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
});
