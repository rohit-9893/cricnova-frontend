import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../app/splash/SplashScreen";
import LoginScreen from "../app/(auth)/LoginScreen";
import MobileInputScreen from "../app/(auth)/MobileInputScreen";
import OtpVerifyScreen from "../app/(auth)/OtpVerifyScreen";
import RegisterScreen from "../app/(auth)/RegisterScreen";
import GuestCityScreen from "../app/(auth)/GuestCityScreen";
import HomeScreen from "../app/(home)/HomeScreen";
import PlaceholderScreen from "../app/placeholder/PlaceholderScreen";
import SelectPlayingTeamsScreen from "../app/match/SelectPlayingTeamsScreen";
import SelectTeamScreen from "../app/match/SelectTeamScreen";
import CreateTeamScreen from "../app/match/CreateTeamScreen";
import TeamRosterScreen from "../app/team/TeamRosterScreen";
import StartMatchSetupScreen from "../app/match/StartMatchSetupScreen";
import CreateTournamentScreen from "../app/tournament/CreateTournamentScreen";
import MyProfileScreen from "../app/profile/MyProfileScreen";
import EditProfileScreen from "../app/profile/EditProfileScreen";
import PlayerStatsScreen from "../app/profile/PlayerStatsScreen";
import SearchScreen from "../app/search/SearchScreen";

import TossScreen from "../app/match/TossScreen";
import StartInningsScreen from "../app/match/StartInningsScreen";
import LiveScoringScreen from "../app/match/LiveScoringScreen";
import PublicLiveMatchViewerScreen from "../app/match/PublicLiveMatchViewerScreen";
import MatchSummaryScreen from "../app/match/MatchSummaryScreen";
import FullScorecardScreen from "../app/match/FullScorecardScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MobileInput" component={MobileInputScreen} />
      <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
      <Stack.Screen name="GuestCity" component={GuestCityScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
      <Stack.Screen name="SelectPlayingTeams" component={SelectPlayingTeamsScreen} />
      <Stack.Screen name="SelectTeam" component={SelectTeamScreen} />
      <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
      <Stack.Screen name="TeamRoster" component={TeamRosterScreen} />
      <Stack.Screen name="StartMatchSetup" component={StartMatchSetupScreen} />
      <Stack.Screen name="Toss" component={TossScreen} />
      <Stack.Screen name="StartInnings" component={StartInningsScreen} />
      <Stack.Screen name="LiveScoring" component={LiveScoringScreen} />
      <Stack.Screen name="PublicLiveMatchViewer" component={PublicLiveMatchViewerScreen} />
      <Stack.Screen name="MatchSummary" component={MatchSummaryScreen} />
      <Stack.Screen name="FullScorecard" component={FullScorecardScreen} />
      <Stack.Screen name="CreateTournament" component={CreateTournamentScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="PlayerStats" component={PlayerStatsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
