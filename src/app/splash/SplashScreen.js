import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

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
    <SafeAreaView className="flex-1 bg-[#0B132B]">
      <StatusBar barStyle="light-content" backgroundColor="#0B132B" />

      {/* Stadium Light Glow Background Circles */}
      <View className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-emerald-500/15" />
      <View className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-red-600/15" />

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Animated Badge & Logo */}
        <Animated.View
          className="justify-center items-center mb-7"
          style={[
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Outer Pulsing Glow */}
          <Animated.View
            className="absolute w-28 h-28 rounded-full bg-red-600/30"
            style={[
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />

          {/* Center Cricket Emblem */}
          <View className="w-24 h-24 rounded-full bg-red-600 justify-center items-center shadow-2xl border-2 border-white/30">
            <MaterialCommunityIcons name="cricket" size={54} color="#FFFFFF" />
          </View>
        </Animated.View>

        {/* Animated App Title & Subtitle */}
        <Animated.View
          className="items-center mb-12"
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: textSlideAnim }],
            },
          ]}
        >
          <Text className="text-4xl font-black text-white tracking-widest">
            CRIC<Text className="text-red-500">NOVAS</Text>
          </Text>
          <View className="flex-row items-center bg-white/10 px-3.5 py-1.5 rounded-full mt-3 border border-white/15">
            <Ionicons name="trophy-outline" size={14} color="#F59E0B" />
            <Text className="text-slate-400 text-[11px] font-bold tracking-wider ml-1.5">
              LIVE SCORES • TOURNAMENTS • STATS
            </Text>
          </View>
        </Animated.View>

        {/* Loading Progress Section */}
        <Animated.View className="w-full absolute bottom-12 items-center px-5" style={[{ opacity: fadeAnim }]}>
          <View className="mb-2.5">
            <Text className="text-slate-400 text-xs font-medium">Initializing Cricket Arena...</Text>
          </View>

          {/* Progress Track */}
          <View className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-5">
            <Animated.View className="h-full bg-red-600 rounded-full" style={[{ width: progressWidth }]} />
          </View>

          {/* Skip Button for quick testing */}
          <TouchableOpacity
            className="py-1.5 px-3"
            onPress={() => navigation && navigation.replace("Login")}
            activeOpacity={0.7}
          >
            <Text className="text-slate-500 text-xs font-semibold">Skip directly to Login →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
