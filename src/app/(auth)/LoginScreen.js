import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../../components/ui/GradientBackground";
import AuthCard from "../../components/auth/AuthCard";
import CountryPickerModal from "../../components/ui/CountryPickerModal";

const LoginScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "IN",
    flag: "🇮🇳",
  });
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Rich Golden-Blue Linear Gradient Background */}
      <GradientBackground
        colors={["#0A192F", "#172A45", "#9B7B1D", "#C59B27"]}
        locations={[0, 0.45, 0.85, 1]}
      >
        <SafeAreaView className="flex-1 justify-between items-center py-6 px-4">
          {/* Top Filler for Centering */}
          <View className="h-4" />

          {/* Central Floating White Auth Card */}
          <AuthCard
            countryName={selectedCountry.name}
            countryCode={selectedCountry.code}
            onCountryPress={() => setIsCountryModalVisible(true)}
            onWhatsAppPress={() => navigation && navigation.navigate && navigation.navigate("Home")}
            onMobilePress={() => navigation && navigation.navigate && navigation.navigate("Home")}
          />

          {/* Bottom Explore as a Guest Link */}
          <TouchableOpacity
            className="mb-6 py-2"
            activeOpacity={0.8}
            onPress={() => navigation && navigation.navigate && navigation.navigate("GuestCity")}
          >
            <Text className="text-white text-base font-extrabold underline tracking-wide">
              Explore as a guest
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </GradientBackground>

      {/* Country Selection Modal */}
      <CountryPickerModal
        visible={isCountryModalVisible}
        onClose={() => setIsCountryModalVisible(false)}
        onSelectCountry={(country) =>
          setSelectedCountry({
            name: country.name,
            code: country.code || "IN",
            flag: country.flag,
          })
        }
      />
    </View>
  );
};

export default LoginScreen;
