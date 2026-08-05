import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

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
    <View className="mb-5">
      {label && <Text className="text-xs text-slate-500 mb-1">{label}</Text>}
      <View className="flex-row items-center border-b border-slate-300 pb-2">
        {prefix && <Text className="text-base text-slate-800 font-medium mr-2">{prefix}</Text>}
        <TextInput
          className="flex-1 text-base text-slate-900 font-medium p-0"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          keyboardType={keyboardType}
        />
        {rightIcon && (
          <TouchableOpacity
            className="pl-2"
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
