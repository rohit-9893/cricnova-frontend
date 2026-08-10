import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import useMatchStore from "../../store/useMatchStore";

const TossScreen = ({ navigation, route }) => {
  const teamA = route.params?.teamA || { teamName: "CSK", avatarInitials: "CS", avatarColor: "#7C3AED" };
  const teamB = route.params?.teamB || { teamName: "MI", avatarInitials: "MI", avatarColor: "#EC4899" };

  const [selectedWinner, setSelectedWinner] = useState(teamA);
  const [selectedChoice, setSelectedChoice] = useState("BAT");
  const [isFlipping, setIsFlipping] = useState(false);

  const setupMatch = useMatchStore((state) => state.setupMatch);
  const setTossResult = useMatchStore((state) => state.setTossResult);
  const spinValue = useRef(new Animated.Value(0)).current;

  const handleFlipCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsFlipping(false);
      // Randomly pick heads/tails winner
      const randomWinner = Math.random() > 0.5 ? teamA : teamB;
      setSelectedWinner(randomWinner);
    });
  };

  const handleStartMatch = () => {
    if (!selectedWinner) {
      Alert.alert("Select Winner", "Please select which team won the toss.");
      return;
    }

    // 1. Setup Match Store with user selected teamA, teamB, totalOvers from route params
    setupMatch({
      teamA,
      teamB,
      totalOvers: route.params?.totalOvers || 20,
      oversPerBowler: route.params?.oversPerBowler || 4,
      ballType: route.params?.selectedBallType || "tennis",
      pitchType: route.params?.selectedPitchType || "TURF",
      venue: route.params?.venue || "Stadium",
    });

    // 2. Set Toss result (calculates battingFirst vs bowlingFirst)
    setTossResult(selectedWinner, selectedChoice);

    // 3. Navigate to Live Scoring Screen
    navigation.replace("LiveScoring");
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1440deg"],
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <AppHeader
        title="Match Toss"
        onBackPress={() => navigation.goBack()}
      />

      <View className="flex-1 justify-between px-6 py-6">
        {/* Animated Coin Section */}
        <View className="items-center my-6">
          <Animated.View
            style={{
              transform: [{ rotateY: spin }],
            }}
            className="w-32 h-32 rounded-full bg-[#C59B27] justify-center items-center border-4 border-amber-300 shadow-xl mb-4"
          >
            <MaterialCommunityIcons name="currency-usd" size={64} color="#FFFFFF" />
          </Animated.View>

          <TouchableOpacity
            className="bg-emerald-50 border border-emerald-300 px-5 py-2 rounded-full"
            onPress={handleFlipCoin}
            disabled={isFlipping}
          >
            <Text className="text-[#0D9488] font-bold text-sm">
              {isFlipping ? "Flipping Coin..." : "🪙 Flip Coin"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Who Won the Toss? */}
        <View className="mb-6">
          <Text className="text-slate-800 text-sm font-extrabold mb-3">
            WHO WON THE TOSS?
          </Text>
          <View className="flex-row space-x-3">
            {[teamA, teamB].map((team, idx) => {
              const isSelected = selectedWinner?.teamName === team.teamName;
              return (
                <TouchableOpacity
                  key={idx}
                  className={`flex-1 py-4 rounded-xl border justify-center items-center flex-row space-x-2 ${
                    isSelected ? "bg-[#0D9488] border-[#0D9488]" : "bg-white border-slate-300"
                  }`}
                  onPress={() => setSelectedWinner(team)}
                >
                  <Ionicons
                    name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                    size={20}
                    color={isSelected ? "#FFFFFF" : "#64748B"}
                  />
                  <Text className={`font-bold text-base ${isSelected ? "text-white" : "text-slate-800"}`}>
                    {team.teamName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Elected To? */}
        <View className="mb-8">
          <Text className="text-slate-800 text-sm font-extrabold mb-3">
            ELECTED TO?
          </Text>
          <View className="flex-row space-x-3">
            {["BAT", "BOWL"].map((choice) => {
              const isSelected = selectedChoice === choice;
              return (
                <TouchableOpacity
                  key={choice}
                  className={`flex-1 py-4 rounded-xl border justify-center items-center flex-row space-x-2 ${
                    isSelected ? "bg-[#143D2B] border-[#143D2B]" : "bg-white border-slate-300"
                  }`}
                  onPress={() => setSelectedChoice(choice)}
                >
                  <MaterialCommunityIcons
                    name={choice === "BAT" ? "cricket" : "baseball"}
                    size={20}
                    color={isSelected ? "#FFFFFF" : "#64748B"}
                  />
                  <Text className={`font-bold text-base ${isSelected ? "text-white" : "text-slate-800"}`}>
                    {choice === "BAT" ? "BAT FIRST" : "BOWL FIRST"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Start Live Match Button */}
        <TouchableOpacity
          className="w-full h-14 bg-[#0D9488] rounded-xl justify-center items-center shadow-lg"
          activeOpacity={0.85}
          onPress={handleStartMatch}
        >
          <Text className="text-white text-base font-extrabold">
            Start Live Match Scoring ➔
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TossScreen;
