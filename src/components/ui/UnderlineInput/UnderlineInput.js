import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./UnderlineInput.styles";

const UnderlineInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  prefix,
  rightIcon,
  onRightIconPress,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputRow}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          keyboardType={keyboardType}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            activeOpacity={0.7}
            onPress={onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UnderlineInput;
