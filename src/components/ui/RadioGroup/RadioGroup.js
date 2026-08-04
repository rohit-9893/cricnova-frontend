import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RadioGroup.styles";

const RadioGroup = ({ options = [], selectedValue, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selectedValue === option;
        return (
          <TouchableOpacity
            key={option}
            style={styles.radioItem}
            activeOpacity={0.8}
            onPress={() => onSelect && onSelect(option)}
          >
            <View
              style={[
                styles.radioOuter,
                isSelected && styles.radioOuterSelected,
              ]}
            >
              {isSelected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.label}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioGroup;
