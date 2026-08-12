import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { searchPlayers, searchTeams, searchTournaments } from "../../services/searchService";

// ─── Filter Tabs ─────────────────────────────────────────────────────────────
const TABS = [
  { key: "players", label: "Players", icon: "person-outline" },
  { key: "teams", label: "Teams", icon: "people-outline" },
  { key: "tournaments", label: "Tournaments", icon: "trophy-outline" },
];

// ─── Player Result Card ───────────────────────────────────────────────────────
const PlayerCard = ({ item, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-sm"
    activeOpacity={0.85}
    onPress={() => onPress && onPress(item)}
  >
    <View className="w-12 h-12 rounded-full bg-[#0D9488] justify-center items-center mr-3">
      <Text className="text-white text-lg font-black">
        {(item.name || item.fullName || "?").charAt(0).toUpperCase()}
      </Text>
    </View>
    <View className="flex-1">
      <Text className="text-slate-900 font-extrabold text-sm">
        {item.name || item.fullName || "Unknown Player"}
      </Text>
      <Text className="text-slate-500 text-xs font-semibold mt-0.5">
        {[item.playingRole, item.city || item.location].filter(Boolean).join(" • ") || "Cricketer"}
      </Text>
    </View>
    <View className="items-end">
      {item.battingStyle ? (
        <View className="flex-row items-center bg-teal-50 px-2 py-0.5 rounded-full">
          <MaterialCommunityIcons name="cricket" size={10} color="#0D9488" />
          <Text className="text-teal-700 text-[10px] font-bold ml-0.5">{item.battingStyle}</Text>
        </View>
      ) : null}
    </View>
  </TouchableOpacity>
);

// ─── Team Result Card ─────────────────────────────────────────────────────────
const TeamCard = ({ item, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-sm"
    activeOpacity={0.85}
    onPress={() => onPress && onPress(item)}
  >
    <View
      className="w-12 h-12 rounded-full justify-center items-center mr-3"
      style={{ backgroundColor: item.avatarColor || "#0D9488" }}
    >
      <Text className="text-white text-sm font-black">
        {(item.teamName || item.name || "T").slice(0, 2).toUpperCase()}
      </Text>
    </View>
    <View className="flex-1">
      <Text className="text-slate-900 font-extrabold text-sm">
        {item.teamName || item.name || "Unknown Team"}
      </Text>
      <Text className="text-slate-500 text-xs font-semibold mt-0.5">
        {item.playerCount ? `${item.playerCount} players` : "Team"}
        {item.city ? ` • ${item.city}` : ""}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
  </TouchableOpacity>
);

// ─── Tournament Result Card ───────────────────────────────────────────────────
const TournamentCard = ({ item, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-sm"
    activeOpacity={0.85}
    onPress={() => onPress && onPress(item)}
  >
    <View className="w-12 h-12 rounded-full bg-[#C59B27]/20 justify-center items-center mr-3 border border-[#C59B27]/30">
      <Ionicons name="trophy" size={22} color="#C59B27" />
    </View>
    <View className="flex-1">
      <Text className="text-slate-900 font-extrabold text-sm">
        {item.name || item.tournamentName || "Unknown Tournament"}
      </Text>
      <Text className="text-slate-500 text-xs font-semibold mt-0.5">
        {[item.category, item.matchType].filter(Boolean).join(" • ") || "Tournament"}
      </Text>
    </View>
    <View className="bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
      <Text className="text-[#0D9488] text-[10px] font-bold">
        {item.status || "OPEN"}
      </Text>
    </View>
  </TouchableOpacity>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ query, tab }) => (
  <View className="flex-1 justify-center items-center py-16 px-8">
    <MaterialCommunityIcons name="magnify" size={52} color="#CBD5E1" />
    {query.length > 0 ? (
      <>
        <Text className="text-slate-900 text-base font-extrabold mt-4 text-center">
          No {tab} found
        </Text>
        <Text className="text-slate-500 text-sm text-center mt-2 leading-5">
          No results for "{query}".{"\n"}Try a different name or spelling.
        </Text>
      </>
    ) : (
      <>
        <Text className="text-slate-900 text-base font-extrabold mt-4 text-center">
          Search CricNovas
        </Text>
        <Text className="text-slate-500 text-sm text-center mt-2 leading-5">
          Find players, teams and tournaments{"\n"}by name or phone number.
        </Text>
      </>
    )}
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SearchScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("players");
  const [results, setResults] = useState({ players: [], teams: [], tournaments: [] });
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef(null);
  const inputRef = useRef(null);

  const runSearch = useCallback(async (text, tab) => {
    if (!text || text.trim().length < 2) {
      setResults({ players: [], teams: [], tournaments: [] });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      if (tab === "players") {
        const res = await searchPlayers(text.trim());
        const data = res?.data || res?.players || res || [];
        setResults((prev) => ({ ...prev, players: Array.isArray(data) ? data : [] }));
      } else if (tab === "teams") {
        const res = await searchTeams(text.trim());
        const data = res?.data || res?.teams || res || [];
        setResults((prev) => ({ ...prev, teams: Array.isArray(data) ? data : [] }));
      } else if (tab === "tournaments") {
        const res = await searchTournaments(text.trim());
        const data = res?.data || res?.tournaments || res || [];
        setResults((prev) => ({ ...prev, tournaments: Array.isArray(data) ? data : [] }));
      }
    } catch (err) {
      console.warn("[SEARCH ERROR]:", err?.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleQueryChange = (text) => {
    setQuery(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      runSearch(text, activeTab);
    }, 400);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (query.trim().length >= 2) {
      runSearch(query, tab);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults({ players: [], teams: [], tournaments: [] });
    inputRef.current?.focus();
  };

  const currentResults = results[activeTab] || [];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* ── Standard Brand Header (Same Teal #0D9488 + Zero Top White Space) ── */}
      <View style={{ paddingTop: insets.top }} className="bg-[#0D9488] w-full">
        <StatusBar barStyle="light-content" backgroundColor="#0D9488" translucent={true} />
        
        {/* Header Top Bar */}
        <View className="flex-row items-center px-3 h-14">
          <TouchableOpacity
            className="p-1 mr-2"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Search</Text>
        </View>

        {/* Search Input Box */}
        <View className="px-4 pb-3">
          <View className="flex-row items-center bg-white rounded-2xl px-3.5 h-11 shadow-sm">
            <Ionicons name="search-outline" size={18} color="#0D9488" />
            <TextInput
              ref={inputRef}
              className="flex-1 ml-2 text-slate-900 text-sm font-semibold p-0"
              placeholder="Search players, teams, tournaments..."
              placeholderTextColor="#94A3B8"
              value={query}
              onChangeText={handleQueryChange}
              autoFocus
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={handleClear} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* ── Filter Tabs ── */}
      <View className="flex-row bg-white border-b border-slate-200 px-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 flex-row justify-center items-center py-3 gap-1.5 border-b-2 ${
                isActive ? "border-[#0D9488]" : "border-transparent"
              }`}
              onPress={() => handleTabChange(tab.key)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={tab.icon}
                size={15}
                color={isActive ? "#0D9488" : "#94A3B8"}
              />
              <Text
                className={`text-xs font-bold ${
                  isActive ? "text-[#0D9488]" : "text-slate-400"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Results ── */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0D9488" />
          <Text className="text-slate-500 text-sm font-semibold mt-3">Searching...</Text>
        </View>
      ) : currentResults.length > 0 ? (
        <FlatList
          data={currentResults}
          keyExtractor={(item, i) => item._id || item.id || String(i)}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (activeTab === "players") return <PlayerCard item={item} />;
            if (activeTab === "teams") return <TeamCard item={item} />;
            if (activeTab === "tournaments") return <TournamentCard item={item} />;
            return null;
          }}
          ListHeaderComponent={
            <Text className="text-slate-500 text-xs font-bold mb-3 uppercase tracking-wider">
              {currentResults.length} result{currentResults.length !== 1 ? "s" : ""} found
            </Text>
          }
        />
      ) : (
        <EmptyState query={query} tab={activeTab} />
      )}
    </View>
  );
};

export default SearchScreen;
