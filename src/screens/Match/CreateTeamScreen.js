import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/ui/AppHeader";
import SubHeaderTabs from "../../components/ui/SubHeaderTabs";
import TeamLogoPicker from "../../components/team/TeamLogoPicker";
import UnderlineInput from "../../components/ui/UnderlineInput";

const TABS = ["Your teams", "Opponents", "Add"];

const CreateTeamScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Add");

  // Form State
  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("Indore");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [addSelf, setAddSelf] = useState(false);

  const handleTabPress = (tab) => {
    if (tab === "Your teams" || tab === "Opponents") {
      navigation.navigate("SelectTeam", { teamType: "A" });
    }
  };

  return (
    <View style={styles.container}>
      {/* Red Top Header */}
      <AppHeader
        title="Create your team"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <View style={styles.headerRightActions}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="qr-code-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Sub-Header Tabs */}
      <SubHeaderTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* White Form Card Container */}
        <View style={styles.formCard}>
          {/* Logo Picker */}
          <TeamLogoPicker onPress={() => {}} />

          {/* Team Name Input */}
          <UnderlineInput
            label="Team name *"
            value={teamName}
            onChangeText={setTeamName}
            placeholder=""
          />

          {/* City / Town Input */}
          <UnderlineInput
            label="City / town *"
            value={city}
            onChangeText={setCity}
            placeholder="City / town"
          />

          {/* Captain Phone Input */}
          <UnderlineInput
            prefix="+91"
            value={captainPhone}
            onChangeText={setCaptainPhone}
            placeholder="Team captain/coordinator number (optional)"
            keyboardType="phone-pad"
            rightIcon={
              <Ionicons name="book-outline" size={20} color="#0D9488" />
            }
            onRightIconPress={() => {}}
          />

          {/* Captain Name Input */}
          <UnderlineInput
            value={captainName}
            onChangeText={setCaptainName}
            placeholder="Team captain name (optional)"
          />
        </View>

        {/* Add Yourself Checkbox Row */}
        <TouchableOpacity
          style={styles.checkboxRow}
          activeOpacity={0.8}
          onPress={() => setAddSelf(!addSelf)}
        >
          <View style={[styles.checkbox, addSelf && styles.checkboxChecked]}>
            {addSelf && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.checkboxText}>Add yourself in the team</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Bottom Teal Add Team Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addTeamBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.addTeamBtnText}>Add team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTeamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    padding: 4,
    marginLeft: 10,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#0D9488",
    borderColor: "#0D9488",
  },
  checkboxText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    padding: 12,
  },
  addTeamBtn: {
    height: 48,
    backgroundColor: "#0D9488",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addTeamBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
