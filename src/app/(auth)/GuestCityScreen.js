import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import { getDefaultCountry } from "../../utils/countryDetector";

const GuestCityScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry());
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [city, setCity] = useState("");

  const handleContinue = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Decorative Top Background Curve */}
      <View className="absolute -top-20 -left-10 -right-10 h-96 bg-slate-100 rounded-b-[280px]" />

      {/* Header Back Button */}
      <View className="px-5 pt-3 z-10">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-start"
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Content Container */}
      <View className="flex-1 justify-end px-6 pb-8">
        <View className="w-full">
          {/* Heading */}
          <Text className="text-xl font-bold text-slate-900 leading-7">
            Tell us your city to personalise your experience.
          </Text>
          <View className="w-8 h-1 bg-[#0D9488] rounded-full mt-2 mb-6" />

          {/* Country Selector */}
          <TouchableOpacity
            className="w-full h-13 bg-slate-100 border border-slate-300 rounded-xl flex-row items-center justify-between px-4 mb-4"
            activeOpacity={0.7}
            onPress={() => setIsCountryModalVisible(true)}
          >
            <View className="flex-row items-center">
              <Text className="text-xl mr-2.5">{selectedCountry.flag}</Text>
              <Text className="text-base font-semibold text-slate-900">
                {selectedCountry.name}
              </Text>
            </View>
            <Ionicons name="caret-down-sharp" size={14} color="#334155" />
          </TouchableOpacity>

          {/* City Input */}
          <View className="w-full h-13 bg-slate-100 border border-slate-300 rounded-xl justify-center px-4 mb-6">
            <TextInput
              className="text-base font-semibold text-slate-900 p-0"
              placeholder="Enter your city"
              placeholderTextColor="#94A3B8"
              value={city}
              onChangeText={setCity}
            />
          </View>

          {/* Modern Premium Elevated CTA Button */}
          <TouchableOpacity
            className="w-full h-14 bg-[#0D9488] rounded-2xl justify-center items-center shadow-xl shadow-teal-500/30 border border-teal-400/40"
            activeOpacity={0.85}
            onPress={handleContinue}
          >
            <Text className="text-white text-base font-black tracking-wider">Continue ➔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Country Selection Modal */}
      <CountryPickerModal
        visible={isCountryModalVisible}
        onClose={() => setIsCountryModalVisible(false)}
        onSelectCountry={(country) => setSelectedCountry(country)}
      />
    </SafeAreaView>
  );
};

export default GuestCityScreen;
