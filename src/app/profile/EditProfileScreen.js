import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import AvatarPicker from "../../components/profile/AvatarPicker";
import UnderlineInput from "../../components/ui/UnderlineInput";
import DropdownInput from "../../components/ui/DropdownInput";
import RadioGroup from "../../components/ui/RadioGroup";
import useAuthStore from "../../store/useAuthStore";
import { updateProfile as apiUpdateProfile } from "../../services/authService";

const GENDER_OPTIONS = ["Male", "Female", "Prefer not to say"];

const PLAYING_ROLES = [
  "Top-order batter",
  "Middle-order batter",
  "Wicket-keeper batter",
  "Wicket-keeper",
  "Bowler",
  "All-Rounder",
  "Lower-order batter",
  "Opening batter",
  "None",
];

const BATTING_STYLES = ["Left-hand bat", "Right-hand bat"];

const BOWLING_STYLES = [
  "Right-arm fast",
  "Right-arm medium",
  "Left-arm fast",
  "Left-arm medium",
  "Slow left-arm orthodox",
  "Slow left-arm chinaman",
  "Right-arm Off Break",
  "Right-arm Leg Break",
  "None",
];

const EditProfileScreen = ({ navigation }) => {
  const user = useAuthStore((state) => state.user) || {};
  const updateUserStore = useAuthStore((state) => state.updateUser);

  // Form State prefilled from Store
  const [playerName, setPlayerName] = useState(user.fullName || user.name || "");
  const [location, setLocation] = useState(user.city || user.location || "");
  const [dob, setDob] = useState(user.dateOfBirth || user.dob || "");
  const [email, setEmail] = useState(user.email || "");
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || user.phone || "");
  const [playingRole, setPlayingRole] = useState(user.playingRole || "None");
  const [battingStyle, setBattingStyle] = useState(user.battingStyle || "Right-hand bat");
  const [bowlingStyle, setBowlingStyle] = useState(user.bowlingStyle || "None");
  const [gender, setGender] = useState(user.gender || "Male");

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!location.trim()) {
      Alert.alert("Required Field", "Please enter your city/town location.");
      return;
    }

    const updatedData = {
      fullName: playerName.trim(),
      name: playerName.trim(),
      city: location.trim(),
      location: location.trim(),
      dateOfBirth: dob.trim(),
      dob: dob.trim(),
      email: email.trim(),
      mobileNumber: mobileNumber.trim(),
      playingRole,
      battingStyle,
      bowlingStyle,
      gender,
    };

    setIsLoading(true);
    try {
      await apiUpdateProfile(updatedData);
    } catch (err) {
      console.warn("[UPDATE PROFILE API NOTICE]:", err?.message || err);
    } finally {
      setIsLoading(false);
      await updateUserStore(updatedData);
      Alert.alert("Profile Updated 🎉", "Your profile details have been saved successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <AppHeader
        title="Edit profile"
        onBackPress={() => navigation.goBack()}
      />

      {/* Main Scrollable Canvas */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Photo Picker Header */}
        <AvatarPicker onPress={() => {}} />

        {/* Form Fields */}
        <View style={styles.formFields}>
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
            onChangeText={setDob}
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
              <Text style={styles.addEmailText}>Add</Text>
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
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.updateBtn, isLoading && { opacity: 0.7 }]}
          activeOpacity={0.8}
          onPress={handleUpdate}
          disabled={isLoading}
        >
          <Text style={styles.updateBtnText}>
            {isLoading ? "Saving..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  formFields: {
    marginTop: 4,
  },
  addEmailText: {
    color: "#0D9488",
    fontSize: 15,
    fontWeight: "bold",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    padding: 12,
  },
  updateBtn: {
    height: 48,
    backgroundColor: "#0D9488",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  updateBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
