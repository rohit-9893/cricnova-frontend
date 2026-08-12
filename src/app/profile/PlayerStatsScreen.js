import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import useAuthStore from "../../store/useAuthStore";
import { getPlayerStats } from "../../services/playerService";

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ label, value, iconName, iconColor = "#0D9488", bgColor = "bg-teal-50" }) => (
  <View className={`w-[30.5%] ${bgColor} rounded-2xl p-3 items-center border border-slate-100`}>
    <View className="w-9 h-9 rounded-xl bg-white justify-center items-center mb-2 shadow-sm">
      <Ionicons name={iconName} size={18} color={iconColor} />
    </View>
    <Text className="text-slate-900 text-lg font-black">{value ?? "—"}</Text>
    <Text className="text-slate-500 text-[10px] font-bold mt-0.5 text-center">{label}</Text>
  </View>
);

// ─── Section Header ──────────────────────────────────────────────────────────
const SectionHeader = ({ title, iconName }) => (
  <View className="flex-row items-center gap-2 mb-3 mt-1">
    <MaterialCommunityIcons name={iconName} size={17} color="#0D9488" />
    <Text className="text-slate-900 text-[15px] font-black tracking-wide">{title}</Text>
  </View>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────
const PlayerStatsScreen = ({ navigation, route }) => {
  const user = useAuthStore((state) => state.user) || {};
  const playerId = route?.params?.playerId || user?._id || user?.id;
  const playerName =
    route?.params?.playerName || user?.fullName || user?.name || "Cricketer";

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadStats = async (isRefresh = false) => {
    if (!isRefresh) setIsLoading(true);
    setError(null);
    try {
      if (playerId) {
        const res = await getPlayerStats(playerId);
        const data = res?.data || res?.stats || res;
        setStats(data);
      }
    } catch (err) {
      console.warn("[PLAYER STATS LOAD ERROR]:", err?.message || err);
      setError("Could not load stats. Check your connection.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [playerId]);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadStats(true);
  };

  // Stat helpers with safe fallbacks
  const batting = stats?.batting || {};
  const bowling = stats?.bowling || {};
  const fielding = stats?.fielding || {};
  const overview = stats?.overview || {};

  const battingAvg =
    batting.average != null
      ? Number(batting.average).toFixed(2)
      : batting.innings && batting.runs
      ? (batting.runs / Math.max(batting.innings - (batting.notOuts || 0), 1)).toFixed(2)
      : "—";

  const strikeRate =
    batting.strikeRate != null
      ? Number(batting.strikeRate).toFixed(1)
      : batting.runs && batting.balls
      ? ((batting.runs / batting.balls) * 100).toFixed(1)
      : "—";

  const bowlingAvg =
    bowling.average != null
      ? Number(bowling.average).toFixed(2)
      : bowling.runs && bowling.wickets
      ? (bowling.runs / Math.max(bowling.wickets, 1)).toFixed(2)
      : "—";

  const economy =
    bowling.economy != null
      ? Number(bowling.economy).toFixed(2)
      : bowling.runs && bowling.overs
      ? (bowling.runs / Math.max(bowling.overs, 1)).toFixed(2)
      : "—";

  const bestFigures = bowling.bestFigures
    ? `${bowling.bestFigures.wickets}/${bowling.bestFigures.runs}`
    : bowling.best || "—";

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["left", "right", "bottom"]}>
      <AppHeader title="Cricket Profile" onBackPress={() => navigation.goBack()} />

      {/* ── Loading State ── */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center gap-3">
          <ActivityIndicator size="large" color="#0D9488" />
          <Text className="text-slate-500 text-sm font-semibold mt-2">
            Loading career stats...
          </Text>
        </View>

      ) : error ? (
        /* ── Error State ── */
        <View className="flex-1 justify-center items-center px-8 gap-3">
          <MaterialCommunityIcons name="wifi-off" size={52} color="#CBD5E1" />
          <Text className="text-slate-500 text-sm text-center">{error}</Text>
          <TouchableOpacity
            className="mt-3 px-6 py-3 bg-[#0D9488] rounded-2xl"
            onPress={() => loadStats()}
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-sm">Retry</Text>
          </TouchableOpacity>
        </View>

      ) : (
        /* ── Main Content ── */
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="#0D9488"
            />
          }
        >
          {/* ── Hero Profile Card ── */}
          <View className="bg-[#0F172A] rounded-2xl p-5 flex-row items-center mb-5 gap-4">
            {/* Avatar */}
            <View className="w-14 h-14 rounded-full bg-[#0D9488] justify-center items-center border-2 border-[#C59B27]">
              <Text className="text-white text-2xl font-black">
                {playerName.charAt(0).toUpperCase()}
              </Text>
            </View>

            {/* Info */}
            <View className="flex-1">
              <Text className="text-white text-base font-black tracking-wide">{playerName}</Text>
              <Text className="text-slate-400 text-xs font-semibold mt-0.5">
                {user.playingRole || overview.role || "Cricketer"}
              </Text>

              {/* Badges */}
              <View className="flex-row flex-wrap gap-1.5 mt-2">
                {(user.battingStyle || overview.battingStyle) ? (
                  <View className="flex-row items-center bg-slate-800 px-2 py-0.5 rounded-full gap-1">
                    <MaterialCommunityIcons name="cricket" size={10} color="#0D9488" />
                    <Text className="text-[#0D9488] text-[10px] font-bold">
                      {user.battingStyle || overview.battingStyle}
                    </Text>
                  </View>
                ) : null}
                {(user.city || user.location) ? (
                  <View className="flex-row items-center bg-slate-800 px-2 py-0.5 rounded-full gap-1">
                    <Ionicons name="location-outline" size={10} color="#94A3B8" />
                    <Text className="text-slate-400 text-[10px] font-bold">
                      {user.city || user.location}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            {/* Matches Pill */}
            <View className="bg-slate-800 px-4 py-2 rounded-xl items-center">
              <Text className="text-white text-xl font-black">
                {overview.matches || batting.matches || 0}
              </Text>
              <Text className="text-slate-500 text-[10px] font-bold">Matches</Text>
            </View>
          </View>

          {/* ── Batting Statistics ── */}
          <SectionHeader title="Batting Statistics" iconName="cricket" />
          <View className="flex-row flex-wrap gap-2 mb-5">
            <StatCard label="Runs" value={batting.runs ?? 0} iconName="trending-up-outline" iconColor="#0D9488" bgColor="bg-teal-50" />
            <StatCard label="Average" value={battingAvg} iconName="analytics-outline" iconColor="#0D9488" bgColor="bg-teal-50" />
            <StatCard label="Strike Rate" value={strikeRate} iconName="flash-outline" iconColor="#C59B27" bgColor="bg-amber-50" />
            <StatCard label="Highest" value={batting.highestScore ?? batting.highest ?? 0} iconName="trophy-outline" iconColor="#C59B27" bgColor="bg-amber-50" />
            <StatCard label="50s" value={batting.fifties ?? 0} iconName="star-outline" iconColor="#7C3AED" bgColor="bg-violet-50" />
            <StatCard label="100s" value={batting.hundreds ?? batting.centuries ?? 0} iconName="ribbon-outline" iconColor="#DC2626" bgColor="bg-red-50" />
          </View>

          {/* ── Bowling Statistics ── */}
          <SectionHeader title="Bowling Statistics" iconName="volleyball" />
          <View className="flex-row flex-wrap gap-2 mb-5">
            <StatCard label="Wickets" value={bowling.wickets ?? 0} iconName="flame-outline" iconColor="#DC2626" bgColor="bg-red-50" />
            <StatCard label="Average" value={bowlingAvg} iconName="analytics-outline" iconColor="#DC2626" bgColor="bg-red-50" />
            <StatCard label="Economy" value={economy} iconName="speedometer-outline" iconColor="#F59E0B" bgColor="bg-amber-50" />
            <StatCard label="Best" value={bestFigures} iconName="trophy-outline" iconColor="#F59E0B" bgColor="bg-amber-50" />
            <StatCard label="5-Fers" value={bowling.fiveWicketHauls ?? bowling.fifers ?? 0} iconName="star-outline" iconColor="#7C3AED" bgColor="bg-violet-50" />
            <StatCard label="Overs" value={bowling.overs ?? 0} iconName="timer-outline" iconColor="#64748B" bgColor="bg-slate-50" />
          </View>

          {/* ── Fielding Statistics ── */}
          <SectionHeader title="Fielding" iconName="shield-outline" />
          <View className="flex-row flex-wrap gap-2 mb-5">
            <StatCard label="Catches" value={fielding.catches ?? 0} iconName="hand-left-outline" iconColor="#0D9488" bgColor="bg-teal-50" />
            <StatCard label="Run Outs" value={fielding.runOuts ?? 0} iconName="exit-outline" iconColor="#C59B27" bgColor="bg-amber-50" />
            <StatCard label="Stumpings" value={fielding.stumpings ?? 0} iconName="shield-checkmark-outline" iconColor="#7C3AED" bgColor="bg-violet-50" />
          </View>

          {/* ── Empty State (no backend data yet) ── */}
          {!stats && (
            <View className="items-center py-10 px-6 bg-white rounded-2xl border border-slate-200 mt-2">
              <MaterialCommunityIcons name="cricket" size={52} color="#CBD5E1" />
              <Text className="text-slate-900 text-lg font-extrabold mt-4">No Stats Yet</Text>
              <Text className="text-slate-500 text-sm text-center mt-2 leading-5">
                Play matches to start building your cricket career stats!
              </Text>
              <TouchableOpacity
                className="flex-row items-center gap-2 mt-5 bg-[#0D9488] px-6 py-3 rounded-2xl"
                onPress={() => navigation.navigate("StartMatchSetup")}
                activeOpacity={0.85}
              >
                <Ionicons name="play-circle-outline" size={18} color="#FFFFFF" />
                <Text className="text-white font-extrabold text-sm">Start a Match 🏏</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default PlayerStatsScreen;
