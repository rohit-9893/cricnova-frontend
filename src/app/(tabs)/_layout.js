import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0D9488", // Header Teal Brand Color
        tabBarInactiveTintColor: "#334155", // Dark Inactive
        tabBarStyle: {
          height: 64,
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="looking"
        options={{
          title: "Looking",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="binoculars" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mycricket"
        options={{
          title: "My Cricket",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cricket" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "bag-handle" : "bag-handle-outline"} size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
