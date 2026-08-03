import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "./Button.styles";
import { Colors } from "../../../theme";

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  children,
  ...props
}) => {
  const isButtonDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isButtonDisabled}
      style={[
        styles.button,
        isButtonDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        children || <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
