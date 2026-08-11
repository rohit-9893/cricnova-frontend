import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  Alert,
  StatusBar,
  Keyboard,
  Animated,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";

const TeamRosterScreen = ({ navigation, route }) => {
  const team = route.params?.team || {
    teamName: "Royal Challengers",
    location: "Indore",
    captainName: "Captain",
    captainPhone: "+91 98930 00000",
    avatarColor: "#0D9488",
    avatarInitials: "RC",
  };
  const teamType = route.params?.teamType || "A";

  // Squad Players State
  const [players, setPlayers] = useState([
    {
      id: "1",
      name: team.captainName || "Captain",
      role: "Captain & Wicket Keeper",
      phone: team.captainPhone || "+91 98930 00000",
      isCaptain: true,
    },
  ]);

  // Modal State for Adding Player
  const [isAddPlayerModalVisible, setIsAddPlayerModalVisible] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerRole, setNewPlayerRole] = useState("Batsman");
  const [newPlayerPhone, setNewPlayerPhone] = useState("");

  // Modal State for Captain Profile View
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  // Animated Value for smooth bottom margin when keyboard opens/closes in Add Player Modal
  const keyboardMarginAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardMarginAnim, {
        toValue: e.endCoordinates ? e.endCoordinates.height : 280,
        duration: Platform.OS === "ios" ? e.duration || 250 : 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      Animated.timing(keyboardMarginAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardMarginAnim]);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      Alert.alert("Required Field", "Please enter player name.");
      return;
    }

    const newPlayer = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      role: newPlayerRole,
      phone: newPlayerPhone.trim() || "+91 00000 00000",
      isCaptain: false,
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
    setNewPlayerPhone("");
    setIsAddPlayerModalVisible(false);
  };

  const handleConfirmTeam = () => {
    navigation.navigate("SelectPlayingTeams", {
      selectedTeam: {
        ...team,
        playerCount: players.length,
        playersList: players,
      },
      teamType: teamType,
    });
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Header */}
      <AppHeader
        title={team.teamName}
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity
            className="bg-[#0D9488] px-3 py-1.5 rounded-lg flex-row items-center"
            activeOpacity={0.8}
            onPress={handleConfirmTeam}
          >
            <Text className="text-white text-xs font-bold mr-1">Select Team</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Top Captain Profile Banner Card */}
        <View className="w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-6">
          <View className="flex-row items-center">
            {/* Golden Circle Avatar */}
            <View
              className="w-16 h-16 rounded-full justify-center items-center mr-4 shadow-xs"
              style={{ backgroundColor: team.avatarColor || "#0D9488" }}
            >
              <Text className="text-white text-xl font-black">
                {team.avatarInitials || "TM"}
              </Text>
            </View>

            {/* Captain & Team Info */}
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="text-lg font-black text-slate-900 mr-2" numberOfLines={1}>
                  {team.captainName || "Captain"}
                </Text>

                <View className="bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                  <Text className="text-amber-800 text-[10px] font-extrabold">
                    👑 Captain & Admin
                  </Text>
                </View>
              </View>

              <Text className="text-slate-500 text-xs font-semibold mb-1">
                📍 {team.location || "Indore"}
              </Text>
              <Text className="text-slate-400 text-xs font-medium">
                📱 {team.captainPhone || "+91 98930 00000"}
              </Text>
            </View>
          </View>
        </View>

        {/* Squad Players Roster Header */}
        <View className="flex-row items-center justify-between mb-3 px-1">
          <Text className="text-base font-black text-slate-900">
            Squad Roster ({players.length} Players)
          </Text>
          <Text className="text-slate-400 text-xs font-semibold">
            Playing XI Selection
          </Text>
        </View>

        {/* Squad Players List */}
        {players.map((item, index) => (
          <View
            key={item.id}
            className="w-full bg-white rounded-xl p-4 border border-slate-200 flex-row items-center justify-between mb-3 shadow-2xs"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 justify-center items-center mr-3">
                <MaterialCommunityIcons
                  name={item.isCaptain ? "crown" : "account"}
                  size={20}
                  color="#0D9488"
                />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="text-base font-bold text-slate-900 mr-2">
                    {item.name}
                  </Text>
                  {item.isCaptain && (
                    <Text className="text-[#0D9488] text-xs font-bold">(C)</Text>
                  )}
                </View>

                <Text className="text-slate-500 text-xs font-medium mt-0.5">
                  {item.role} • {item.phone}
                </Text>
              </View>
            </View>

            <Ionicons name="checkmark-circle" size={20} color="#0D9488" />
          </View>
        ))}
      </ScrollView>

      {/* Bottom Fixed Action Buttons (Profile & Add Player) */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex-row items-center justify-between space-x-3 shadow-lg">
        {/* Button 1: Profile */}
        <TouchableOpacity
          className="flex-1 h-13 bg-slate-100 border border-slate-300 rounded-xl justify-center items-center flex-row mr-2"
          activeOpacity={0.8}
          onPress={() => setIsProfileModalVisible(true)}
        >
          <Ionicons name="person-outline" size={18} color="#334155" className="mr-1.5" />
          <Text className="text-slate-800 text-base font-bold ml-1">Profile</Text>
        </TouchableOpacity>

        {/* Button 2: Add Player */}
        <TouchableOpacity
          className="flex-1 h-13 bg-[#0D9488] rounded-xl justify-center items-center flex-row shadow-md shadow-teal-500/20"
          activeOpacity={0.85}
          onPress={() => setIsAddPlayerModalVisible(true)}
        >
          <Ionicons name="person-add-outline" size={18} color="#FFFFFF" className="mr-1.5" />
          <Text className="text-white text-base font-extrabold ml-1">Add Player</Text>
        </TouchableOpacity>
      </View>

      {/* Add Player Modal */}
      <Modal
        visible={isAddPlayerModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAddPlayerModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-black/50 justify-end">
            <TouchableWithoutFeedback>
              <Animated.View
                className="bg-white rounded-t-3xl p-6 max-h-[85%]"
                style={{ marginBottom: keyboardMarginAnim }}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-xl font-black text-slate-900">Add New Player</Text>
                    <TouchableOpacity onPress={() => setIsAddPlayerModalVisible(false)}>
                      <Ionicons name="close-circle" size={26} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  <View className="mb-4">
                    <Text className="text-slate-700 text-xs font-bold mb-1.5">Player Name *</Text>
                    <TextInput
                      className="w-full h-12 bg-slate-50 border border-slate-300 rounded-xl px-4 text-base font-bold text-slate-900"
                      placeholder="Enter player full name"
                      placeholderTextColor="#94A3B8"
                      value={newPlayerName}
                      onChangeText={setNewPlayerName}
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="text-slate-700 text-xs font-bold mb-1.5">Playing Role</Text>
                    <View className="flex-row flex-wrap space-x-2">
                      {["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"].map((role) => (
                        <TouchableOpacity
                          key={role}
                          className={`px-3 py-2 rounded-lg border mb-2 mr-2 ${
                            newPlayerRole === role
                              ? "bg-[#0D9488] border-[#0D9488]"
                              : "bg-slate-100 border-slate-300"
                          }`}
                          onPress={() => setNewPlayerRole(role)}
                        >
                          <Text
                            className={`text-xs font-bold ${
                              newPlayerRole === role ? "text-white" : "text-slate-700"
                            }`}
                          >
                            {role}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View className="mb-6">
                    <Text className="text-slate-700 text-xs font-bold mb-1.5">Mobile Number</Text>
                    <TextInput
                      className="w-full h-12 bg-slate-50 border border-slate-300 rounded-xl px-4 text-base font-bold text-slate-900"
                      placeholder="Enter 10-digit mobile number"
                      placeholderTextColor="#94A3B8"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={newPlayerPhone}
                      onChangeText={setNewPlayerPhone}
                    />
                  </View>

                  <TouchableOpacity
                    className="w-full h-13 bg-[#0D9488] rounded-xl justify-center items-center shadow-md shadow-teal-500/20"
                    activeOpacity={0.85}
                    onPress={handleAddPlayer}
                  >
                    <Text className="text-white text-base font-extrabold">+ Save Player to Squad</Text>
                  </TouchableOpacity>
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Captain Profile View Modal */}
      <Modal
        visible={isProfileModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsProfileModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="w-full bg-white rounded-3xl p-6 items-center shadow-2xl">
            <View className="w-20 h-20 rounded-full bg-[#0D9488] justify-center items-center mb-3 shadow-md">
              <Text className="text-white text-2xl font-black">
                {team.avatarInitials || "CP"}
              </Text>
            </View>

            <Text className="text-xl font-black text-slate-900 mb-0.5">
              {team.captainName || "Captain Name"}
            </Text>
            <Text className="text-[#0D9488] text-xs font-bold mb-4">
              👑 Team Captain & Creator
            </Text>

            <View className="w-full bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200">
              <View className="flex-row justify-between mb-2">
                <Text className="text-slate-500 text-xs font-semibold">Team Name:</Text>
                <Text className="text-slate-900 text-xs font-bold">{team.teamName}</Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-slate-500 text-xs font-semibold">City / Town:</Text>
                <Text className="text-slate-900 text-xs font-bold">{team.location}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-slate-500 text-xs font-semibold">Mobile Number:</Text>
                <Text className="text-slate-900 text-xs font-bold">
                  {team.captainPhone || "+91 98930 00000"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="w-full h-12 bg-slate-900 rounded-xl justify-center items-center"
              onPress={() => setIsProfileModalVisible(false)}
            >
              <Text className="text-white text-sm font-bold">Close Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TeamRosterScreen;
