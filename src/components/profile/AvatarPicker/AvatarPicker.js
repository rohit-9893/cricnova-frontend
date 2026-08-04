import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./AvatarPicker.styles";

const AvatarPicker = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circleContainer}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Ionicons name="person" size={60} color="#CBD5E1" />
        <View style={styles.cameraBadge}>
          <Ionicons name="camera" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={styles.label}>Change photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;
