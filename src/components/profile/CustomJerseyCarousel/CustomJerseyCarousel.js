import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CustomJerseyCarousel.styles";

const JERSEYS = [
  {
    id: "blue",
    bgColorStyle: null,
    textColor: "#FFFFFF",
    nameText: "ROHIT PANCHAL",
    numberText: "72",
  },
  {
    id: "gold",
    bgColorStyle: styles.jerseyGraphicBoxGold,
    textColor: "#FFFFFF",
    nameText: "ROHIT PANCHAL",
    numberText: "72",
  },
  {
    id: "white",
    bgColorStyle: styles.jerseyGraphicBoxWhite,
    textColor: "#FFFFFF",
    nameText: "ROHIT PANCHAL",
    numberText: "72",
  },
];

const CustomJerseyCarousel = ({
  userName = "Rohit Panchal",
  onItemPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {userName}, get top sellers at an extra 20% off.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {JERSEYS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.jerseyCard}
            activeOpacity={0.8}
            onPress={() => onItemPress && onItemPress(item)}
          >
            {/* Custom Printed Jersey Vector Graphic Box */}
            <View style={[styles.jerseyGraphicBox, item.bgColorStyle]}>
              <Ionicons name="shirt-outline" size={48} color={item.textColor} />
              <Text style={[styles.jerseyBackText, { color: item.textColor }]}>
                {item.nameText}
              </Text>
              <Text style={[styles.jerseyNumberText, { color: item.textColor }]}>
                {item.numberText}
              </Text>
            </View>

            {/* Bottom Get it Now Link */}
            <View style={styles.getNowRow}>
              <Text style={styles.getNowText}>Get it now</Text>
              <Ionicons name="arrow-forward" size={16} color="#0D9488" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomJerseyCarousel;
