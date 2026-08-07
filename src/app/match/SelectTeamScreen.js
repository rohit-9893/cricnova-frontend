import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import SubHeaderTabs from "../../components/ui/SubHeaderTabs";
import TeamSearchHeader from "../../components/team/TeamSearchHeader";
import TeamCard from "../../components/team/TeamCard";
import TeamLogoPicker from "../../components/team/TeamLogoPicker";
import UnderlineInput from "../../components/ui/UnderlineInput";

// Shared team storage across navigation turns
let globalTeamsList = [];

const AVATAR_COLORS = [
  "#0D9488", "#9333EA", "#1D4ED8", "#F43F5E",
  "#D97706", "#059669", "#7C3AED", "#DC2626"
];

const TABS = ["Your teams", "Opponents", "Add"];

const SelectTeamScreen = ({ navigation, route }) => {
  const teamType = route.params?.teamType || "A";
  const [activeTab, setActiveTab] = useState(
    teamType === "B" ? "Opponents" : "Your teams"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState(globalTeamsList);

  // Selection & QR Modal States
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [qrModalTeam, setQrModalTeam] = useState(null);
  const [isQrModalVisible, setIsQrModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.teamType === "B") {
      setActiveTab("Opponents");
    } else {
      setActiveTab("Your teams");
    }
  }, [route.params?.teamType]);

  // Form State for "Add" Tab
  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [addSelf, setAddSelf] = useState(true);

  // Dynamic Header Title
  const headerTitle =
    activeTab === "Add"
      ? `Create ${teamType === "B" ? "Opponent " : ""}Team`
      : `Select team ${teamType}${teamType === "B" ? " (Opponent)" : ""}`;

  const existingTeamA = route.params?.existingTeamA;
  const existingTeamB = route.params?.existingTeamB;

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchQuery.toLowerCase());
    if (teamType === "B" && existingTeamA) {
      return (
        matchesSearch &&
        team.id !== existingTeamA.id &&
        team.teamName.trim().toLowerCase() !== existingTeamA.teamName.trim().toLowerCase()
      );
    }
    if (teamType === "A" && existingTeamB) {
      return (
        matchesSearch &&
        team.id !== existingTeamB.id &&
        team.teamName.trim().toLowerCase() !== existingTeamB.teamName.trim().toLowerCase()
      );
    }
    return matchesSearch;
  });

  // Handle New Team Creation -> Navigates to Captain Roster & Add Player Screen
  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      Alert.alert("Required Field", "Please enter a valid Team Name.");
      return;
    }

    // Prevent creating a team with exact same name as opposing selected team
    if (teamType === "B" && existingTeamA) {
      if (teamName.trim().toLowerCase() === existingTeamA.teamName.trim().toLowerCase()) {
        Alert.alert(
          "Invalid Team Name ⚠️",
          `"${teamName.trim()}" is already selected as Team A. Opponent team must have a different name.`
        );
        return;
      }
    } else if (teamType === "A" && existingTeamB) {
      if (teamName.trim().toLowerCase() === existingTeamB.teamName.trim().toLowerCase()) {
        Alert.alert(
          "Invalid Team Name ⚠️",
          `"${teamName.trim()}" is already selected as Opponent Team B. Team A must have a different name.`
        );
        return;
      }
    }

    // Generate Initials from Team Name
    const words = teamName.trim().split(" ");
    const initials =
      words.length >= 2
        ? (words[0][0] + words[1][0]).toUpperCase()
        : teamName.substring(0, 2).toUpperCase();

    // Random Vibrant Avatar Color
    const randomColor =
      AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    const newTeam = {
      id: Date.now().toString(),
      teamName: teamName.trim(),
      avatarColor: randomColor,
      avatarInitials: initials,
      location: city.trim() || "Indore",
      captainName: captainName.trim() || "Captain",
      captainPhone: captainPhone.trim() || "+91 98930 00000",
      isOpponent: teamType === "B",
    };

    const updatedList = [newTeam, ...teams];
    globalTeamsList = updatedList;
    setTeams(updatedList);

    // Reset Form Fields
    setTeamName("");
    setCity("");
    setCaptainName("");
    setCaptainPhone("");

    // Navigate to TeamRoster screen (Captain Profile & Add Player Roster)
    navigation.navigate("TeamRoster", {
      team: newTeam,
      teamType: teamType,
    });
  };

  // Handle Selecting an Existing Team -> Navigates to TeamRoster screen
  const handleSelectTeam = (targetTeam) => {
    if (!targetTeam) return;

    // Duplication Safety Guard Check
    if (teamType === "B" && existingTeamA) {
      if (
        targetTeam.id === existingTeamA.id ||
        targetTeam.teamName.trim().toLowerCase() === existingTeamA.teamName.trim().toLowerCase()
      ) {
        Alert.alert(
          "Invalid Team Selection ⚠️",
          `"${targetTeam.teamName}" is already selected as Team A. Opponent team must be a different team.`
        );
        return;
      }
    } else if (teamType === "A" && existingTeamB) {
      if (
        targetTeam.id === existingTeamB.id ||
        targetTeam.teamName.trim().toLowerCase() === existingTeamB.teamName.trim().toLowerCase()
      ) {
        Alert.alert(
          "Invalid Team Selection ⚠️",
          `"${targetTeam.teamName}" is already selected as Opponent Team B. Team A must be a different team.`
        );
        return;
      }
    }

    navigation.navigate("TeamRoster", {
      team: targetTeam,
      teamType: teamType,
    });
  };

  const handleOpenQrModal = (teamItem) => {
    setQrModalTeam(
      teamItem ||
        selectedTeam ||
        teams[0] || { teamName: "CricNovas Team", avatarInitials: "CN", location: "Indore" }
    );
    setIsQrModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Fixed Top Header */}
      <AppHeader
        title={headerTitle}
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-1 ml-2.5"
              activeOpacity={0.7}
              onPress={() => handleOpenQrModal(selectedTeam)}
            >
              <Ionicons name="qr-code-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity className="p-1 ml-2.5" activeOpacity={0.7}>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Fixed Sub-Header Tabs */}
      <SubHeaderTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabPress={(tab) => setActiveTab(tab)}
      />

      {/* Body Content Area */}
      <View className="flex-1 bg-white">
        {activeTab === "Add" ? (
          // --- CREATE TEAM FORM VIEW ---
          <View className="flex-1 bg-white">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 }}
            >
              <TeamLogoPicker onPress={() => {}} />

              <View className="mt-2.5 mb-5">
                <UnderlineInput
                  label="Team name *"
                  value={teamName}
                  onChangeText={setTeamName}
                  placeholder="Enter team name"
                />

                <UnderlineInput
                  label="City / town *"
                  value={city}
                  onChangeText={setCity}
                  placeholder="City / town"
                />

                <UnderlineInput
                  prefix="+91"
                  value={captainPhone}
                  onChangeText={setCaptainPhone}
                  placeholder="Team captain/coordinator number (optional)"
                  keyboardType="phone-pad"
                  rightIcon={
                    <Ionicons name="book-outline" size={20} color="#0D9488" />
                  }
                  onRightIconPress={() => {}}
                />

                <UnderlineInput
                  value={captainName}
                  onChangeText={setCaptainName}
                  placeholder="Team captain name (optional)"
                />
              </View>

              <TouchableOpacity
                className="flex-row items-center mt-1 mb-6"
                activeOpacity={0.8}
                onPress={() => setAddSelf(!addSelf)}
              >
                <View
                  className={`w-5 h-5 rounded border justify-center items-center mr-2.5 ${
                    addSelf ? "bg-[#0D9488] border-[#0D9488]" : "bg-white border-slate-400"
                  }`}
                >
                  {addSelf && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
                <Text className="text-sm text-slate-600 font-medium">
                  Add yourself in the team
                </Text>
              </TouchableOpacity>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3">
              <TouchableOpacity
                className="h-12 bg-[#0D9488] rounded-xl justify-center items-center shadow-md shadow-teal-500/20"
                activeOpacity={0.85}
                onPress={handleCreateTeam}
              >
                <Text className="text-white text-base font-bold">Add team</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // --- YOUR TEAMS / OPPONENTS LIST VIEW ---
          <View className="flex-1 bg-white">
            <TeamSearchHeader
              searchQuery={searchQuery}
              onSearchChange={(text) => setSearchQuery(text)}
              onAddTeamPress={() => setActiveTab("Add")}
            />

            <FlatList
              data={filteredTeams}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TeamCard
                  teamName={item.teamName}
                  avatarColor={item.avatarColor}
                  avatarInitials={item.avatarInitials}
                  location={item.location}
                  captainName={item.captainName}
                  isSelected={selectedTeam?.id === item.id}
                  onPress={() => setSelectedTeam(item)}
                  onQrPress={() => handleOpenQrModal(item)}
                />
              )}
              ListEmptyComponent={
                <View className="pt-16 items-center justify-center">
                  <Text className="text-slate-400 text-sm font-medium mb-3">
                    No {activeTab === "Opponents" ? "opponent" : ""} teams created yet.
                  </Text>
                  <TouchableOpacity
                    className="bg-[#0D9488] px-4 py-2.5 rounded-xl shadow-xs"
                    onPress={() => setActiveTab("Add")}
                  >
                    <Text className="text-white text-sm font-bold">
                      + Create {activeTab === "Opponents" ? "Opponent" : "Your"} Team
                    </Text>
                  </TouchableOpacity>
                </View>
              }
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 110, flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>

      {/* Bottom Fixed Action Bar ("Done") */}
      {selectedTeam && activeTab !== "Add" && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-xl">
          <TouchableOpacity
            className="w-full h-13 bg-[#0D9488] rounded-xl justify-center items-center flex-row shadow-md shadow-teal-500/20"
            activeOpacity={0.85}
            onPress={() => handleSelectTeam(selectedTeam)}
          >
            <Text className="text-white text-base font-extrabold mr-2">
              Done — Select {selectedTeam.teamName}
            </Text>
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Team QR Code Modal */}
      <Modal
        visible={isQrModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsQrModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="w-full bg-white rounded-3xl p-6 items-center shadow-2xl">
            <View className="flex-row items-center justify-between w-full mb-4">
              <Text className="text-lg font-black text-slate-900">Team QR Code</Text>
              <TouchableOpacity onPress={() => setIsQrModalVisible(false)}>
                <Ionicons name="close-circle" size={26} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* QR Card Body */}
            <View className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 items-center mb-6">
              <View
                className="w-16 h-16 rounded-full justify-center items-center mb-3 shadow-xs"
                style={{ backgroundColor: qrModalTeam?.avatarColor || "#0D9488" }}
              >
                <Text className="text-white text-xl font-black">
                  {qrModalTeam?.avatarInitials || "TM"}
                </Text>
              </View>

              <Text className="text-xl font-black text-slate-900 mb-1">
                {qrModalTeam?.teamName || "Team"}
              </Text>
              <Text className="text-slate-500 text-xs font-semibold mb-4">
                📍 {qrModalTeam?.location || "Indore"}
              </Text>

              {/* QR Code Container Graphic */}
              <View className="w-48 h-48 bg-white border-2 border-dashed border-[#0D9488] rounded-2xl justify-center items-center shadow-xs">
                <Ionicons name="qr-code" size={120} color="#0D9488" />
                <Text className="text-slate-400 text-[10px] font-bold mt-1">
                  SCAN TO IMPORT TEAM
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="w-full h-12 bg-[#0D9488] rounded-xl justify-center items-center flex-row shadow-md shadow-teal-500/20"
              activeOpacity={0.85}
              onPress={() => setIsQrModalVisible(false)}
            >
              <Ionicons name="share-social-outline" size={18} color="#FFFFFF" className="mr-2" />
              <Text className="text-white text-sm font-bold ml-1">Share QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SelectTeamScreen;
