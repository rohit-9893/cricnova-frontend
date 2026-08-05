import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-white">
        {/* Pill Tabs (For you / Club) */}
        <HomePillTabs
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab)}
        />

        {/* Empty State — API se data aayega */}
        <View className="flex-1 items-center justify-center py-24 px-8">
          <Text className="text-slate-400 text-sm font-semibold text-center leading-6">
            {activeTab === "For you"
              ? "No matches found.\nTap the sidebar menu to start a match!"
              : "No clubs found.\nJoin or create a club to see it here."}
          </Text>
        </View>
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
