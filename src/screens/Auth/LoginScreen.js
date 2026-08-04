import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import { Colors, Spacing, Radius, Typography } from "../../theme";

const LoginScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    flag: "🇮🇳",
  });
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Decorative top background curve */}
      <View style={styles.topBgCurve} />

      <View style={styles.content}>
        {/* Top Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoIconContainer}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="cricket" size={44} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.brandTitle}>
            Cric<Text style={styles.brandRed}>Novas</Text>
            <Text style={styles.tmSymbol}>™</Text>
          </Text>
          <Text style={styles.brandSubtitle}>Your cricket matters</Text>
          <View style={styles.dividerBar} />
        </View>

        {/* Bottom Auth Section */}
        <View style={styles.formSection}>
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

          {/* Divider with text */}
          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Login with</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* WhatsApp Button (UI only) */}
          <TouchableOpacity style={styles.whatsappBtn} activeOpacity={0.8}>
            <FontAwesome name="whatsapp" size={22} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.whatsappText}>WhatsApp</Text>
          </TouchableOpacity>

          {/* Mobile Number Button */}
          <TouchableOpacity
            style={styles.mobileBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="phone-portrait-outline" size={20} color="#1E293B" style={styles.btnIcon} />
            <Text style={styles.mobileText}>Mobile number</Text>
          </TouchableOpacity>

          {/* Terms and Privacy Footer */}
          <Text style={styles.termsText}>
            By signing in, you agree to our{" "}
            <Text style={styles.termsLink}>terms of service</Text> and{" "}
            <Text style={styles.termsLink}>privacy policy</Text>.
          </Text>

          {/* Explore as a Guest */}
          <TouchableOpacity
            style={styles.guestContainer}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("GuestCity")}
          >
            <Text style={styles.guestText}>Explore as a guest</Text>
          </TouchableOpacity>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  topBgCurve: {
    position: "absolute",
    top: -100,
    left: -50,
    right: -50,
    height: 360,
    backgroundColor: "#F1F5F9",
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  logoSection: {
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  logoIconContainer: {
    marginBottom: Spacing.sm,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  brandRed: {
    color: "#DC2626",
    fontWeight: "bold",
  },
  tmSymbol: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "bold",
  },
  brandSubtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 2,
    fontStyle: "italic",
  },
  dividerBar: {
    width: 36,
    height: 3,
    backgroundColor: "#94A3B8",
    borderRadius: 2,
    marginTop: 16,
  },
  formSection: {
    width: "100%",
    alignItems: "center",
  },
  countryDropdown: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
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
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.lg,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CBD5E1",
  },
  separatorText: {
    marginHorizontal: Spacing.md,
    color: "#64748B",
    fontSize: Typography.caption,
  },
  whatsappBtn: {
    width: "100%",
    height: 48,
    backgroundColor: "#0D9488",
    borderRadius: Radius.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
    elevation: 1,
  },
  whatsappText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  mobileBtn: {
    width: "100%",
    height: 48,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#94A3B8",
    borderRadius: Radius.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  mobileText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
  },
  btnIcon: {
    marginRight: Spacing.sm,
  },
  termsText: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  termsLink: {
    textDecorationLine: "underline",
  },
  guestContainer: {
    paddingVertical: Spacing.xs,
  },
  guestText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D9488",
    textDecorationLine: "underline",
  },
});
