import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./MyProfileDetailsCard.styles";

const MyProfileDetailsCard = ({
  mobileNumber = "7224012604",
  gender = "Male",
  playingRole = "-",
  battingStyle = "LHB",
  bowlingStyle = "Right-arm fast",
  dob = "2000-03-02",
  email = "-",
  progressPercent = 75,
  onEditPress,
  onCompleteProfilePress,
}) => {
  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>My profile</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onEditPress}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* 2-Column Grid Fields */}
      <View style={styles.grid}>
        {/* Row 1 */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <Text style={styles.fieldLabel}>Mobile number</Text>
            <Text style={styles.fieldValue}>{mobileNumber}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.fieldLabel}>Gender</Text>
            <Text style={styles.fieldValue}>{gender}</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <Text style={styles.fieldLabel}>Playing role</Text>
            <Text style={styles.fieldValue}>{playingRole}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.fieldLabel}>Batting style</Text>
            <Text style={styles.fieldValue}>{battingStyle}</Text>
          </View>
        </View>

        {/* Row 3 */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <Text style={styles.fieldLabel}>Bowling style</Text>
            <Text style={styles.fieldValue}>{bowlingStyle}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.fieldLabel}>Date of birth</Text>
            <Text style={styles.fieldValue}>{dob}</Text>
          </View>
        </View>

        {/* Row 4 */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{email}</Text>
          </View>
        </View>
      </View>

      {/* Profile Completion Progress Bar */}
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progressPercent}%` }]}
          />
        </View>
        <Text style={styles.progressPercentText}>{progressPercent}%</Text>
      </View>

      {/* Complete Profile Link */}
      <TouchableOpacity
        style={styles.completeProfileBtn}
        activeOpacity={0.7}
        onPress={onCompleteProfilePress}
      >
        <Text style={styles.completeProfileText}>Complete profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyProfileDetailsCard;
