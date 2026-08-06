import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthCard from "../../components/auth/AuthCard";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import { getDefaultCountry } from "../../utils/countryDetector";

const LoginScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry());
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-between items-center py-6 px-4">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Top Filler for Centering */}
      <View className="h-4" />

      {/* Central Floating White Auth Card */}
      <AuthCard
        countryName={selectedCountry.name}
        countryFlag={selectedCountry.flag}
        onCountryPress={() => setIsCountryModalVisible(true)}
        onWhatsAppPress={() => navigation && navigation.navigate && navigation.navigate("MobileInput")}
        onMobilePress={() => navigation && navigation.navigate && navigation.navigate("MobileInput")}
      />

      {/* Bottom Explore as a Guest Link */}
      <TouchableOpacity
        className="mb-6 py-2"
        activeOpacity={0.8}
        onPress={() => navigation && navigation.navigate && navigation.navigate("GuestCity")}
      >
        <Text className="text-[#10B981] text-base font-extrabold underline tracking-wide">
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
  );
};

export default LoginScreen;
