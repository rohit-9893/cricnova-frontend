import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { verifyOtp, sendOtp } from "../../services/authService";
import useAuthStore from "../../store/useAuthStore";

const OtpVerifyScreen = ({ navigation, route }) => {
  const mobileNumber = route.params?.mobileNumber || "+91 98930 00000";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4 || isLoading) {
      Alert.alert("Invalid OTP", "Please enter the complete 4-digit OTP code.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyOtp(mobileNumber, enteredOtp);

      const token =
        res?.data?.data?.accessToken ||
        res?.data?.accessToken ||
        res?.accessToken ||
        res?.token ||
        res?.data?.token ||
        res?.data?.data?.token;

      const user =
        res?.data?.data?.user ||
        res?.data?.user ||
        res?.user;

      if (token) {
        await useAuthStore.getState().setAuth(token, user);
      }

      // Only navigate on SUCCESSFUL verification
      Alert.alert(
        "OTP Verified! 🎉",
        "Please complete your player profile.",
        [
          {
            text: "Continue to Profile Setup ➔",
            onPress: () =>
              navigation &&
              navigation.navigate &&
              navigation.navigate("Register", { mobileNumber }),
          },
        ]
      );
    } catch (err) {
      console.warn("[VERIFY OTP API ERROR]:", err?.message || err);
      Alert.alert(
        "Verification Failed ❌",
        err?.message || "The OTP you entered is invalid. Please enter the correct OTP code."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(30);
    setOtp(["", "", "", ""]);
    inputRefs[0].current?.focus();
    try {
      await sendOtp(mobileNumber);
    } catch (err) {
      console.warn("[RESEND OTP API NOTICE]:", err?.message || err);
    }
    Alert.alert("OTP Resent", `A new OTP has been sent to ${mobileNumber}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

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

      {/* Keyboard Avoiding Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="px-6 pb-8"
        >
          {/* Main Verification Section */}
          <View className="mt-2">
            <Text className="text-2xl font-black text-slate-900 mb-1">
              Verify OTP
            </Text>
            <View className="w-8 h-1 bg-[#0D9488] rounded-full mb-3" />

            <View className="flex-row items-center flex-wrap mb-8">
              <Text className="text-slate-500 text-sm font-medium">
                Enter 4-digit code sent to{" "}
                <Text className="text-slate-900 font-bold">{mobileNumber}</Text>
              </Text>
              <TouchableOpacity
                className="ml-2"
                onPress={() => navigation.goBack()}
              >
                <Text className="text-[#0D9488] text-xs font-bold underline">
                  Edit number
                </Text>
              </TouchableOpacity>
            </View>

            {/* 4 PIN Box Inputs */}
            <View className="flex-row justify-between mb-8 px-2">
              {otp.map((digit, index) => (
                <View
                  key={index}
                  className={`w-16 h-16 rounded-2xl bg-white border-2 justify-center items-center shadow-xs ${
                    digit ? "border-[#0D9488]" : "border-slate-300"
                  }`}
                >
                  <TextInput
                    ref={inputRefs[index]}
                    className="text-2xl font-black text-slate-900 text-center p-0 w-full h-full"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    selectTextOnFocus
                    autoFocus={index === 0}
                  />
                </View>
              ))}
            </View>

            {/* Resend Timer Text */}
            <View className="items-center">
              {timer > 0 ? (
                <Text className="text-slate-400 text-xs font-semibold">
                  Resend OTP in <Text className="text-[#0D9488] font-bold">{timer}s</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <Text className="text-[#0D9488] text-sm font-bold underline">
                    Resend OTP Code
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Action Button ("Verify & Continue") */}
          <TouchableOpacity
            className={`w-full h-13 rounded-xl justify-center items-center shadow-md mt-auto ${
              otp.join("").length === 4
                ? "bg-[#0D9488] shadow-teal-500/20"
                : "bg-slate-300"
            }`}
            activeOpacity={0.85}
            onPress={handleVerify}
          >
            <Text className="text-white text-base font-extrabold">
              Verify & Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerifyScreen;
