import React from "react";
import { Stack } from "expo-router";

export default function MatchLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectPlayingTeamsScreen" />
      <Stack.Screen name="SelectTeamScreen" />
      <Stack.Screen name="CreateTeamScreen" />
    </Stack>
  );
}
