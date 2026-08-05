import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OnboardingSlide from "../components/onboarding/OnboardingSlide";
import { getItem, setItem } from "../utils/storage";

const { width } = Dimensions.get("window");

const ONBOARDING_STEPS = [
  {
    id: "step_1",
    badge: "FREE LIVE SCORING",
    title: "Live Ball-by-Ball\nScoring Arena",
    description:
      "Score local cricket matches for free with professional ball-by-ball insights, wagon wheels, and instant commentary.",
    iconType: "material",
    iconName: "cricket",
    cardBg: "#D32F2F",
  },
  {
    id: "step_2",
    badge: "LEAGUES & TOURNAMENTS",
    title: "Manage Leagues &\nTournaments",
    description:
      "Create tournaments, generate automated fixtures, points tables, net run rates, and tournament leaderboards.",
    iconType: "ionicons",
    iconName: "trophy-outline",
    cardBg: "#0D9488",
  },
  {
    id: "step_3",
    badge: "CRICKET PROFILES",
    title: "Personalized Player\nCareer Stats",
    description:
      "Track your batting & bowling career stats, print custom jerseys with your name, and earn CricNovas PRO badges.",
    iconType: "ionicons",
    iconName: "shirt-outline",
    cardBg: "#1E293B",
  },
];

export default function IndexScreen({ navigation }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const done = await getItem("onboarding-done");
        if (done === "true" && navigation && navigation.replace) {
          navigation.replace("Splash");
          return;
        }
      } catch (err) {
        console.log("Onboarding check error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstTime();
  }, [navigation]);

  const handleNext = async () => {
    if (stepIndex < ONBOARDING_STEPS.length - 1) {
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      await setItem("onboarding-done", "true");
      if (navigation && navigation.replace) {
        navigation.replace("Splash");
      }
    }
  };

  const handleSkip = async () => {
    await setItem("onboarding-done", "true");
    if (navigation && navigation.replace) {
      navigation.replace("Splash");
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    if (currentIndex !== stepIndex && currentIndex >= 0 && currentIndex < ONBOARDING_STEPS.length) {
      setStepIndex(currentIndex);
    }
  };

  if (isLoading) return null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Top Header Bar */}
      <View className="h-14 flex-row items-center justify-between px-5">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-red-600 justify-center items-center mr-2">
            <MaterialCommunityIcons name="cricket" size={20} color="#FFFFFF" />
          </View>
          <Text className="text-xl font-bold text-slate-900">
            Cric<Text className="text-red-600">Novas</Text>
          </Text>
        </View>

        <TouchableOpacity
          className="px-3 py-1.5"
          activeOpacity={0.7}
          onPress={handleSkip}
        >
          <Text className="text-base font-bold text-brand-teal">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Center Swipable Slides Carousel */}
      <View className="flex-1 justify-center items-center">
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_STEPS}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => <OnboardingSlide item={item} />}
        />
      </View>

      {/* Bottom Step Indicator Dots & CTA Button */}
      <View className="px-6 pb-7 items-center">
        {/* Animated Dots Row */}
        <View className="flex-row items-center mb-5">
          {ONBOARDING_STEPS.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full mx-1 ${
                stepIndex === i ? "w-6 bg-brand-teal" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </View>

        {/* CTA Next / Get Started Button */}
        <TouchableOpacity
          className="w-full h-12 bg-brand-teal rounded-lg justify-center items-center shadow-lg shadow-teal-500/30"
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text className="text-white text-base font-bold">
            {stepIndex < ONBOARDING_STEPS.length - 1 ? "Next →" : "Get Started 🏏"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
