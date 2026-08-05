import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RadioGroup = ({ options = [], selectedValue, onSelect }) => {
  return (
    <View className="flex-row items-center my-4 flex-wrap">
      {options.map((option) => {
        const isSelected = selectedValue === option;
        return (
          <TouchableOpacity
            key={option}
            className="flex-row items-center mr-5 mb-2"
            activeOpacity={0.8}
            onPress={() => onSelect && onSelect(option)}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 justify-center items-center mr-2 ${
                isSelected ? "border-brand-teal" : "border-slate-400"
              }`}
            >
              {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-brand-teal" />}
            </View>
            <Text className="text-base text-slate-800">{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioGroup;
