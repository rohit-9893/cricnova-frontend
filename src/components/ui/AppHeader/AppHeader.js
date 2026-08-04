import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./AppHeader.styles";

const AppHeader = ({
  title,
  onBackPress,
  rightComponent,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.redHeaderWrapper, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#D32F2F" translucent={false} />
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          {onBackPress && (
            <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBackPress}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
      </View>
    </View>
  );
};

export default AppHeader;
