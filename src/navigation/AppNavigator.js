import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import GuestCityScreen from "../screens/Auth/GuestCityScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import PlaceholderScreen from "../screens/Placeholder/PlaceholderScreen";
import SelectPlayingTeamsScreen from "../screens/Match/SelectPlayingTeamsScreen";

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
    </Stack.Navigator>
  );
};

export default AppNavigator;
