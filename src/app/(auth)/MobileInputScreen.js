import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Keyboard,
  Animated,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import { sendOtp } from "../../services/authService";

const MobileInputScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "+91",
    flag: "🇮🇳",
  });
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Button Disabled State
  const isValidNumber = mobileNumber.trim().length === 10;

  // Animated Value for smooth bottom margin when keyboard opens/closes
  const keyboardMarginAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardMarginAnim, {
        toValue: e.endCoordinates ? e.endCoordinates.height : 280,
        duration: Platform.OS === "ios" ? e.duration || 250 : 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      Animated.timing(keyboardMarginAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardMarginAnim]);

  const handleSendOtp = async () => {
    if (!isValidNumber || isLoading) return;
    const fullMobile = `${selectedCountry.code} ${mobileNumber.trim()}`;

    setIsLoading(true);
    try {
      await sendOtp(fullMobile);
    } catch (err) {
      console.warn("[SEND OTP API NOTICE]:", err?.message || err);
    } finally {
      setIsLoading(false);
      navigation.navigate("OtpVerify", {
        mobileNumber: fullMobile,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* Top Header Row with Back Button */}
          <View className="h-14 flex-row items-center px-4">
            <TouchableOpacity
              className="w-10 h-10 rounded-full justify-center items-center"
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#0F172A" />
            </TouchableOpacity>
          </View>

          {/* Main Layout */}
          <View className="flex-1 justify-between px-6 pb-6">
            {/* Top Branding Banner */}
            <View className="justify-center items-center my-4">
              <View className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 justify-center items-center shadow-xs mb-3">
                <MaterialCommunityIcons name="cricket" size={40} color="#0D9488" />
              </View>
              <Text className="text-2xl font-black text-slate-900 tracking-tight">
                Cric<Text className="text-[#0D9488]">Novas</Text>
              </Text>
              <Text className="text-slate-500 text-xs font-semibold mt-1">
                Arena Scoring & Live Commentary
              </Text>
            </View>

            {/* Bottom Form Card */}
            <Animated.View
              className="w-full mt-auto"
              style={{ marginBottom: keyboardMarginAnim }}
            >
              {/* Heading */}
              <Text className="text-xl font-black text-slate-900 mb-1">
                Enter your mobile number
              </Text>
              <View className="w-8 h-1 bg-[#0D9488] rounded-full mb-6" />

              {/* Input Row */}
              <View className="flex-row items-center space-x-3 mb-6">
                {/* Country Flag & Code Button */}
                <TouchableOpacity
                  className="h-14 px-3.5 bg-white rounded-xl border border-slate-300 flex-row items-center justify-center shadow-xs mr-2"
                  activeOpacity={0.8}
                  onPress={() => setIsCountryModalVisible(true)}
                >
                  <Text className="text-xl mr-1.5">{selectedCountry.flag}</Text>
                  <Text className="text-base font-bold text-slate-800">
                    {selectedCountry.code}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#64748B" />
                </TouchableOpacity>

                {/* Mobile Number TextInput */}
                <View className="flex-1 h-14 bg-white rounded-xl border border-slate-300 px-4 justify-center shadow-xs">
                  <TextInput
                    className="text-lg font-bold text-slate-900 p-0"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                    placeholder="0000000000"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>

              {/* Dynamic Action Button ("Send OTP →") */}
              <TouchableOpacity
                disabled={!isValidNumber}
                className={`w-full h-13 rounded-xl justify-center items-center shadow-md ${
                  isValidNumber
                    ? "bg-[#0D9488] shadow-teal-500/20"
                    : "bg-slate-300 opacity-60"
                }`}
                activeOpacity={isValidNumber ? 0.85 : 1}
                onPress={handleSendOtp}
              >
                <Text className="text-white text-base font-extrabold">
                  {isValidNumber ? "Send OTP →" : "Enter 10-digit number"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Country Selection Modal */}
      <CountryPickerModal
        visible={isCountryModalVisible}
        onClose={() => setIsCountryModalVisible(false)}
        onSelectCountry={(country) =>
          setSelectedCountry({
            name: country.name,
            code: country.dialCode || "+91",
            flag: country.flag,
          })
        }
      />
    </SafeAreaView>
  );
};

export default MobileInputScreen;
