import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated, Easing, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * InternetSnackbar Component
 * Monitors internet connection status in real time and displays an animated
 * top banner notice ("No Internet Connection" / "Back Online").
 */
const InternetSnackbar = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [showOnlineToast, setShowOnlineToast] = useState(false);

  const slideAnim = useRef(new Animated.Value(-80)).current;

  useEffect(() => {
    // NetInfo event listener with fallback state check
    let netInfoSubscription = null;

    try {
      const NetInfo = require("@react-native-community/netinfo");
      if (NetInfo && NetInfo.addEventListener) {
        netInfoSubscription = NetInfo.addEventListener((state) => {
          const offlineState = state.isConnected === false || state.isInternetReachable === false;
          handleConnectionChange(offlineState);
        });
      }
    } catch (e) {
      // NetInfo module fallback handler
      console.log("[NETINFO NOTICE]: NetInfo module optional fallback active.");
    }

    return () => {
      if (netInfoSubscription) netInfoSubscription();
    };
  }, [isOffline]);

  const handleConnectionChange = (offline) => {
    if (offline) {
      setIsOffline(true);
      setWasOffline(true);
      setShowOnlineToast(false);
      animateIn();
    } else if (wasOffline) {
      setIsOffline(false);
      setShowOnlineToast(true);
      animateIn();
      // Hide online toast after 3 seconds
      setTimeout(() => {
        animateOut(() => {
          setShowOnlineToast(false);
          setWasOffline(false);
        });
      }, 3000);
    }
  };

  const animateIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const animateOut = (onComplete) => {
    Animated.timing(slideAnim, {
      toValue: -80,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (onComplete) onComplete();
    });
  };

  if (!isOffline && !showOnlineToast) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        position: "absolute",
        top: 40,
        left: 16,
        right: 16,
        zIndex: 99999,
        elevation: 10,
      }}
    >
      <View
        className={`flex-row items-center justify-between px-4 py-3 rounded-2xl shadow-xl border ${
          isOffline
            ? "bg-rose-950/95 border-rose-600/60 shadow-rose-950/50"
            : "bg-emerald-950/95 border-emerald-500/60 shadow-emerald-950/50"
        }`}
      >
        <View className="flex-row items-center flex-1 mr-2">
          <View
            className={`w-8 h-8 rounded-full justify-center items-center mr-3 ${
              isOffline ? "bg-rose-600/30" : "bg-emerald-500/30"
            }`}
          >
            <Ionicons
              name={isOffline ? "wifi-outline" : "checkmark-circle-outline"}
              size={18}
              color={isOffline ? "#FCA5A5" : "#6EE7B7"}
            />
          </View>

          <View className="flex-1">
            <Text className="text-white text-xs font-black tracking-wide">
              {isOffline ? "No Internet Connection ⚠️" : "Back Online 🎉"}
            </Text>
            <Text className="text-slate-300 text-[10px] font-medium" numberOfLines={1}>
              {isOffline
                ? "Scoring is saved locally & will auto-sync."
                : "Live match scores synced with server."}
            </Text>
          </View>
        </View>

        {isOffline && (
          <TouchableOpacity
            className="bg-rose-800/60 px-2.5 py-1 rounded-lg border border-rose-600/40"
            onPress={() => handleConnectionChange(false)}
          >
            <Text className="text-rose-200 text-[10px] font-bold">Dismiss</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default InternetSnackbar;
