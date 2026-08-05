import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import SubHeaderTabs from "../../components/ui/SubHeaderTabs";
import TeamSearchHeader from "../../components/team/TeamSearchHeader";
import TeamCard from "../../components/team/TeamCard";
import TeamLogoPicker from "../../components/team/TeamLogoPicker";
import UnderlineInput from "../../components/ui/UnderlineInput";

// Shared team storage across navigation turns (starts empty — filled by API)
let globalTeamsList = [];

const AVATAR_COLORS = [
  "#0D9488", "#9333EA", "#1D4ED8", "#F43F5E",
  "#D97706", "#059669", "#7C3AED", "#DC2626"
];

const TABS = ["Your teams", "Opponents", "Add"];

const SelectTeamScreen = ({ navigation, route }) => {
  const teamType = route.params?.teamType || "A";
  const [activeTab, setActiveTab] = useState("Your teams");
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState(globalTeamsList);

  // Form State for "Add" Tab
  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [addSelf, setAddSelf] = useState(true);

  // Dynamic Header Title
  const headerTitle =
    activeTab === "Add" ? "Create your team" : `Select team ${teamType}`;

  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle New Team Creation
  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      Alert.alert("Required Field", "Please enter a valid Team Name.");
      return;
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
    };

    const updatedList = [newTeam, ...teams];
    globalTeamsList = updatedList;
    setTeams(updatedList);

    // Reset Form Fields
    setTeamName("");

    // Automatically select the newly created team and navigate back
    navigation.navigate("SelectPlayingTeams", {
      selectedTeam: newTeam,
      teamType: teamType,
    });
  };

  // Handle Selecting an Existing Team
  const handleSelectTeam = (team) => {
    navigation.navigate("SelectPlayingTeams", {
      selectedTeam: team,
      teamType: teamType,
    });
  };

  return (
    <View style={styles.container}>
      {/* Fixed Red Top Header */}
      <AppHeader
        title={headerTitle}
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <View style={styles.headerRightActions}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="qr-code-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
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
      <View style={styles.bodyContent}>
        {activeTab === "Add" ? (
          // --- CREATE TEAM FORM VIEW ---
          <View style={styles.formContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.formScrollContent}
            >
              <TeamLogoPicker onPress={() => {}} />

              <View style={styles.formFields}>
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
                style={styles.checkboxRow}
                activeOpacity={0.8}
                onPress={() => setAddSelf(!addSelf)}
              >
                <View
                  style={[styles.checkbox, addSelf && styles.checkboxChecked]}
                >
                  {addSelf && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.checkboxText}>Add yourself in the team</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomBar}>
              <TouchableOpacity
                style={styles.addTeamBtn}
                activeOpacity={0.8}
                onPress={handleCreateTeam}
              >
                <Text style={styles.addTeamBtnText}>Add team</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // --- YOUR TEAMS / OPPONENTS LIST VIEW ---
          <View style={styles.listContainer}>
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
                  onPress={() => handleSelectTeam(item)}
                  onQrPress={() => {}}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No teams created yet.</Text>
                  <TouchableOpacity
                    style={styles.createFirstTeamBtn}
                    onPress={() => setActiveTab("Add")}
                  >
                    <Text style={styles.createFirstTeamBtnText}>
                      + Create Your First Team
                    </Text>
                  </TouchableOpacity>
                </View>
              }
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectTeamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    padding: 4,
    marginLeft: 10,
  },
  bodyContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 15,
    marginBottom: 12,
  },
  createFirstTeamBtn: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
  },
  createFirstTeamBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  formScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  formFields: {
    marginTop: 10,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#0D9488",
    borderColor: "#0D9488",
  },
  checkboxText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
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
  addTeamBtn: {
    height: 48,
    backgroundColor: "#0D9488",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addTeamBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
