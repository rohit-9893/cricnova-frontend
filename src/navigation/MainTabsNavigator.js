import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../app/(home)/HomeScreen";
import PlaceholderScreen from "../app/placeholder/PlaceholderScreen";
import BottomTabBar from "../components/navigation/BottomTabBar";

/**
 * MainTabsNavigator - Persistent Application Shell
 * Home tab renders HomeScreen.
 * All other 4 tabs (Looking, My Cricket, Community, Store) render clean PlaceholderScreen.
 */
const MainTabsNavigator = ({ navigation, route }) => {
  const routeTab = route?.params?.initialTab || route?.params?.screen;
  const getTabKeyFromRoute = (rTab) => {
    if (rTab === "Looking") return "Looking";
    if (rTab === "My Cricket") return "My Cricket";
    if (rTab === "Community") return "Community";
    if (rTab === "Store") return "Store";
    return "Home";
  };

  const [activeTab, setActiveTab] = useState(getTabKeyFromRoute(routeTab));

  useEffect(() => {
    if (routeTab) {
      setActiveTab(getTabKeyFromRoute(routeTab));
    }
  }, [routeTab]);

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "Home":
        return <HomeScreen navigation={navigation} route={route} />;
      case "Looking":
        return (
          <PlaceholderScreen
            navigation={navigation}
            route={{ ...route, params: { title: "Looking" } }}
          />
        );
      case "My Cricket":
        return (
          <PlaceholderScreen
            navigation={navigation}
            route={{ ...route, params: { title: "My Cricket" } }}
          />
        );
      case "Community":
        return (
          <PlaceholderScreen
            navigation={navigation}
            route={{ ...route, params: { title: "Community" } }}
          />
        );
      case "Store":
        return (
          <PlaceholderScreen
            navigation={navigation}
            route={{ ...route, params: { title: "Store" } }}
          />
        );
      default:
        return <HomeScreen navigation={navigation} route={route} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>{renderActiveScreen()}</View>
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentArea: {
    flex: 1,
  },
});

export default MainTabsNavigator;
