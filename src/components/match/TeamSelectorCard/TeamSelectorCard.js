import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./TeamSelectorCard.styles";

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
    <View style={styles.teamBlock}>
      <View style={styles.circleContainer}>
        {isAnimated && (
          <Animated.View
            style={[
              styles.pulsingAuraRing,
              {
                transform: [{ scale: auraAnim }],
                opacity: auraOpacity,
              },
            ]}
          />
        )}

        <Animated.View
          style={[
            styles.teamCircle,
            avatarColor && { backgroundColor: avatarColor, borderWidth: 2, borderColor: "#FFFFFF" },
            isAnimated && styles.teamCircleActive,
            isAnimated ? { transform: [{ scale: pulseAnim }] } : null,
          ]}
        >
          <TouchableOpacity
            style={styles.teamCircleTouch}
            activeOpacity={0.8}
            onPress={onPress}
          >
            {avatarInitials ? (
              <Text style={styles.avatarInitialsText}>{avatarInitials}</Text>
            ) : (
              <Ionicons name="add" size={38} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      <TouchableOpacity
        style={styles.selectTeamBtn}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text style={styles.selectTeamBtnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamSelectorCard;
