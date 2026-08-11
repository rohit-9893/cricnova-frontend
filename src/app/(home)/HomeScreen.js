import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeTopHeader from "../../components/home/HomeTopHeader";
import HomePillTabs from "../../components/home/HomePillTabs";
import SidebarDrawer from "../../components/ui/SidebarDrawer";

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("For you");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["left", "right", "bottom"]}>
      {/* Top Header Bar with status bar inset fill */}
      <HomeTopHeader
        onMenuPress={() => setIsSidebarVisible(true)}
        onProPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Go PRO" })
        }
        onSearchPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Search" })
        }
        onChatPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Messages" })
        }
        onNotificationPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Notifications" })
        }
        notificationCount={2}
      />

      {/* Main Scrollable Canvas */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-slate-50 px-4 py-3">
        {/* Pill Tabs (For you / Club) */}
        <HomePillTabs
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab)}
        />

        {activeTab === "For you" ? (
          <View className="space-y-4 my-2">
            {/* Live Featured Match Card (Crex Style) */}
            <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md">
              <View className="flex-row justify-between items-center pb-2 border-b border-slate-100 mb-3">
                <Text className="text-slate-500 text-[11px] font-black tracking-wider uppercase">
                  35TH LIST A • LIVE MATCH
                </Text>
                <View className="flex-row items-center bg-red-600 px-2 py-0.5 rounded-full">
                  <View className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
                  <Text className="text-white text-[9px] font-black">LIVE</Text>
                </View>
              </View>

              {/* Match Teams & Score Row */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate("PublicLiveMatchViewer", {
                    matchId: "26303040",
                    teamA: "ITA",
                    teamB: "UGN",
                    teamAName: "Italy",
                    teamBName: "Uganda",
                    totalRuns: 14,
                    wickets: 0,
                    overs: "5.0",
                    crr: "2.80",
                    tossInfo: "Italy won the toss and elected to bat",
                    striker: "Justin Mosca",
                    nonStriker: "Anthony Mosca",
                    bowler: "Alpesh Ramjani",
                  })
                }
              >
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                    <View className="w-9 h-9 rounded-full bg-emerald-600 justify-center items-center mr-2.5">
                      <Text className="text-white font-black text-xs">ITA</Text>
                    </View>
                    <Text className="text-slate-900 font-extrabold text-sm">Italy</Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-slate-900 font-black text-base">14-0</Text>
                    <Text className="text-slate-500 text-[10px] font-bold">5.0 ov</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                    <View className="w-9 h-9 rounded-full bg-indigo-600 justify-center items-center mr-2.5">
                      <Text className="text-white font-black text-xs">UGN</Text>
                    </View>
                    <Text className="text-slate-900 font-extrabold text-sm">Uganda</Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-slate-400 font-bold text-xs">Yet to bat</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Action Button: Watch Live Spectator Stream */}
              <TouchableOpacity
                className="w-full h-11 bg-slate-900 rounded-xl justify-center items-center flex-row shadow-sm mt-1"
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate("PublicLiveMatchViewer", {
                    matchId: "26303040",
                    teamA: "ITA",
                    teamB: "UGN",
                    teamAName: "Italy",
                    teamBName: "Uganda",
                    totalRuns: 14,
                    wickets: 0,
                    overs: "5.0",
                    crr: "2.80",
                    tossInfo: "Italy won the toss and elected to bat",
                    striker: "Justin Mosca",
                    nonStriker: "Anthony Mosca",
                    bowler: "Alpesh Ramjani",
                  })
                }
              >
                <Ionicons name="play-circle-outline" size={18} color="#FFFFFF" />
                <Text className="text-white font-black text-xs ml-1.5">
                  Watch Live Match Spectator Broadcast 📺
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Action Banner */}
            <TouchableOpacity
              className="bg-[#143D2B] p-4 rounded-2xl flex-row justify-between items-center shadow-md border border-emerald-800"
              activeOpacity={0.85}
              onPress={() => navigation.navigate("StartMatchSetup")}
            >
              <View className="flex-1 mr-2">
                <Text className="text-emerald-400 font-extrabold text-xs tracking-wider uppercase mb-0.5">
                  LOCAL CRICKET
                </Text>
                <Text className="text-white font-black text-base">
                  Start Scoring a Match 🏏
                </Text>
                <Text className="text-slate-300 text-xs mt-0.5">
                  Score local match live with ball-by-ball commentary
                </Text>
              </View>
              <Ionicons name="chevron-forward-circle" size={32} color="#10B981" />
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
