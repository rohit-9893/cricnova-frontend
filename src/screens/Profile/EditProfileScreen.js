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
  // Form State
  const [playerName, setPlayerName] = useState("Rohit Panchal");
  const [location, setLocation] = useState("Indore");
  const [dob, setDob] = useState("2000-03-02");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("7224012604");
  const [playingRole, setPlayingRole] = useState("None");
  const [battingStyle, setBattingStyle] = useState("Left-hand bat");
  const [bowlingStyle, setBowlingStyle] = useState("Right-arm fast");
  const [gender, setGender] = useState("Male");

  const handleUpdate = () => {
    Alert.alert("Success", "Profile updated successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Red Header Bar */}
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
          style={styles.updateBtn}
          activeOpacity={0.8}
          onPress={handleUpdate}
        >
          <Text style={styles.updateBtnText}>Update</Text>
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
