import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeTopHeader from "../../components/home/HomeTopHeader";
import HomePillTabs from "../../components/home/HomePillTabs";
import UserStoryFeedBar from "../../components/home/UserStoryFeedBar/UserStoryFeedBar";
import SidebarDrawer from "../../components/ui/SidebarDrawer";
import useMatchStore from "../../store/useMatchStore";
import { fetchLiveMatches } from "../../services/matchService";

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("For you");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [apiLiveMatches, setApiLiveMatches] = useState([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Local in-progress match from scoring engine (device-only, no static fallback)
  const localTeamA = useMatchStore((s) => s.teamA);
  const localTeamB = useMatchStore((s) => s.teamB);
  const localTotalRuns = useMatchStore((s) => s.totalRuns);
  const localWickets = useMatchStore((s) => s.wickets);
  const localOversCompleted = useMatchStore((s) => s.oversCompleted);
  const localLegalBalls = useMatchStore((s) => s.legalBallsInCurrentOver);
  const localTotalOvers = useMatchStore((s) => s.totalOvers);
  const isMatchFinished = useMatchStore((s) => s.isMatchFinished);
  const striker = useMatchStore((s) => s.striker);
  const nonStriker = useMatchStore((s) => s.nonStriker);
  const currentBowler = useMatchStore((s) => s.currentBowler);

  // Is there an active local scoring session on this device?
  const hasLocalLiveMatch =
    !isMatchFinished &&
    localTeamA?.teamName &&
    (localTotalRuns > 0 || localOversCompleted > 0 || localLegalBalls > 0);

  // Fetch Live Matches from Backend API
  const loadLiveMatches = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    else setIsLoadingLive(true);

    try {
      const res = await fetchLiveMatches();
      const matches = res?.data || res?.matches || res || [];
      setApiLiveMatches(Array.isArray(matches) ? matches : []);
    } catch (err) {
      console.warn("[HOME LIVE MATCHES API NOTICE]:", err?.message || err);
      setApiLiveMatches([]);
    } finally {
      setIsLoadingLive(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLiveMatches();
  }, [loadLiveMatches]);

  const onRefresh = () => {
    loadLiveMatches(true);
  };

  // Build local match display object from scoring store (no hardcoded values)
  const localMatchDisplay = hasLocalLiveMatch
    ? {
        matchId: null,
        teamA: localTeamA?.avatarInitials || localTeamA?.teamName?.substring(0, 3).toUpperCase(),
        teamB: localTeamB?.avatarInitials || localTeamB?.teamName?.substring(0, 3).toUpperCase(),
        teamAName: localTeamA?.teamName,
        teamBName: localTeamB?.teamName,
        totalRuns: localTotalRuns,
        wickets: localWickets,
        overs: `${localOversCompleted}.${localLegalBalls}`,
        totalOvers: localTotalOvers,
        crr: ((localTotalRuns / Math.max(1, localOversCompleted * 6 + localLegalBalls)) * 6).toFixed(2),
        tossInfo: "",
        striker: typeof striker === "string" ? striker : striker?.name || "",
        nonStriker: typeof nonStriker === "string" ? nonStriker : nonStriker?.name || "",
        bowler: typeof currentBowler === "string" ? currentBowler : currentBowler?.name || "",
      }
    : null;

  // Priority: API match > Local scoring session > Nothing (show empty state)
  const hasApiMatch = apiLiveMatches.length > 0;
  const displayMatch = hasApiMatch ? apiLiveMatches[0] : localMatchDisplay;
  const hasAnyMatch = Boolean(displayMatch);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["left", "right"]}>
      {/* Top Header Bar */}
      <HomeTopHeader
        onMenuPress={() => setIsSidebarVisible(true)}
        onProPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Go PRO" })
        }
        onSearchPress={() =>
          navigation && navigation.navigate && navigation.navigate("Search")
        }
        onChatPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Messages" })
        }
        onNotificationPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Notifications" })
        }
        notificationCount={0}
      />

      {/* Main Scrollable Canvas with Pull-to-Refresh */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-slate-50 px-4 py-3"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#0D9488" />
        }
      >
        {/* Pill Tabs (For you / Club) */}
        <HomePillTabs
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab)}
        />

        {activeTab === "For you" ? (
          <View className="space-y-4 my-2">
            {/* User Story Feed Bar */}
            <UserStoryFeedBar
              onProfilePress={() => navigation.navigate("MyProfile")}
              onAddPostPress={() =>
                navigation.navigate("Placeholder", { title: "Create Post / Update" })
              }
            />

            {/* ── Live Match Section ── */}
            {isLoadingLive ? (
              /* Loading Skeleton */
              <View className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm items-center justify-center" style={{ minHeight: 120 }}>
                <ActivityIndicator size="small" color="#0D9488" />
                <Text className="text-slate-400 text-xs font-semibold mt-2">
                  Fetching live matches...
                </Text>
              </View>
            ) : hasAnyMatch ? (
              /* Live Match Card */
              <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md">
                {/* Card Header */}
                <View className="flex-row justify-between items-center pb-2 border-b border-slate-100 mb-3">
                  <Text className="text-slate-500 text-[11px] font-black tracking-wider uppercase">
                    {hasLocalLiveMatch ? "YOUR LOCAL MATCH • LIVE" : "LIVE MATCH"}
                  </Text>
                  <View className="flex-row items-center bg-red-600 px-2 py-0.5 rounded-full">
                    <View className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
                    <Text className="text-white text-[9px] font-black">LIVE</Text>
                  </View>
                </View>

                {/* Match Teams & Score */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    displayMatch?.matchId &&
                    navigation.navigate("PublicLiveMatchViewer", {
                      matchId: displayMatch.matchId,
                      teamA: displayMatch.teamA,
                      teamB: displayMatch.teamB,
                      teamAName: displayMatch.teamAName,
                      teamBName: displayMatch.teamBName,
                      totalRuns: displayMatch.totalRuns,
                      wickets: displayMatch.wickets,
                      overs: displayMatch.overs,
                      crr: displayMatch.crr,
                      tossInfo: displayMatch.tossInfo,
                      striker: displayMatch.striker,
                      nonStriker: displayMatch.nonStriker,
                      bowler: displayMatch.bowler,
                    })
                  }
                >
                  {/* Team A */}
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                      <View className="w-9 h-9 rounded-full bg-[#0D9488] justify-center items-center mr-2.5 shadow-xs">
                        <Text className="text-white font-black text-xs">
                          {String(displayMatch.teamA || "").slice(0, 3).toUpperCase()}
                        </Text>
                      </View>
                      <Text className="text-slate-900 font-extrabold text-sm">
                        {displayMatch.teamAName}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-slate-900 font-black text-base">
                        {displayMatch.totalRuns}/{displayMatch.wickets}
                      </Text>
                      <Text className="text-slate-500 text-[10px] font-bold">
                        {displayMatch.overs} ov
                      </Text>
                    </View>
                  </View>

                  {/* Team B */}
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                      <View className="w-9 h-9 rounded-full bg-[#C59B27] justify-center items-center mr-2.5 shadow-xs">
                        <Text className="text-white font-black text-xs">
                          {String(displayMatch.teamB || "").slice(0, 3).toUpperCase()}
                        </Text>
                      </View>
                      <Text className="text-slate-900 font-extrabold text-sm">
                        {displayMatch.teamBName}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-slate-400 font-bold text-xs">Yet to bat</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Watch Live Button */}
                {hasApiMatch && displayMatch?.matchId && (
                  <TouchableOpacity
                    className="w-full h-11 bg-[#0D9488] rounded-xl justify-center items-center flex-row shadow-sm mt-1"
                    activeOpacity={0.85}
                    onPress={() =>
                      navigation.navigate("PublicLiveMatchViewer", {
                        matchId: displayMatch.matchId,
                        teamA: displayMatch.teamA,
                        teamB: displayMatch.teamB,
                        teamAName: displayMatch.teamAName,
                        teamBName: displayMatch.teamBName,
                        totalRuns: displayMatch.totalRuns,
                        wickets: displayMatch.wickets,
                        overs: displayMatch.overs,
                        crr: displayMatch.crr,
                        tossInfo: displayMatch.tossInfo,
                        striker: displayMatch.striker,
                        nonStriker: displayMatch.nonStriker,
                        bowler: displayMatch.bowler,
                      })
                    }
                  >
                    <Ionicons name="play-circle-outline" size={18} color="#FFFFFF" />
                    <Text className="text-white font-black text-xs ml-1.5">
                      Watch Live Spectator Broadcast 📺
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              /* No Live Matches Empty State */
              <View className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm items-center">
                <MaterialCommunityIcons name="cricket" size={40} color="#CBD5E1" />
                <Text className="text-slate-900 font-extrabold text-sm mt-3">
                  No Live Matches Right Now
                </Text>
                <Text className="text-slate-400 text-xs font-medium text-center mt-1 leading-4">
                  Pull down to refresh or start scoring{"\n"}your own match below.
                </Text>
              </View>
            )}

            {/* Quick Action Banner — Start a Match */}
            <TouchableOpacity
              className="bg-teal-50/80 p-4 rounded-2xl flex-row justify-between items-center shadow-xs border border-teal-200/80"
              activeOpacity={0.85}
              onPress={() => navigation.navigate("StartMatchSetup")}
            >
              <View className="flex-1 mr-2">
                <Text className="text-[#0D9488] font-extrabold text-xs tracking-wider uppercase mb-0.5">
                  LOCAL CRICKET
                </Text>
                <Text className="text-slate-900 font-black text-base">
                  Start Scoring a Match 🏏
                </Text>
                <Text className="text-slate-600 text-xs mt-0.5 font-medium">
                  Score local match live with ball-by-ball commentary
                </Text>
              </View>
              <Ionicons name="chevron-forward-circle" size={32} color="#0D9488" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-20 px-8">
            <Text className="text-slate-400 text-sm font-semibold text-center leading-6">
              No clubs found. Join or create a club to see it here.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Animated Sidebar Drawer Modal */}
      <SidebarDrawer
        visible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
