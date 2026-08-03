import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/ui/Button";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import { Colors, Spacing, Radius, Typography } from "../../theme";

const GuestCityScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    flag: "🇮🇳",
  });
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [city, setCity] = useState("");

  const handleContinue = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Decorative top background curve */}
      <View style={styles.topBgCurve} />

      {/* Header Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Content Container */}
      <View style={styles.content}>
        <View style={styles.bottomSection}>
          {/* Heading */}
          <Text style={styles.heading}>
            Tell us your city to personalise your experience.
          </Text>
          <View style={styles.dividerBar} />

          {/* Country Selector */}
          <TouchableOpacity
            style={styles.countryDropdown}
            activeOpacity={0.7}
            onPress={() => setIsCountryModalVisible(true)}
          >
            <View style={styles.countryInfo}>
              <Text style={styles.flag}>{selectedCountry.flag}</Text>
              <Text style={styles.countryName}>{selectedCountry.name}</Text>
            </View>
            <Ionicons name="caret-down-sharp" size={14} color="#334155" />
          </TouchableOpacity>

          {/* City Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your city"
              placeholderTextColor="#94A3B8"
              value={city}
              onChangeText={setCity}
            />
          </View>

          {/* Continue Button */}
          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.continueBtn}
            textStyle={styles.continueBtnText}
          />
        </View>
      </View>

      {/* Country Selection Modal */}
      <CountryPickerModal
        visible={isCountryModalVisible}
        onClose={() => setIsCountryModalVisible(false)}
        onSelectCountry={(country) => setSelectedCountry(country)}
      />
    </SafeAreaView>
  );
};

export default GuestCityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  topBgCurve: {
    position: "absolute",
    top: -80,
    left: -40,
    right: -40,
    height: 380,
    backgroundColor: "#F1F5F9",
    borderBottomLeftRadius: 280,
    borderBottomRightRadius: 280,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  bottomSection: {
    width: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    lineHeight: 28,
  },
  dividerBar: {
    width: 32,
    height: 3,
    backgroundColor: "#94A3B8",
    borderRadius: 2,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  countryDropdown: {
    width: "100%",
    height: 50,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  countryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  countryName: {
    fontSize: Typography.body,
    fontWeight: "500",
    color: "#0F172A",
  },
  inputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: Radius.sm,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  textInput: {
    fontSize: Typography.body,
    color: "#0F172A",
  },
  continueBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#0D9488",
    borderRadius: Radius.sm,
  },
  continueBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
