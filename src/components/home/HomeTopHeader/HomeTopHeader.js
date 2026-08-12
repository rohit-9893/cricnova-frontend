import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HomeTopHeader = ({
  onMenuPress,
  onProPress,
  onSearchPress,
  onChatPress,
  onNotificationPress,
  notificationCount = 2,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }} className="w-full bg-[#0D9488]">
      <StatusBar barStyle="light-content" backgroundColor="#0D9488" translucent={true} />

      <View className="w-full h-14 bg-[#0D9488] flex-row items-center justify-between px-3.5 shadow-md">
        {/* LEFT: Hamburger Menu + Cricket Logo + Left-Aligned PRO Pill Button */}
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className="p-1 justify-center items-center"
            activeOpacity={0.7}
            onPress={onMenuPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="menu" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <View className="w-8 h-8 rounded-full bg-white justify-center items-center shadow-xs">
            <MaterialCommunityIcons name="cricket" size={20} color="#0D9488" />
          </View>

          {/* Sleek Glassmorphism PRO Pill Button */}
          <TouchableOpacity
            className="bg-teal-900/40 border border-white/50 rounded-full px-3 py-1 ml-1.5 active:bg-teal-900/60 shadow-xs"
            activeOpacity={0.8}
            onPress={onProPress}
          >
            <Text className="text-white text-[11px] font-black tracking-wider">
              PRO @ ₹199
            </Text>
          </TouchableOpacity>
        </View>

        {/* RIGHT: Search + Chat + Notification Bell with Badge */}
        <View className="flex-row items-center gap-3.5">
          <TouchableOpacity
            className="p-1 justify-center items-center"
            activeOpacity={0.7}
            onPress={onSearchPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="search" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="p-1 justify-center items-center"
            activeOpacity={0.7}
            onPress={onChatPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chatbox-ellipses-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="relative p-1 justify-center items-center"
            activeOpacity={0.7}
            onPress={onNotificationPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="notifications-outline" size={23} color="#FFFFFF" />
            {notificationCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-amber-500 min-w-[17px] h-[17px] rounded-full justify-center items-center px-1 border border-[#0D9488]">
                <Text className="text-white text-[9px] font-black leading-none">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeTopHeader;
