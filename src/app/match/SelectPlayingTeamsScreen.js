import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import TeamSelectorCard from "../../components/match/TeamSelectorCard";
import VsBadge from "../../components/match/VsBadge";

const SelectPlayingTeamsScreen = ({ navigation, route }) => {
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);

  // Receive selected team from SelectTeamScreen
  useEffect(() => {
    if (route.params?.selectedTeam) {
      const { selectedTeam, teamType } = route.params;
      if (teamType === "A") {
        setTeamA(selectedTeam);
      } else if (teamType === "B") {
        setTeamB(selectedTeam);
      }
    }
  }, [route.params]);

  // Determine which team button should pulse
  const isTeamAPulsing = !teamA;
  const isTeamBPulsing = teamA && !teamB;

  return (
    <View style={styles.container}>
      {/* App Header Component */}
      <AppHeader
        title="Select playing teams"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.7}>
            <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      {/* Main Content Area */}
      <View style={styles.content}>
        <Text style={styles.subtitleNotice}>
          *Scoring a match on CricNovas is free.
        </Text>

        <View style={styles.teamSelectorCenter}>
          {/* Team A Card */}
          <TeamSelectorCard
            title={teamA ? teamA.teamName : "Select team A"}
            avatarInitials={teamA ? teamA.avatarInitials : null}
            avatarColor={teamA ? teamA.avatarColor : null}
            isAnimated={isTeamAPulsing}
            onPress={() => navigation.navigate("SelectTeam", { teamType: "A" })}
          />

          {/* VS Diamond Divider */}
          <VsBadge />

          {/* Team B Card */}
          <TeamSelectorCard
            title={teamB ? teamB.teamName : "Select team B"}
            avatarInitials={teamB ? teamB.avatarInitials : null}
            avatarColor={teamB ? teamB.avatarColor : null}
            isAnimated={isTeamBPulsing}
            onPress={() => navigation.navigate("SelectTeam", { teamType: "B" })}
          />
        </View>
      </View>

      {/* Start Match Action Bar (Appears when both teams are selected) */}
      {teamA && teamB && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.startMatchBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Placeholder", {
                title: `${teamA.teamName} vs ${teamB.teamName}`,
              })
            }
          >
            <Text style={styles.startMatchBtnText}>Start Match 🏏</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SelectPlayingTeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  helpBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  subtitleNotice: {
    color: "#64748B",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 40,
  },
  teamSelectorCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    padding: 16,
  },
  startMatchBtn: {
    height: 50,
    backgroundColor: "#0D9488",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  startMatchBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
