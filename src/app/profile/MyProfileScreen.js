import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import ProfileHeaderCard from "../../components/profile/ProfileHeaderCard";
import CustomJerseyCarousel from "../../components/profile/CustomJerseyCarousel";
import ProMembershipBanner from "../../components/profile/ProMembershipBanner";
import MyProfileDetailsCard from "../../components/profile/MyProfileDetailsCard";
import ConnectionsCard from "../../components/profile/ConnectionsCard";
import ProfileSettingsList from "../../components/profile/ProfileSettingsList";

const MyProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Red Header Bar */}
      <AppHeader
        title=""
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity
            style={styles.headerRightAction}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Placeholder", { title: "Cricket Profile" })}
          >
            <Text style={styles.headerRightText}>Your cricket profile</Text>
            <Ionicons name="chevron-forward-circle-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      {/* Main Scrollable Canvas */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header Details & Stats Card */}
        <ProfileHeaderCard
          name=""
          location=""
          sinceDate=""
          followersCount={0}
          viewsCount={0}
          onGoProPress={() => navigation.navigate("Placeholder", { title: "PRO Membership" })}
          onEditAvatarPress={() => navigation.navigate("EditProfile")}
          onQrPress={() => navigation.navigate("Placeholder", { title: "Your QR Code" })}
        />

        {/* Custom Jersey Store Carousel */}
        <CustomJerseyCarousel
          userName=""
          onItemPress={() => navigation.navigate("Placeholder", { title: "Custom Jersey Store" })}
        />

        {/* PRO Membership Banner Card */}
        <ProMembershipBanner
          onBecomeProPress={() => navigation.navigate("Placeholder", { title: "Become A PRO" })}
        />

        {/* My Profile Details Card (Grid Fields + Progress Bar + Complete Profile) */}
        <MyProfileDetailsCard
          mobileNumber=""
          gender=""
          playingRole=""
          battingStyle=""
          bowlingStyle=""
          dob=""
          email=""
          progressPercent={0}
          onEditPress={() => navigation.navigate("EditProfile")}
          onCompleteProfilePress={() => navigation.navigate("EditProfile")}
        />

        {/* Connections Card (Overlapping Player Avatars + Subtitle + Find Cricketers) */}
        <ConnectionsCard
          onFindCricketersPress={() => navigation.navigate("Placeholder", { title: "Find Cricketers" })}
        />

        {/* Settings Links, Logout, Clear Data, Delete Account & Version */}
        <ProfileSettingsList
          appVersion="Version 1.0.0 (490)"
          onItemPress={(item) => navigation.navigate("Placeholder", { title: item.title })}
          onLogoutPress={() =>
            Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", style: "destructive", onPress: () => navigation.navigate("Login") },
            ])
          }
          onClearDataPress={() =>
            Alert.alert("Clear Data", "App cache and local data cleared successfully.")
          }
          onDeleteAccountPress={() =>
            Alert.alert("Delete Account", "Are you sure you want to delete your account?")
          }
        />
      </ScrollView>

      {/* Fixed Bottom Safety Notice Bar */}
      <View style={styles.bottomNoticeBar}>
        <Text style={styles.bottomNoticeText}>
          To keep your stats safe, add your <Text style={styles.boldText}>Email</Text> now.
        </Text>
      </View>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerRightAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 6,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  bottomNoticeBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#CCFBF1",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#99F6E4",
  },
  bottomNoticeText: {
    color: "#0F172A",
    fontSize: 13,
  },
  boldText: {
    fontWeight: "bold",
  },
});
