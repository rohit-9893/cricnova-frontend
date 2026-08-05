import React, { useState } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTopHeader from "../../components/home/HomeTopHeader";
import HomeSearchBar from "../../components/home/HomeSearchBar";
import HomePillTabs from "../../components/home/HomePillTabs";
import HomeFeedCard from "../../components/home/HomeFeedCard";
import SidebarDrawer from "../../components/ui/SidebarDrawer";

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("For you");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F0F7F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7F2" />

      {/* Top Header Bar (Sidebar ☰ + CricNovas + Golden Bell 🔔) */}
      <HomeTopHeader
        onMenuPress={() => setIsSidebarVisible(true)}
        onNotificationPress={() =>
          navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Notifications" })
        }
      />

      {/* Main Scrollable Canvas */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Search Input Bar */}
        <HomeSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search matches, players..."
        />

        {/* Forest Green Pill Tabs (For you / Club) */}
        <HomePillTabs
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab)}
        />

        {/* Feed Cards Section */}
        {activeTab === "For you" ? (
          <View className="pb-8">
            <HomeFeedCard
              title="🏆 Local Premier League 2026"
              subtitle="Live • Indore XI vs Bhopal Tigers"
              onPress={() =>
                navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Match Details" })
              }
            />
            <HomeFeedCard
              title="🏏 Weekend T20 Knockout Tournament"
              subtitle="Registration Open • 8 Teams Slot Remaining"
              onPress={() =>
                navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Tournament Registration" })
              }
            />
            <HomeFeedCard
              title="🔥 Player of the Month Leaderboard"
              subtitle="Top Scorer: Rohit Panchal (342 Runs)"
              onPress={() =>
                navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Leaderboard" })
              }
            />
          </View>
        ) : (
          <View className="pb-8">
            <HomeFeedCard
              title="🛡️ Royal Cricket Club"
              subtitle="Indore • 24 Members"
              onPress={() =>
                navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Club Details" })
              }
            />
            <HomeFeedCard
              title="🛡️ Strikers XI Cricket Club"
              subtitle="Bhopal • 18 Members"
              onPress={() =>
                navigation && navigation.navigate && navigation.navigate("Placeholder", { title: "Club Details" })
              }
            />
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
