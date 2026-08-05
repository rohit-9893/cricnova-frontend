import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";

const CATEGORIES = [
  "OPEN",
  "CORPORATE",
  "COMMUNITY",
  "SCHOOL",
  "OTHER",
  "SERIES",
  "COLLEGE",
  "UNIVERSITY",
];

const BALL_TYPES = [
  { id: "Tennis", label: "Tennis", icon: "tennis-ball", color: "#10B981" },
  { id: "Leather", label: "Leather", icon: "cricket", color: "#DC2626" },
  { id: "Other", label: "Other", icon: "circle-outline", color: "#F59E0B" },
];

const PITCH_TYPES = ["ROUGH", "CEMENT", "TURF", "ASTROTURF", "MATTING"];

const MATCH_TYPES = [
  "Limited Overs",
  "Box/Turf Cricket",
  "Pair Cricket",
  "Test Match",
  "The Hundred",
];

const CreateTournamentScreen = ({ navigation }) => {
  // Form State
  const [tournamentName, setTournamentName] = useState("");
  const [city, setCity] = useState("");
  const [ground, setGround] = useState("");
  const [organiserName, setOrganiserName] = useState("");
  const [organiserNumber, setOrganiserNumber] = useState("");
  const [organiserEmail, setOrganiserEmail] = useState("");

  // Dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Selectors
  const [selectedCategory, setSelectedCategory] = useState("OPEN");
  const [selectedBallType, setSelectedBallType] = useState("Tennis");
  const [selectedPitchType, setSelectedPitchType] = useState("TURF");
  const [selectedMatchType, setSelectedMatchType] = useState("Limited Overs");

  // Checkboxes
  const [needTeams, setNeedTeams] = useState(false);
  const [needOfficials, setNeedOfficials] = useState(false);

  const handleNext = () => {
    if (!tournamentName.trim()) {
      Alert.alert("Required Field", "Please enter Tournament / Series name.");
      return;
    }
    Alert.alert(
      "Tournament Created! 🏆",
      `"${tournamentName}" has been successfully created.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right", "bottom"]}>
      {/* Light Emerald Teal Top Header */}
      <AppHeader
        title="Add a tournament / series"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity
            className="p-1"
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Ionicons name="play" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Banner & Logo Pickers Row */}
        <View className="items-center mb-6">
          {/* Add Banner Placeholder */}
          <TouchableOpacity
            className="w-full h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 justify-center items-center relative mb-6 overflow-hidden"
            activeOpacity={0.8}
          >
            <Ionicons name="image-outline" size={36} color="#94A3B8" />
            <View className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#0D9488] justify-center items-center">
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </View>
            <Text className="text-slate-500 text-xs font-bold mt-1">Add banner</Text>
          </TouchableOpacity>

          {/* Add Logo Placeholder */}
          <TouchableOpacity
            className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-200 justify-center items-center relative shadow-sm"
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="cricket" size={32} color="#0D9488" />
            <View className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0D9488] justify-center items-center border border-white">
              <Ionicons name="camera" size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text className="text-slate-500 text-xs font-bold mt-2">Add logo</Text>
        </View>

        {/* Text Form Fields */}
        <View className="space-y-4 mb-6">
          {/* Tournament Name Input */}
          <View className="border-b border-slate-300 pb-1 mb-4">
            <Text className="text-slate-500 text-xs font-semibold mb-1">
              Tournament / series name *
            </Text>
            <TextInput
              className="text-base font-bold text-slate-900 p-0"
              value={tournamentName}
              onChangeText={setTournamentName}
              placeholder="e.g. Indore Premier League 2026"
              placeholderTextColor="#CBD5E1"
            />
          </View>

          {/* City Input */}
          <View className="border-b border-slate-300 pb-1 mb-4">
            <Text className="text-slate-500 text-xs font-semibold mb-1">City *</Text>
            <TextInput
              className="text-base font-bold text-slate-900 p-0"
              value={city}
              onChangeText={setCity}
              placeholder="e.g. Indore"
              placeholderTextColor="#CBD5E1"
            />
          </View>

          {/* Ground Input */}
          <View className="border-b border-slate-300 pb-1 mb-4">
            <Text className="text-slate-500 text-xs font-semibold mb-1">Ground *</Text>
            <TextInput
              className="text-base font-bold text-slate-900 p-0"
              value={ground}
              onChangeText={setGround}
              placeholder="e.g. Holkar Stadium Ground A"
              placeholderTextColor="#CBD5E1"
            />
          </View>

          {/* Organiser Name Input */}
          <View className="border-b border-slate-300 pb-1 mb-4">
            <Text className="text-slate-500 text-xs font-semibold mb-1">Organiser name *</Text>
            <TextInput
              className="text-base font-bold text-slate-900 p-0"
              value={organiserName}
              onChangeText={setOrganiserName}
              placeholder="Enter organiser full name"
              placeholderTextColor="#CBD5E1"
            />
          </View>

          {/* Organiser Number Input */}
          <View className="border-b border-slate-300 pb-1 mb-4">
            <Text className="text-slate-500 text-xs font-semibold mb-1">Organiser number *</Text>
            <TextInput
              className="text-base font-bold text-slate-900 p-0"
              value={organiserNumber}
              onChangeText={setOrganiserNumber}
              keyboardType="phone-pad"
              placeholder="10-digit mobile number"
              placeholderTextColor="#CBD5E1"
            />
          </View>

          {/* Organiser Email Input */}
          <View className="border-b border-slate-300 pb-1 mb-2">
            <Text className="text-slate-500 text-xs font-semibold mb-1">Organiser email</Text>
            <TextInput
              className="text-base font-bold text-slate-900 p-0"
              value={organiserEmail}
              onChangeText={setOrganiserEmail}
              keyboardType="email-address"
              placeholder="e.g. organiser@email.com"
              placeholderTextColor="#CBD5E1"
            />
          </View>
          <Text className="text-slate-400 text-[11px] italic mb-4">
            *Get updated with CricNovas offers and help videos on mail.
          </Text>
        </View>

        {/* Tournament Dates Section */}
        <View className="mb-6">
          <Text className="text-slate-900 text-base font-black mb-3">Tournament dates</Text>
          <View className="flex-row items-center space-x-4">
            <View className="flex-1 border-b border-slate-300 pb-1 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-slate-500 text-xs font-semibold mb-1">Start date *</Text>
                <TextInput
                  className="text-sm font-bold text-slate-900 p-0"
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#CBD5E1"
                />
              </View>
              <Ionicons name="calendar-outline" size={18} color="#94A3B8" />
            </View>

            <View className="w-4" />

            <View className="flex-1 border-b border-slate-300 pb-1 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-slate-500 text-xs font-semibold mb-1">End date *</Text>
                <TextInput
                  className="text-sm font-bold text-slate-900 p-0"
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#CBD5E1"
                />
              </View>
              <Ionicons name="calendar-outline" size={18} color="#94A3B8" />
            </View>
          </View>
        </View>

        {/* Tournament Category (Pills) */}
        <View className="mb-6">
          <Text className="text-slate-900 text-base font-black mb-3">
            Tournament category <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  className={`px-3.5 py-2 rounded-full border ${
                    isSelected
                      ? "bg-[#0D9488] border-[#0D9488]"
                      : "bg-slate-100 border-slate-200"
                  }`}
                  activeOpacity={0.7}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isSelected ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Select Ball Type (Circles) */}
        <View className="mb-6">
          <Text className="text-slate-900 text-base font-black mb-3">
            Select ball type <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex-row items-center space-x-6">
            {BALL_TYPES.map((b) => {
              const isSelected = selectedBallType === b.id;
              return (
                <TouchableOpacity
                  key={b.id}
                  className="items-center mr-5"
                  activeOpacity={0.7}
                  onPress={() => setSelectedBallType(b.id)}
                >
                  <View
                    className={`w-14 h-14 rounded-full justify-center items-center mb-1.5 border-2 ${
                      isSelected ? "border-[#0D9488] bg-teal-50" : "border-slate-200 bg-slate-100"
                    }`}
                  >
                    {isSelected ? (
                      <Ionicons name="checkmark-circle" size={28} color="#0D9488" />
                    ) : (
                      <MaterialCommunityIcons name={b.icon} size={26} color={b.color} />
                    )}
                  </View>
                  <Text className={`text-xs ${isSelected ? "font-black text-[#0D9488]" : "font-semibold text-slate-700"}`}>
                    {b.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Pitch Type (Pills) */}
        <View className="mb-6">
          <Text className="text-slate-900 text-base font-black mb-3">Pitch type</Text>
          <View className="flex-row flex-wrap gap-2">
            {PITCH_TYPES.map((p) => {
              const isSelected = selectedPitchType === p;
              return (
                <TouchableOpacity
                  key={p}
                  className={`px-3.5 py-2 rounded-full border ${
                    isSelected
                      ? "bg-[#0D9488] border-[#0D9488]"
                      : "bg-slate-100 border-slate-200"
                  }`}
                  activeOpacity={0.7}
                  onPress={() => setSelectedPitchType(p)}
                >
                  <Text className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-700"}`}>
                    {p}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Match Type (Pills) */}
        <View className="mb-6">
          <Text className="text-slate-900 text-base font-black mb-3">
            Match type <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {MATCH_TYPES.map((m) => {
              const isSelected = selectedMatchType === m;
              return (
                <TouchableOpacity
                  key={m}
                  className={`px-3.5 py-2 rounded-full border ${
                    isSelected
                      ? "bg-[#0D9488] border-[#0D9488]"
                      : "bg-slate-100 border-slate-200"
                  }`}
                  activeOpacity={0.7}
                  onPress={() => setSelectedMatchType(m)}
                >
                  <Text className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-700"}`}>
                    {m}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Checkboxes */}
        <View className="space-y-3 mb-6">
          <TouchableOpacity
            className="flex-row items-center mb-3"
            activeOpacity={0.8}
            onPress={() => setNeedTeams(!needTeams)}
          >
            <View
              className={`w-5 h-5 rounded border justify-center items-center mr-3 ${
                needTeams ? "bg-[#0D9488] border-[#0D9488]" : "border-slate-300 bg-white"
              }`}
            >
              {needTeams && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text className="text-slate-800 text-xs font-semibold flex-1">
              Do you need more teams for your tournament?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center mb-3"
            activeOpacity={0.8}
            onPress={() => setNeedOfficials(!needOfficials)}
          >
            <View
              className={`w-5 h-5 rounded border justify-center items-center mr-3 ${
                needOfficials ? "bg-[#0D9488] border-[#0D9488]" : "border-slate-300 bg-white"
              }`}
            >
              {needOfficials && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text className="text-slate-800 text-xs font-semibold flex-1">
              Do you need officials? (e.g. Umpire, Scorer)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 elevation-5">
        <TouchableOpacity
          className="w-full h-12 bg-[#0D9488] rounded-xl justify-center items-center shadow-md shadow-teal-500/20"
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text className="text-white text-base font-extrabold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateTournamentScreen;
