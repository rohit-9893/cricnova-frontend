import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const AppHeader = ({ title, onBackPress, rightComponent, backgroundColor = "#0D9488" }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor, paddingTop: insets.top }} className="w-full">
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} translucent={true} />
      <View style={{ backgroundColor }} className="h-14 flex-row items-center justify-between px-3">
        <View className="flex-row items-center flex-1">
          {onBackPress && (
            <TouchableOpacity className="p-1 mr-2" activeOpacity={0.7} onPress={onBackPress}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <Text className="text-white text-lg font-bold" numberOfLines={1}>
            {title}
          </Text>
        </View>

        {rightComponent && <View className="flex-row items-center">{rightComponent}</View>}
      </View>
    </View>
  );
};

export default AppHeader;
