import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import GuestCityScreen from "../screens/Auth/GuestCityScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import PlaceholderScreen from "../screens/Placeholder/PlaceholderScreen";
import SelectPlayingTeamsScreen from "../screens/Match/SelectPlayingTeamsScreen";
import SelectTeamScreen from "../screens/Match/SelectTeamScreen";
import CreateTeamScreen from "../screens/Match/CreateTeamScreen";
import MyProfileScreen from "../screens/Profile/MyProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";

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
      <Stack.Screen name="GuestCity" component={GuestCityScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
      <Stack.Screen name="SelectPlayingTeams" component={SelectPlayingTeamsScreen} />
      <Stack.Screen name="SelectTeam" component={SelectTeamScreen} />
      <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
