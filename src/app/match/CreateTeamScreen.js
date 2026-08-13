import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import SubHeaderTabs from "../../components/ui/SubHeaderTabs";
import TeamLogoPicker from "../../components/team/TeamLogoPicker";
import UnderlineInput from "../../components/ui/UnderlineInput";
import { createTeam } from "../../services/teamService";

const TABS = ["Your teams", "Opponents", "Add"];

const CreateTeamScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Add");

  // Form State
  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("Indore");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [addSelf, setAddSelf] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const handleTabPress = (tab) => {
    if (tab === "Your teams" || tab === "Opponents") {
      navigation.navigate("SelectTeam", { teamType: "A" });
    }
  };

  // POST /api/v1/teams — Save team permanently to DB
  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      Alert.alert("Required Field", "Please enter a team name.");
      return;
    }

    const teamCleanName = teamName.trim();
    const cleanCity = city.trim() || "Indore";
    const generateShortName = (str) => {
      const parts = str.split(" ").filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0] + (parts[2] ? parts[2][0] : "")).toUpperCase();
      }
      return str.substring(0, 4).toUpperCase();
    };

    const payload = {
      name: teamCleanName,
      shortName: generateShortName(teamCleanName),
      city: cleanCity,
      state: "Madhya Pradesh",
      country: "India",
      description: `Cricket team from ${cleanCity}`,
    };

    try {
      setIsCreatingTeam(true);
      const res = await createTeam(payload);
      const savedTeam = res?.data?.team || res?.data || res?.team || res;

      Alert.alert(
        "Team Created ✅",
        `"${savedTeam?.name || teamName.trim()}" has been saved to your account!`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      console.warn("[CREATE TEAM ERROR]:", err);
      Alert.alert(
        "Creation Failed ❌",
        err?.message || "Could not save team. Please check your connection."
      );
    } finally {
      setIsCreatingTeam(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Top Header */}
      <AppHeader
        title="Create your team"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <View className="flex-row items-center">
            <TouchableOpacity className="p-1 ml-2.5" activeOpacity={0.7}>
              <Ionicons name="qr-code-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity className="p-1 ml-2.5" activeOpacity={0.7}>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Sub-Header Tabs */}
      <SubHeaderTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* White Form Card Container */}
        <View className="bg-white rounded-xl border border-slate-200 px-5 py-4 mb-5 shadow-xs">
          {/* Logo Picker */}
          <TeamLogoPicker onPress={() => {}} />

          {/* Team Name Input */}
          <UnderlineInput
            label="Team name *"
            value={teamName}
            onChangeText={setTeamName}
            placeholder=""
          />

          {/* City / Town Input */}
          <UnderlineInput
            label="City / town *"
            value={city}
            onChangeText={setCity}
            placeholder="City / town"
          />

          {/* Captain Phone Input */}
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

          {/* Captain Name Input */}
          <UnderlineInput
            value={captainName}
            onChangeText={setCaptainName}
            placeholder="Team captain name (optional)"
          />
        </View>

        {/* Add Yourself Checkbox Row */}
        <TouchableOpacity
          className="flex-row items-center px-1 mb-6"
          activeOpacity={0.8}
          onPress={() => setAddSelf(!addSelf)}
        >
          <View
            className={`w-5 h-5 rounded border justify-center items-center mr-2.5 ${
              addSelf ? "bg-[#0D9488] border-[#0D9488]" : "bg-white border-slate-400"
            }`}
          >
            {addSelf && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text className="text-sm text-slate-600 font-medium">
            Add yourself in the team
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-xl">
        <TouchableOpacity
          className={`h-14 bg-[#0D9488] rounded-2xl justify-center items-center shadow-xl shadow-teal-500/30 border border-teal-400/40 ${isCreatingTeam ? "opacity-70" : ""}`}
          activeOpacity={0.85}
          onPress={handleCreateTeam}
          disabled={isCreatingTeam}
        >
          {isCreatingTeam ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text className="text-white text-base font-black tracking-wider">Add Team ➔</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTeamScreen;
