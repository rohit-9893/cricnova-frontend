import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TeamSelectorCard = ({
  title,
  avatarInitials,
  avatarColor,
  onPress,
  isAnimated = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const auraAnim = useRef(new Animated.Value(1)).current;
  const auraOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (!isAnimated) return;

    const animationLoop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(auraAnim, {
            toValue: 1.35,
            duration: 750,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(auraAnim, {
            toValue: 1,
            duration: 750,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(auraOpacity, {
            toValue: 0.1,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.timing(auraOpacity, {
            toValue: 0.6,
            duration: 750,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animationLoop.start();
    return () => animationLoop.stop();
  }, [isAnimated, pulseAnim, auraAnim, auraOpacity]);

  return (
    <View className="items-center my-3">
      <View className="w-24 h-24 justify-center items-center relative mb-4">
        {isAnimated && (
          <Animated.View
            className="absolute w-24 h-24 rounded-full bg-teal-500/30"
            style={[
              {
                transform: [{ scale: auraAnim }],
                opacity: auraOpacity,
              },
            ]}
          />
        )}

        <Animated.View
          className={`w-20 h-20 rounded-full justify-center items-center shadow-lg ${
            isAnimated ? "bg-brand-teal shadow-teal-500/40" : "bg-slate-700"
          }`}
          style={[
            avatarColor ? { backgroundColor: avatarColor, borderWidth: 2, borderColor: "#FFFFFF" } : null,
            isAnimated ? { transform: [{ scale: pulseAnim }] } : null,
          ]}
        >
          <TouchableOpacity
            className="w-full h-full justify-center items-center"
            activeOpacity={0.8}
            onPress={onPress}
          >
            {avatarInitials ? (
              <Text className="text-white text-2xl font-black tracking-wider">{avatarInitials}</Text>
            ) : (
              <Ionicons name="add" size={38} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      <TouchableOpacity
        className="px-5 py-2.5 rounded-full bg-slate-100 border border-slate-200"
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text className="text-slate-800 text-sm font-bold">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamSelectorCard;
