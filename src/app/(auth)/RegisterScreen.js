import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { setItem } from "../../utils/storage";

import useRegisterFlow, { AVATAR_STICKERS } from "../../hooks/useRegisterFlow";

const GENDER_OPTIONS = ["Male", "Female", "Prefer, not to say"];

const RegisterScreen = ({ navigation, route }) => {
  const mobileNumber = route.params?.mobileNumber || "+91 98930 00000";

  const {
    currentStep,
    setCurrentStep,
    fullName,
    setFullName,
    city,
    setCity,
    dobDay,
    setDobDay,
    dobMonth,
    setDobMonth,
    dobYear,
    setDobYear,
    gender,
    setGender,
    selectedSticker,
    setSelectedSticker,
    keyboardMarginAnim,
    getInitials,
    handleNextStep1,
    handleNextStep2,
    handleNextStep3,
    handleNextStep4,
    handleDoneStep5,
    handleLetTheGamesBegin,
  } = useRegisterFlow(navigation, mobileNumber);

  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState(false);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleBackPress = () => {
    if (currentStep === 6) {
      setCurrentStep(5);
    } else if (isPhotoEditorOpen) {
      setIsPhotoEditorOpen(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleDayChange = (text) => {
    setDobDay(text);
    if (text.length === 2 && monthRef.current) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = (text) => {
    setDobMonth(text);
    if (text.length === 2 && yearRef.current) {
      yearRef.current.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F0FB]">
      <StatusBar barStyle="dark-content" backgroundColor="#F5F0FB" />

      {/* Dismiss Keyboard when tapping outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* Top Navigation Header Row (Hidden on Step 6 for clean Welcome Screen) */}
          {currentStep < 6 && (
            <View className="h-14 flex-row items-center justify-between px-4">
              <TouchableOpacity
                className="w-10 h-10 rounded-full justify-center items-center"
                activeOpacity={0.7}
                onPress={handleBackPress}
              >
                <Ionicons name="arrow-back" size={24} color="#0F172A" />
              </TouchableOpacity>

              {/* Skip button visible on Step 5 */}
              {currentStep === 5 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleDoneStep5}
                  className="px-3 py-1"
                >
                  <Text className="text-slate-600 text-sm font-bold">Skip</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              className="px-6 pb-8"
            >
              {/* Main Content Area */}
              <View className="mt-auto mb-6">
                {currentStep === 1 ? (
                  /* STEP 1: Tell us your full name */
                  <View>
                    <Text className="text-2xl font-bold text-slate-900 mb-2">
                      Tell us your full name
                    </Text>
                    <View className="w-12 h-1 bg-[#0D9488] rounded-full mb-8" />

                    <View className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 shadow-xs">
                      <TextInput
                        className="text-base text-slate-900 font-medium p-0"
                        placeholder="Rahul Sharma"
                        placeholderTextColor="#94A3B8"
                        value={fullName}
                        onChangeText={setFullName}
                        autoFocus={true}
                      />
                    </View>
                  </View>
                ) : currentStep === 2 ? (
                  /* STEP 2: Where do you live? */
                  <View>
                    <Text className="text-2xl font-bold text-slate-900 mb-2">
                      Where do you live?
                    </Text>
                    <View className="w-12 h-1 bg-[#0D9488] rounded-full mb-8" />

                    <View className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 shadow-xs">
                      <TextInput
                        className="text-base text-slate-900 font-medium p-0"
                        placeholder="Enter your city"
                        placeholderTextColor="#94A3B8"
                        value={city}
                        onChangeText={setCity}
                        autoFocus={true}
                      />
                    </View>
                  </View>
                ) : currentStep === 3 ? (
                  /* STEP 3: When can we wish you happy birthday */
                  <View>
                    <Text className="text-2xl font-bold text-slate-900 mb-2">
                      When can we wish you happy birthday
                    </Text>
                    <View className="w-12 h-1 bg-[#0D9488] rounded-full mb-8" />

                    {/* 3 Box Inline DOB Input (DD / MM / YYYY) */}
                    <View className="w-full bg-white border border-slate-300 rounded-xl p-3 flex-row items-center justify-between shadow-xs">
                      <TextInput
                        className="w-16 text-center text-base font-bold text-slate-900 p-1"
                        placeholder="DD"
                        placeholderTextColor="#94A3B8"
                        keyboardType="number-pad"
                        maxLength={2}
                        value={dobDay}
                        onChangeText={handleDayChange}
                        autoFocus={true}
                      />
                      <Text className="text-slate-300 text-lg font-bold">/</Text>
                      <TextInput
                        ref={monthRef}
                        className="w-16 text-center text-base font-bold text-slate-900 p-1"
                        placeholder="MM"
                        placeholderTextColor="#94A3B8"
                        keyboardType="number-pad"
                        maxLength={2}
                        value={dobMonth}
                        onChangeText={handleMonthChange}
                      />
                      <Text className="text-slate-300 text-lg font-bold">/</Text>
                      <TextInput
                        ref={yearRef}
                        className="w-24 text-center text-base font-bold text-slate-900 p-1"
                        placeholder="YYYY"
                        placeholderTextColor="#94A3B8"
                        keyboardType="number-pad"
                        maxLength={4}
                        value={dobYear}
                        onChangeText={setDobYear}
                      />
                    </View>
                  </View>
                ) : currentStep === 4 ? (
                  /* STEP 4: Select your gender */
                  <View>
                    <Text className="text-2xl font-bold text-slate-900 mb-2">
                      Select your gender
                    </Text>
                    <View className="w-12 h-1 bg-[#0D9488] rounded-full mb-8" />

                    {/* Gender Option Cards */}
                    <View className="space-y-3">
                      {GENDER_OPTIONS.map((option) => {
                        const isSelected = gender === option;
                        return (
                          <TouchableOpacity
                            key={option}
                            className={`w-full h-14 rounded-xl border px-5 flex-row items-center justify-between shadow-xs mb-3 ${
                              isSelected
                                ? "bg-white border-[#0D9488] border-2"
                                : "bg-white border-slate-300"
                            }`}
                            activeOpacity={0.8}
                            onPress={() => setGender(option)}
                          >
                            <Text
                              className={`text-base font-bold ${
                                isSelected ? "text-[#0D9488]" : "text-slate-700"
                              }`}
                            >
                              {option}
                            </Text>
                            {isSelected && (
                              <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color="#0D9488"
                              />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ) : currentStep === 5 ? (
                  !isPhotoEditorOpen ? (
                    /* STEP 5A: Add your profile photo (Initial Upload Screen) */
                    <View className="items-center">
                      <Text className="text-2xl font-bold text-slate-900 mb-1.5 text-center">
                        Add your profile photo
                      </Text>
                      <Text className="text-slate-500 text-sm font-medium mb-6 text-center">
                        Let's make your cricket profile complete with your best photo.
                      </Text>

                      {/* Big Avatar Illustration Container */}
                      <View className="w-56 h-56 rounded-full bg-[#1E293B] justify-center items-center mb-8 shadow-md border-4 border-white overflow-hidden relative">
                        <View className="items-center justify-center">
                          <MaterialCommunityIcons
                            name="cricket"
                            size={80}
                            color="#F8FAFC"
                          />
                          <View className="w-16 h-16 rounded-full bg-[#0D9488] justify-center items-center mt-2 border-2 border-white">
                            <Text className="text-white text-xl font-black">
                              {getInitials(fullName)}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Upload Buttons */}
                      <TouchableOpacity
                        className="w-full h-13 bg-[#00A896] rounded-xl justify-center items-center shadow-md mb-4 active:opacity-90"
                        activeOpacity={0.85}
                        onPress={() => setIsPhotoEditorOpen(true)}
                      >
                        <Text className="text-white text-base font-bold">
                          Upload from gallery
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="py-2"
                        activeOpacity={0.7}
                        onPress={() => setIsPhotoEditorOpen(true)}
                      >
                        <Text className="text-[#00A896] text-base font-bold underline">
                          Take a selfie
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    /* STEP 5B: Avatar & Stickers Editor Screen */
                    <View className="items-center">
                      <Text className="text-2xl font-bold text-slate-900 mb-1 text-center">
                        Add your profile photo
                      </Text>
                      <Text className="text-slate-500 text-xs font-medium mb-6 text-center">
                        Let's make your cricket profile complete with your best photo.
                      </Text>

                      {/* Large Sticker Avatar Badge Preview */}
                      <View
                        className="w-64 h-64 rounded-full justify-center items-center mb-6 shadow-xl border-4 border-white relative overflow-hidden"
                        style={{ backgroundColor: selectedSticker.bg }}
                      >
                        <MaterialCommunityIcons
                          name={selectedSticker.icon}
                          size={110}
                          color="#FFFFFF"
                        />
                        <View className="absolute bottom-4 bg-slate-900/80 px-3 py-1 rounded-full border border-white/40">
                          <Text className="text-white text-xs font-black">
                            {getInitials(fullName)}
                          </Text>
                        </View>
                      </View>

                      {/* Stickers Pill Label */}
                      <View className="bg-white border border-slate-300 px-4 py-1 rounded-full mb-4 shadow-xs">
                        <Text className="text-slate-700 text-xs font-bold">Stickers</Text>
                      </View>

                      {/* Row of Cricket Avatar Stickers */}
                      <View className="flex-row items-center justify-center space-x-3 mb-6">
                        {AVATAR_STICKERS.map((sticker) => {
                          const isSelected = selectedSticker.id === sticker.id;
                          return (
                            <TouchableOpacity
                              key={sticker.id}
                              className={`w-16 h-16 rounded-full justify-center items-center border-2 ${
                                isSelected
                                  ? "border-white scale-110 shadow-md border-3"
                                  : "border-transparent opacity-80"
                              }`}
                              style={{ backgroundColor: sticker.bg }}
                              activeOpacity={0.8}
                              onPress={() => setSelectedSticker(sticker)}
                            >
                              <MaterialCommunityIcons
                                name={sticker.icon}
                                size={28}
                                color="#FFFFFF"
                              />
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      {/* Bottom Done Button */}
                      <TouchableOpacity
                        className="w-full h-13 bg-[#00A896] rounded-xl justify-center items-center shadow-md active:opacity-90"
                        activeOpacity={0.85}
                        onPress={handleDoneStep5}
                      >
                        <Text className="text-white text-base font-bold">Done</Text>
                      </TouchableOpacity>
                    </View>
                  )
                ) : (
                  /* STEP 6: Welcome Screen */
                  <View className="items-center pt-8">
                    {/* User Selected Avatar Badge */}
                    <View
                      className="w-56 h-56 rounded-full justify-center items-center mb-6 shadow-2xl border-4 border-white overflow-hidden"
                      style={{ backgroundColor: selectedSticker.bg }}
                    >
                      <MaterialCommunityIcons
                        name={selectedSticker.icon}
                        size={100}
                        color="#FFFFFF"
                      />
                    </View>

                    {/* Welcome Subtitle */}
                    <Text className="text-slate-500 text-sm font-semibold mb-1">
                      Welcome
                    </Text>

                    {/* Dynamic User Full Name */}
                    <Text className="text-2xl font-black text-slate-900 mb-2 text-center">
                      {fullName || "kartavy jat"}
                    </Text>
                    <View className="w-10 h-1 bg-slate-400 rounded-full mb-6" />

                    {/* Tagline Heading */}
                    <Text className="text-lg font-bold text-slate-800 text-center mb-1">
                      In our world, your cricket matters
                    </Text>

                    {/* Subtitle Message */}
                    <Text className="text-slate-500 text-xs font-medium text-center px-4 leading-5 mb-8">
                      It's time to celebrate the spirit of cricket{"\n"}and make your mark.
                    </Text>

                    {/* Bottom Action Button ("Let the games begin") */}
                    <TouchableOpacity
                      className="w-full h-13 bg-[#00A896] rounded-xl justify-center items-center shadow-md active:opacity-90"
                      activeOpacity={0.85}
                      onPress={handleLetTheGamesBegin}
                    >
                      <Text className="text-white text-base font-bold">
                        Let the games begin
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Fixed Bottom Action Button for Steps 1-4 with Animated Keyboard Shift */}
              {currentStep < 5 && (
                <Animated.View style={{ marginBottom: keyboardMarginAnim }}>
                  <TouchableOpacity
                    className="w-full h-13 bg-[#00A896] rounded-xl justify-center items-center shadow-md active:opacity-90"
                    activeOpacity={0.85}
                    onPress={
                      currentStep === 1
                        ? handleNextStep1
                        : currentStep === 2
                        ? handleNextStep2
                        : currentStep === 3
                        ? handleNextStep3
                        : handleNextStep4
                    }
                  >
                    <Text className="text-white text-base font-bold">Next</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;
