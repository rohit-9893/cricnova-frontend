import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AuthCard from "../../components/auth/AuthCard";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import { getDefaultCountry } from "../../utils/countryDetector";

const LoginScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry());
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-[#FDFBF5]">
      {/* Template 4: Dual-Tone Split Background (Left: Richer Sage Green ~55%, Right: Warm Cream) */}
      <LinearGradient
        colors={["#CDE6D4", "#D5EADA", "#FAF6E9", "#FDFBF5"]}
        locations={[0, 0.55, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.1 }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <SafeAreaView className="flex-1 justify-between items-center py-6 px-4">
        <StatusBar barStyle="dark-content" backgroundColor="#CDE6D4" />

        {/* Top Filler for Centering */}
        <View className="h-4" />

        {/* Central Floating White Auth Card (100% Unchanged) */}
        <AuthCard
          countryName={selectedCountry.name}
          countryFlag={selectedCountry.flag}
          onCountryPress={() => setIsCountryModalVisible(true)}
          onWhatsAppPress={() =>
            navigation && navigation.navigate && navigation.navigate("MobileInput")
          }
          onMobilePress={() =>
            navigation && navigation.navigate && navigation.navigate("MobileInput")
          }
        />

        {/* Bottom Explore as a Guest Link */}
        <TouchableOpacity
          className="mb-6 py-2"
          activeOpacity={0.8}
          onPress={() =>
            navigation && navigation.navigate && navigation.navigate("GuestCity")
          }
        >
          <Text className="text-[#0D9488] text-base font-extrabold underline tracking-wide">
            Explore as a guest
          </Text>
        </TouchableOpacity>

        {/* Country Selection Modal */}
        <CountryPickerModal
          visible={isCountryModalVisible}
          onClose={() => setIsCountryModalVisible(false)}
          onSelectCountry={(country) =>
            setSelectedCountry({
              name: country.name,
              code: country.code || "IN",
              dialCode: country.dialCode || "+91",
              flag: country.flag,
            })
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
