import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BallEventOverlay = ({ eventTag, visible, onDismiss }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    if (visible && eventTag) {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      slideAnim.setValue(-40);

      // Entrance animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss after 1.3 seconds
      const timer = setTimeout(() => {
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          if (onDismiss) onDismiss();
        });
      }, 1300);

      return () => clearTimeout(timer);
    }
  }, [visible, eventTag]);

  if (!visible || !eventTag) return null;

  // Determine styling & text based on event type
  let title = "BOUNDED!";
  let subtitle = "4 RUNS 🔥";
  let bgGradient = "bg-blue-600 border-blue-400";
  let iconName = "cricket";
  let iconColor = "#FFFFFF";

  if (eventTag === "6") {
    title = "HUGE MAXIMUM!";
    subtitle = "666 SIX! 🚀";
    bgGradient = "bg-emerald-600 border-emerald-400";
    iconName = "rocket-launch";
  } else if (eventTag === "W") {
    title = "WICKET FALLS!";
    subtitle = "OUT! 💥";
    bgGradient = "bg-red-600 border-red-400";
    iconName = "close-circle-outline";
  }

  return (
    <Modal transparent visible={visible} animationType="none">
      <View className="flex-1 justify-center items-center bg-black/40 pointer-events-none">
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          }}
          className={`px-8 py-6 rounded-3xl border-4 shadow-2xl items-center justify-center ${bgGradient}`}
        >
          <MaterialCommunityIcons name={iconName} size={54} color={iconColor} />
          <Text className="text-white text-2xl font-black tracking-widest mt-2 text-center uppercase">
            {title}
          </Text>
          <Text className="text-amber-300 text-3xl font-black tracking-wider mt-1 text-center">
            {subtitle}
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BallEventOverlay;
