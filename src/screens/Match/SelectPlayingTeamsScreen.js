import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import TeamSelectorCard from "../../components/match/TeamSelectorCard";
import VsBadge from "../../components/match/VsBadge";

const SelectPlayingTeamsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Reusable App Header Component */}
      <AppHeader
        title="Select playing teams"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.7}>
            <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      {/* Main Content Canvas */}
      <View style={styles.content}>
        <Text style={styles.subtitleNotice}>
          *Scoring a match on CricNovas is free.
        </Text>

        <View style={styles.teamSelectorCenter}>
          {/* Team A Selector Card (with pulsing animation loop) */}
          <TeamSelectorCard
            title="Select team A"
            isAnimated={true}
            onPress={() => navigation.navigate("SelectTeam", { teamType: "A" })}
          />

          {/* VS Diamond Divider */}
          <VsBadge />

          {/* Team B Selector Card */}
          <TeamSelectorCard
            title="Select team B"
            isAnimated={false}
            onPress={() => navigation.navigate("SelectTeam", { teamType: "B" })}
          />
        </View>
      </View>
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
});
