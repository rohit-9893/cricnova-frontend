import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import TeamSelectorCard from "../../components/match/TeamSelectorCard";
import VsBadge from "../../components/match/VsBadge";

// Persistent module-level store so selected teams NEVER disappear
let playingTeamsStore = {
  teamA: null,
  teamB: null,
};

const SelectPlayingTeamsScreen = ({ navigation, route }) => {
  const [teamA, setTeamA] = useState(playingTeamsStore.teamA);
  const [teamB, setTeamB] = useState(playingTeamsStore.teamB);

  // Receive selected team from SelectTeamScreen / TeamRosterScreen
  useEffect(() => {
    if (route.params?.selectedTeam) {
      const { selectedTeam, teamType } = route.params;
      if (teamType === "A") {
        playingTeamsStore.teamA = selectedTeam;
        setTeamA(selectedTeam);
      } else if (teamType === "B") {
        playingTeamsStore.teamB = selectedTeam;
        setTeamB(selectedTeam);
      }
    }
  }, [route.params?.selectedTeam, route.params?.teamType]);

  // Determine which team button should pulse
  const isTeamAPulsing = !teamA;
  const isTeamBPulsing = teamA && !teamB;

  return (
    <View className="flex-1 bg-white">
      {/* App Header Component */}
      <AppHeader
        title="Select playing teams"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity className="p-1" activeOpacity={0.7}>
            <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      {/* Main Content Area */}
      <View className="flex-1 bg-white px-5 pt-4">
        <Text className="text-slate-500 text-sm italic mb-10">
          *Scoring a match on CricNovas is free.
        </Text>

        <View className="flex-1 justify-center items-center pb-20">
          {/* Team A Card */}
          <TeamSelectorCard
            title={teamA ? teamA.teamName : "Select team A"}
            avatarInitials={teamA ? teamA.avatarInitials : null}
            avatarColor={teamA ? teamA.avatarColor : null}
            isAnimated={isTeamAPulsing}
            onPress={() =>
              navigation.navigate("SelectTeam", {
                teamType: "A",
                existingTeamA: teamA,
                existingTeamB: teamB,
              })
            }
          />

          {/* VS Diamond Divider */}
          <VsBadge />

          {/* Team B Card */}
          <TeamSelectorCard
            title={teamB ? teamB.teamName : "Select team B"}
            avatarInitials={teamB ? teamB.avatarInitials : null}
            avatarColor={teamB ? teamB.avatarColor : null}
            isAnimated={isTeamBPulsing}
            onPress={() =>
              navigation.navigate("SelectTeam", {
                teamType: "B",
                existingTeamA: teamA,
                existingTeamB: teamB,
              })
            }
          />
        </View>
      </View>

      {/* Start Match Action Bar (Appears when both teams are selected) */}
      {teamA && teamB && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-xl">
          <TouchableOpacity
            className="w-full h-14 bg-[#0D9488] rounded-2xl justify-center items-center shadow-xl shadow-teal-500/30 border border-teal-400/40"
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("StartMatchSetup", {
                teamA: teamA,
                teamB: teamB,
              })
            }
          >
            <Text className="text-white text-base font-black tracking-wider">
              Start Match 🏏 ({teamA.teamName} vs {teamB.teamName})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SelectPlayingTeamsScreen;
