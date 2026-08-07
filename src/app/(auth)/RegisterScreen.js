import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { setItem } from "../../utils/storage";

const AVATAR_COLORS = [
  "#0D9488", "#9333EA", "#1D4ED8", "#F43F5E",
  "#D97706", "#059669", "#7C3AED", "#DC2626"
];

const ROLES = ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"];
const BATTING_STYLES = ["Right-Hand Bat", "Left-Hand Bat"];
const BOWLING_STYLES = [
  "Right-Arm Fast",
  "Right-Arm Spin",
  "Left-Arm Fast",
  "Left-Arm Spin",
  "None",
];

const RegisterScreen = ({ navigation, route }) => {
  const mobileNumber = route.params?.mobileNumber || "+91 98930 00000";

  // Form State
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [playingRole, setPlayingRole] = useState("Batsman");
  const [battingStyle, setBattingStyle] = useState("Right-Hand Bat");
  const [bowlingStyle, setBowlingStyle] = useState("Right-Arm Fast");
  const [avatarColor, setAvatarColor] = useState("#0D9488");

  // Get Initials for Avatar Preview
  const getInitials = (name) => {
    if (!name.trim()) return "CN";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      Alert.alert("Required Field", "Please enter your full name.");
      return;
    }
    if (!city.trim()) {
      Alert.alert("Required Field", "Please enter your city / town.");
      return;
    }

    const userProfile = {
      fullName: fullName.trim(),
      mobileNumber: mobileNumber,
      city: city.trim(),
      playingRole: playingRole,
      battingStyle: battingStyle,
      bowlingStyle: bowlingStyle,
      avatarColor: avatarColor,
      avatarInitials: getInitials(fullName),
      isRegistered: true,
    };

    try {
      await setItem("user-profile", JSON.stringify(userProfile));
    } catch (e) {
      console.warn("[REGISTER SAVE STORAGE ERROR]:", e);
    }

    Alert.alert(
      "Profile Setup Complete! 🎉",
      `Welcome to CricNovas, ${fullName.trim()}!`,
      [
        {
          text: "Start Exploring 🏏",
          onPress: () =>
            navigation && navigation.replace && navigation.replace("Home"),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Top Header Row */}
      <View className="h-14 flex-row items-center justify-between px-4">
        <TouchableOpacity
          className="w-10 h-10 rounded-full justify-center items-center"
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View className="bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          <Text className="text-emerald-800 text-xs font-extrabold">
            Step 2 of 2 • Setup Profile
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 110 }}
        >
          {/* Section Heading */}
          <View className="mt-2 mb-6">
            <Text className="text-2xl font-black text-slate-900 mb-1">
              Setup Your Player Profile 🏏
            </Text>
            <View className="w-10 h-1 bg-[#0D9488] rounded-full mb-2" />
            <Text className="text-slate-500 text-xs font-semibold">
              Enter your personal details to personalize your CricNovas stats.
            </Text>
          </View>

          {/* Avatar Circle Preview & Color Picker */}
          <View className="w-full bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs mb-6 items-center">
            <View className="relative mb-4">
              <View
                className="w-20 h-20 rounded-full justify-center items-center shadow-md border-2 border-white"
                style={{ backgroundColor: avatarColor }}
              >
                <Text className="text-white text-2xl font-black">
                  {getInitials(fullName)}
                </Text>
              </View>
              <View className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-slate-900 justify-center items-center border border-white">
                <Ionicons name="camera" size={12} color="#FFFFFF" />
              </View>
            </View>

            <Text className="text-slate-600 text-xs font-bold mb-2">
              Choose Avatar Theme Color:
            </Text>

            <View className="flex-row flex-wrap justify-center space-x-2">
              {AVATAR_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  className={`w-7 h-7 rounded-full justify-center items-center mr-2 mb-1 border ${
                    avatarColor === color ? "border-slate-900 scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onPress={() => setAvatarColor(color)}
                >
                  {avatarColor === color && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Form Card */}
          <View className="w-full bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4 mb-6">
            {/* Full Name Input */}
            <View className="mb-4">
              <Text className="text-slate-800 text-xs font-extrabold mb-1.5">
                Full Name *
              </Text>
              <TextInput
                className="w-full h-12 bg-slate-50 border border-slate-300 rounded-xl px-4 text-base font-bold text-slate-900"
                placeholder="Enter your full name"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* City / Town Input */}
            <View className="mb-4">
              <Text className="text-slate-800 text-xs font-extrabold mb-1.5">
                City / Town *
              </Text>
              <TextInput
                className="w-full h-12 bg-slate-50 border border-slate-300 rounded-xl px-4 text-base font-bold text-slate-900"
                placeholder="e.g. Indore, Mumbai, Delhi"
                placeholderTextColor="#94A3B8"
                value={city}
                onChangeText={setCity}
              />
            </View>

            {/* Registered Mobile Number (Disabled/Read-only) */}
            <View className="mb-4">
              <Text className="text-slate-800 text-xs font-extrabold mb-1.5">
                Mobile Number
              </Text>
              <View className="w-full h-12 bg-slate-100 border border-slate-200 rounded-xl px-4 justify-center">
                <Text className="text-base font-bold text-slate-500">
                  {mobileNumber} (Verified ✓)
                </Text>
              </View>
            </View>

            {/* Primary Playing Role */}
            <View className="mb-4">
              <Text className="text-slate-800 text-xs font-extrabold mb-2">
                Primary Playing Role
              </Text>
              <View className="flex-row flex-wrap">
                {ROLES.map((role) => (
                  <TouchableOpacity
                    key={role}
                    className={`px-3.5 py-2 rounded-xl border mr-2 mb-2 ${
                      playingRole === role
                        ? "bg-[#0D9488] border-[#0D9488]"
                        : "bg-slate-50 border-slate-300"
                    }`}
                    onPress={() => setPlayingRole(role)}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        playingRole === role ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Batting Style */}
            <View className="mb-4">
              <Text className="text-slate-800 text-xs font-extrabold mb-2">
                Batting Style
              </Text>
              <View className="flex-row flex-wrap">
                {BATTING_STYLES.map((style) => (
                  <TouchableOpacity
                    key={style}
                    className={`px-3.5 py-2 rounded-xl border mr-2 mb-2 ${
                      battingStyle === style
                        ? "bg-[#0D9488] border-[#0D9488]"
                        : "bg-slate-50 border-slate-300"
                    }`}
                    onPress={() => setBattingStyle(style)}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        battingStyle === style ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {style}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bowling Style */}
            <View>
              <Text className="text-slate-800 text-xs font-extrabold mb-2">
                Bowling Style
              </Text>
              <View className="flex-row flex-wrap">
                {BOWLING_STYLES.map((style) => (
                  <TouchableOpacity
                    key={style}
                    className={`px-3.5 py-2 rounded-xl border mr-2 mb-2 ${
                      bowlingStyle === style
                        ? "bg-[#0D9488] border-[#0D9488]"
                        : "bg-slate-50 border-slate-300"
                    }`}
                    onPress={() => setBowlingStyle(style)}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        bowlingStyle === style ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {style}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Action Button ("Complete Profile & Start 🏏") */}
          <TouchableOpacity
            className="w-full h-13 bg-[#0D9488] rounded-xl justify-center items-center shadow-md shadow-teal-500/20"
            activeOpacity={0.85}
            onPress={handleSaveProfile}
          >
            <Text className="text-white text-base font-extrabold">
              Complete Profile & Start 🏏
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
