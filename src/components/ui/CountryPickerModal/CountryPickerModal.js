import React, { useState, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COUNTRIES } from "../../../constants/countries";
import { Colors, Spacing, Radius, Typography } from "../../../theme";

const CountryPickerModal = ({ visible, onClose, onSelectCountry }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const query = searchQuery.toLowerCase().trim();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.dialCode.includes(query)
    );
  }, [searchQuery]);

  const handleSelect = (country) => {
    onSelectCountry(country);
    setSearchQuery("");
    onClose();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryRow}
      activeOpacity={0.7}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

        {/* Decorative background curve */}
        <View style={styles.topBgCurve} />

        {/* Top Header with Back Arrow */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Search Input Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#64748B"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by country name"
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Country List Container */}
        <View style={styles.listCardContainer}>
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code + item.name}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CountryPickerModal;

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
    height: 360,
    backgroundColor: "#F1F5F9",
    borderBottomLeftRadius: 280,
    borderBottomRightRadius: 280,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  searchSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchBox: {
    height: 48,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.body,
    color: "#0F172A",
    height: "100%",
  },
  listCardContainer: {
    flex: 1,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: Radius.sm,
    overflow: "hidden",
  },
  listContent: {
    paddingVertical: Spacing.xs,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
  },
  flag: {
    fontSize: 22,
    marginRight: Spacing.md,
  },
  countryName: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginLeft: 50,
    marginRight: Spacing.md,
  },
});
