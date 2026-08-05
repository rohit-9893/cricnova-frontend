import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

const JERSEYS = [
  {
    id: "blue",
    bgColor: "bg-slate-800",
    textColor: "#FFFFFF",
    nameText: "ROHIT PANCHAL",
    numberText: "72",
  },
  {
    id: "gold",
    bgColor: "bg-amber-600",
    textColor: "#FFFFFF",
    nameText: "ROHIT PANCHAL",
    numberText: "72",
  },
  {
    id: "white",
    bgColor: "bg-slate-400",
    textColor: "#FFFFFF",
    nameText: "ROHIT PANCHAL",
    numberText: "72",
  },
];

const CustomJerseyCarousel = ({
  userName = "",
  onItemPress,
}) => {
  return (
    <View className="py-4 bg-white border-b-8 border-slate-100">
      <Text className="text-sm font-bold text-slate-900 px-4 mb-3">
        {userName}, get top sellers at an extra 20% off.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {JERSEYS.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-slate-50 rounded-xl p-3 mx-1 border border-slate-200 items-center"
            style={{ width: CARD_WIDTH }}
            activeOpacity={0.8}
            onPress={() => onItemPress && onItemPress(item)}
          >
            {/* Custom Printed Jersey Vector Graphic Box */}
            <View className={`w-full h-36 rounded-lg ${item.bgColor} justify-center items-center mb-3 relative overflow-hidden`}>
              <Ionicons name="shirt-outline" size={48} color={item.textColor} />
              <Text className="text-white text-[11px] font-bold tracking-widest text-center mt-1">
                {item.nameText}
              </Text>
              <Text className="text-white text-3xl font-black mt-0.5">
                {item.numberText}
              </Text>
            </View>

            {/* Bottom Get it Now Link */}
            <View className="w-full flex-row items-center justify-between mt-1">
              <Text className="text-brand-teal text-sm font-bold">Get it now</Text>
              <Ionicons name="arrow-forward" size={16} color="#0D9488" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomJerseyCarousel;
