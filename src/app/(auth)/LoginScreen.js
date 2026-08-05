import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import CountryPickerModal from "../../components/ui/CountryPickerModal";

const LoginScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    flag: "🇮🇳",
  });
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Decorative top background curve */}
      <View className="absolute -top-24 -left-12 -right-12 h-90 bg-slate-100 rounded-b-[300px]" style={{ height: 360 }} />

      <View className="flex-1 justify-between px-6 pt-10 pb-6">
        {/* Top Logo Section */}
        <View className="items-center mt-6">
          <View className="mb-2">
            <View className="w-20 h-20 rounded-full bg-red-600 justify-center items-center shadow-lg">
              <MaterialCommunityIcons name="cricket" size={44} color="#FFFFFF" />
            </View>
          </View>
          <Text className="text-3xl font-semibold text-slate-900 tracking-tight">
            Cric<Text className="text-red-600 font-bold">Novas</Text>
            <Text className="text-xs text-red-600 font-bold">™</Text>
          </Text>
          <Text className="text-sm text-slate-500 italic mt-0.5">Your cricket matters</Text>
          <View className="w-9 h-0.5 bg-slate-400 rounded mt-4" />
        </View>

        {/* Bottom Auth Section */}
        <View className="w-full items-center">
          {/* Country Selector */}
          <TouchableOpacity
            className="w-full h-12 bg-slate-100 border border-slate-300 rounded-lg flex-row items-center justify-between px-4 mb-4"
            activeOpacity={0.7}
            onPress={() => setIsCountryModalVisible(true)}
          >
            <View className="flex-row items-center">
              <Text className="text-xl mr-2">{selectedCountry.flag}</Text>
              <Text className="text-base font-medium text-slate-900">{selectedCountry.name}</Text>
            </View>
            <Ionicons name="caret-down-sharp" size={14} color="#334155" />
          </TouchableOpacity>

          {/* Divider with text */}
          <View className="flex-row items-center w-full mb-4">
            <View className="flex-1 h-px bg-slate-300" />
            <Text className="mx-3 text-slate-500 text-xs">Login with</Text>
            <View className="flex-1 h-px bg-slate-300" />
          </View>

          {/* WhatsApp Button */}
          <TouchableOpacity className="w-full h-12 bg-brand-teal rounded-lg flex-row justify-center items-center mb-3 shadow-sm" activeOpacity={0.8}>
            <FontAwesome name="whatsapp" size={22} color="#FFFFFF" />
            <Text className="text-white text-base font-semibold ml-2">WhatsApp</Text>
          </TouchableOpacity>

          {/* Mobile Number Button */}
          <TouchableOpacity
            className="w-full h-12 bg-slate-50 border border-slate-400 rounded-lg flex-row justify-center items-center mb-6"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="phone-portrait-outline" size={20} color="#1E293B" />
            <Text className="text-slate-900 text-base font-semibold ml-2">Mobile number</Text>
          </TouchableOpacity>

          {/* Terms and Privacy Footer */}
          <Text className="text-xs text-slate-500 text-center leading-4 px-2 mb-4">
            By signing in, you agree to our{" "}
            <Text className="underline">terms of service</Text> and{" "}
            <Text className="underline">privacy policy</Text>.
          </Text>

          {/* Explore as a Guest */}
          <TouchableOpacity
            className="py-1"
            activeOpacity={0.7}
            onPress={() => navigation.navigate("GuestCity")}
          >
            <Text className="text-base font-semibold text-brand-teal underline">Explore as a guest</Text>
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

export default LoginScreen;
