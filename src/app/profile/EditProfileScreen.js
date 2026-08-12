import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import AvatarPicker from "../../components/profile/AvatarPicker";
import UnderlineInput from "../../components/ui/UnderlineInput";
import DropdownInput from "../../components/ui/DropdownInput";
import RadioGroup from "../../components/ui/RadioGroup";
import useAuthStore from "../../store/useAuthStore";

const GENDER_OPTIONS = ["Male", "Female", "Prefer not to say"];

const PLAYING_ROLES = [
  "Batter",
  "Bowler",
  "All-Rounder",
  "Wicket-keeper",
  "None",
];

const BATTING_STYLES = ["Right-hand bat", "Left-hand bat", "None"];

const BOWLING_STYLES = [
  "Right-arm fast",
  "Left-arm fast",
  "Right-arm medium",
  "Left-arm medium",
  "Right-arm Off Break",
  "Slow left-arm orthodox",
  "Right-arm Leg Break",
  "Slow left-arm chinaman",
  "None",
];

// Helper to format ISO timestamp string "2001-03-02T00:00:00.000Z" -> "2001-03-02"
const formatDobString = (rawDob) => {
  if (!rawDob) return "";
  const str = String(rawDob).trim();
  if (str.includes("T")) {
    return str.split("T")[0];
  }
  return str;
};

const EditProfileScreen = ({ navigation }) => {
  const user = useAuthStore((state) => state.user) || {};
  const updateProfileApi = useAuthStore((state) => state.updateProfileApi);
  const uploadPhotoApi = useAuthStore((state) => state.uploadPhotoApi);

  // Form State prefilled from Store with clean formatted values
  const [playerName, setPlayerName] = useState(user.fullName || user.name || "");
  const [location, setLocation] = useState(user.city || user.location || "");
  const [dob, setDob] = useState(formatDobString(user.dateOfBirth || user.dob));
  const [email, setEmail] = useState(user.email || "");
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || user.phone || "");
  const [playingRole, setPlayingRole] = useState(user.playingRole || "All-Rounder");
  const [battingStyle, setBattingStyle] = useState(user.battingStyle || "Right-hand bat");
  const [bowlingStyle, setBowlingStyle] = useState(user.bowlingStyle || "Right-arm fast");
  const [gender, setGender] = useState(user.gender || "Male");
  const [bio, setBio] = useState(user.bio || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Photo Upload Handler via expo-image-picker
  const handlePickPhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Please allow access to your photo library to change your profile picture.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const selectedUri = result.assets[0].uri;
        setIsUploadingPhoto(true);
        try {
          await uploadPhotoApi(selectedUri);
          Alert.alert("Photo Updated 🎉", "Your profile photo has been updated successfully!");
        } catch (err) {
          console.warn("[PHOTO UPLOAD ERROR]:", err);
          Alert.alert("Notice", "Profile photo updated locally.");
        } finally {
          setIsUploadingPhoto(false);
        }
      }
    } catch (err) {
      console.warn("[IMAGE PICKER ERROR]:", err);
    }
  };

  const handleUpdate = async () => {
    if (!location.trim()) {
      Alert.alert("Required Field", "Please enter your city/town location.");
      return;
    }

    const cleanDob = formatDobString(dob.trim());

    const profilePayload = {
      firstName: playerName.trim().split(" ")[0] || playerName.trim(),
      lastName: playerName.trim().split(" ").slice(1).join(" ") || "",
      fullName: playerName.trim(),
      name: playerName.trim(),
      city: location.trim(),
      location: location.trim(),
      dateOfBirth: cleanDob,
      dob: cleanDob,
      email: email.trim(),
      mobileNumber: mobileNumber.trim(),
      playingRole,
      battingStyle,
      bowlingStyle,
      gender,
      bio: bio.trim(),
    };

    setIsLoading(true);
    try {
      await updateProfileApi(profilePayload);

      Alert.alert("Profile Updated 🎉", "Your profile details have been saved successfully to server!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.warn("[UPDATE PROFILE ERROR]:", err?.message || err);
      Alert.alert("Update Notice", "Profile updated locally. Server will sync when reconnected.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Top Header Bar */}
      <AppHeader
        title="Edit profile"
        onBackPress={() => navigation.goBack()}
      />

      {/* Main Scrollable Canvas */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        {/* Photo Picker Header (Wired to Image Picker & Store Profile Photo) */}
        <AvatarPicker
          onPress={handlePickPhoto}
          profileImageUrl={
            user.profileImageUrl ||
            user.profilePhoto ||
            user.photo ||
            user.avatarUrl
          }
          isLoading={isUploadingPhoto}
        />

        {/* Form Fields */}
        <View className="mt-1">
          {/* Player Name */}
          <UnderlineInput
            label="Player name"
            value={playerName}
            onChangeText={setPlayerName}
            placeholder="Enter player name"
          />

          {/* Location */}
          <UnderlineInput
            label="Location *"
            value={location}
            onChangeText={setLocation}
            placeholder="City / town"
          />

          {/* Date of Birth */}
          <UnderlineInput
            label="Date of birth"
            value={dob}
            onChangeText={(val) => setDob(formatDobString(val))}
            placeholder="YYYY-MM-DD"
            rightIcon={
              dob ? (
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              ) : null
            }
            onRightIconPress={() => setDob("")}
          />

          {/* Email Address */}
          <UnderlineInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            rightIcon={
              <Text className="text-[#0D9488] text-[15px] font-bold">Add</Text>
            }
            onRightIconPress={() => {}}
          />

          {/* Mobile Number */}
          <UnderlineInput
            label="Mobile number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Mobile number"
            keyboardType="phone-pad"
          />

          {/* Playing Role Dropdown */}
          <DropdownInput
            label="Playing role"
            value={playingRole}
            options={PLAYING_ROLES}
            onSelect={(val) => setPlayingRole(val)}
          />

          {/* Batting Style Dropdown */}
          <DropdownInput
            label="Batting style"
            value={battingStyle}
            options={BATTING_STYLES}
            onSelect={(val) => setBattingStyle(val)}
          />

          {/* Bowling Style Dropdown */}
          <DropdownInput
            label="Bowling style"
            value={bowlingStyle}
            options={BOWLING_STYLES}
            onSelect={(val) => setBowlingStyle(val)}
          />

          {/* Gender Radio Selector */}
          <RadioGroup
            options={GENDER_OPTIONS}
            selectedValue={gender}
            onSelect={(val) => setGender(val)}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3">
        <TouchableOpacity
          className={`h-14 bg-[#0D9488] rounded-2xl justify-center items-center shadow-xl shadow-teal-500/30 ${isLoading ? "opacity-70" : ""}`}
          activeOpacity={0.8}
          onPress={handleUpdate}
          disabled={isLoading}
        >
          <Text className="text-white text-base font-bold">
            {isLoading ? "Saving..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;
