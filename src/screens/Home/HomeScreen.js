import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radius, Typography } from "../../theme";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Top Navigation Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>C</Text>
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.greetingText}>Welcome Back 👋</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={13} color="#0D9488" />
              <Text style={styles.locationText}>Delhi, India</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Live Match Card Container */}
        <View style={styles.liveCard}>
          <View style={styles.liveCardHeader}>
            <View style={styles.liveBadge}>
              <View style={styles.livePulseDot} />
              <Text style={styles.liveBadgeText}>LIVE MATCH</Text>
            </View>
            <Text style={styles.matchType}>T20 Championship</Text>
          </View>

          {/* Scoreboard Details */}
          <View style={styles.scoreboardRow}>
            {/* Team 1 */}
            <View style={styles.teamColumn}>
              <View style={[styles.teamFlagCircle, { backgroundColor: "#1D4ED8" }]}>
                <Text style={styles.teamFlagText}>IND</Text>
              </View>
              <Text style={styles.teamName}>India</Text>
              <Text style={styles.teamScore}>186/4</Text>
              <Text style={styles.teamOvers}>(18.4 ov)</Text>
            </View>

            {/* VS Divider */}
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
              <View style={styles.vsLine} />
            </View>

            {/* Team 2 */}
            <View style={styles.teamColumn}>
              <View style={[styles.teamFlagCircle, { backgroundColor: "#B45309" }]}>
                <Text style={styles.teamFlagText}>AUS</Text>
              </View>
              <Text style={styles.teamName}>Australia</Text>
              <Text style={styles.teamScore}>172/8</Text>
              <Text style={styles.teamOvers}>(20.0 ov)</Text>
            </View>
          </View>

          {/* Match Status Banner */}
          <View style={styles.matchStatusBanner}>
            <Ionicons name="flash" size={14} color="#F59E0B" />
            <Text style={styles.matchStatusText}>
              India needs 15 runs in 8 balls to win
            </Text>
          </View>
        </View>

        {/* Quick Action Grid */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          {/* Start A Match Primary Action */}
          <TouchableOpacity style={[styles.actionCard, styles.primaryActionCard]}>
            <View style={styles.actionIconContainer}>
              <MaterialCommunityIcons name="cricket" size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.primaryActionTitle}>Start a Match</Text>
            <Text style={styles.primaryActionSub}>Score live local matches</Text>
          </TouchableOpacity>

          {/* Tournaments Action */}
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIconCircle, { backgroundColor: "#FEF3C7" }]}>
              <Ionicons name="trophy" size={22} color="#D97706" />
            </View>
            <Text style={styles.actionTitle}>Tournaments</Text>
          </TouchableOpacity>

          {/* My Teams Action */}
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIconCircle, { backgroundColor: "#E0E7FF" }]}>
              <Ionicons name="people" size={22} color="#4338CA" />
            </View>
            <Text style={styles.actionTitle}>My Teams</Text>
          </TouchableOpacity>

          {/* Leaderboard Action */}
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIconCircle, { backgroundColor: "#DCFCE7" }]}>
              <Ionicons name="stats-chart" size={22} color="#15803D" />
            </View>
            <Text style={styles.actionTitle}>Leaderboard</Text>
          </TouchableOpacity>

          {/* Looking for Team Action */}
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIconCircle, { backgroundColor: "#FCE7F3" }]}>
              <FontAwesome5 name="user-friends" size={18} color="#BE185D" />
            </View>
            <Text style={styles.actionTitle}>Find Players</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Tournament Feed */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Featured Tournaments</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tournamentCard}>
          <View style={styles.tournamentHeader}>
            <Ionicons name="shield-checkmark" size={20} color="#0D9488" />
            <Text style={styles.tournamentTitle}>Delhi Corporate League 2026</Text>
          </View>
          <Text style={styles.tournamentSub}>
            16 Teams • 32 Matches • Green Park Stadium
          </Text>
          <View style={styles.tournamentFooter}>
            <Text style={styles.prizeText}>🏆 Prize Pool: ₹1,50,000</Text>
            <TouchableOpacity style={styles.registerBadge}>
              <Text style={styles.registerBadgeText}>View Matches</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
    borderWidth: 2,
    borderColor: "#EF4444",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  userTextContainer: {
    justifyContent: "center",
  },
  greetingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationText: {
    color: "#94A3B8",
    fontSize: 12,
    marginLeft: 3,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  liveCard: {
    backgroundColor: "#1E293B",
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  liveCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(220, 38, 38, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(220, 38, 38, 0.4)",
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
    marginRight: 6,
  },
  liveBadgeText: {
    color: "#EF4444",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  matchType: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
  },
  scoreboardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: Spacing.sm,
  },
  teamColumn: {
    alignItems: "center",
  },
  teamFlagCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  teamFlagText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },
  teamName: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "600",
  },
  teamScore: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },
  teamOvers: {
    color: "#94A3B8",
    fontSize: 12,
  },
  vsContainer: {
    alignItems: "center",
  },
  vsText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "800",
  },
  vsLine: {
    width: 1,
    height: 30,
    backgroundColor: "#334155",
    marginTop: 4,
  },
  matchStatusBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.sm,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  matchStatusText: {
    color: "#F59E0B",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: Spacing.md,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#1E293B",
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "flex-start",
  },
  primaryActionCard: {
    width: "100%",
    backgroundColor: "#DC2626",
    borderColor: "#EF4444",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  primaryActionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  primaryActionSub: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginTop: 2,
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  seeAllText: {
    color: "#0D9488",
    fontSize: 14,
    fontWeight: "600",
  },
  tournamentCard: {
    backgroundColor: "#1E293B",
    borderRadius: Radius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "#334155",
  },
  tournamentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  tournamentTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  tournamentSub: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: Spacing.md,
  },
  tournamentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingTop: Spacing.sm,
  },
  prizeText: {
    color: "#F59E0B",
    fontSize: 13,
    fontWeight: "600",
  },
  registerBadge: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.xs,
  },
  registerBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
