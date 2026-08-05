import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

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
    <View className="bg-white p-4 border-b-8 border-slate-100">
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-slate-900">My profile</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onEditPress}>
          <Text className="text-sm font-bold text-brand-teal">Edit</Text>
        </TouchableOpacity>
      </View>

      {/* 2-Column Grid Fields */}
      <View className="mb-4">
        {/* Row 1 */}
        <View className="flex-row mb-4">
          <View className="flex-1">
            <Text className="text-xs text-slate-400 mb-1">Mobile number</Text>
            <Text className="text-sm font-medium text-slate-800">{mobileNumber}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-400 mb-1">Gender</Text>
            <Text className="text-sm font-medium text-slate-800">{gender}</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View className="flex-row mb-4">
          <View className="flex-1">
            <Text className="text-xs text-slate-400 mb-1">Playing role</Text>
            <Text className="text-sm font-medium text-slate-800">{playingRole}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-400 mb-1">Batting style</Text>
            <Text className="text-sm font-medium text-slate-800">{battingStyle}</Text>
          </View>
        </View>

        {/* Row 3 */}
        <View className="flex-row mb-4">
          <View className="flex-1">
            <Text className="text-xs text-slate-400 mb-1">Bowling style</Text>
            <Text className="text-sm font-medium text-slate-800">{bowlingStyle}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-400 mb-1">Date of birth</Text>
            <Text className="text-sm font-medium text-slate-800">{dob}</Text>
          </View>
        </View>

        {/* Row 4 */}
        <View className="flex-row mb-4">
          <View className="flex-1">
            <Text className="text-xs text-slate-400 mb-1">Email</Text>
            <Text className="text-sm font-medium text-slate-800">{email}</Text>
          </View>
        </View>
      </View>

      {/* Profile Completion Progress Bar */}
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden mr-2.5">
          <View
            className="h-full bg-brand-teal rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </View>
        <Text className="text-xs italic text-slate-400">{progressPercent}%</Text>
      </View>

      {/* Complete Profile Link */}
      <TouchableOpacity
        className="self-center py-1"
        activeOpacity={0.7}
        onPress={onCompleteProfilePress}
      >
        <Text className="text-sm font-bold text-brand-teal">Complete profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyProfileDetailsCard;
