import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import useAuthStore from "../../../store/useAuthStore";

const UserStoryFeedBar = ({ onProfilePress }) => {
  const user = useAuthStore((state) => state.user) || {};
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isTextModalVisible, setIsTextModalVisible] = useState(false);
  const [textContent, setTextContent] = useState("");

  const profileImage =
    user.profileImageUrl ||
    user.profilePhoto ||
    user.photo ||
    user.avatarUrl;

  // 1. Open Gallery
  const handleOpenGallery = async () => {
    setIsMenuVisible(false);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Allow access to photo library to share updates.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType?.Images || ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        Alert.alert("Cricket Story Shared 🏏", "Your photo update has been posted successfully!");
      }
    } catch (err) {
      console.warn("[GALLERY STORY ERROR]:", err);
    }
  };

  // 2. Open Camera
  const handleOpenCamera = async () => {
    setIsMenuVisible(false);
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Allow camera access to take a live photo update.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        Alert.alert("Cricket Story Shared 🏏", "Your live photo update has been posted successfully!");
      }
    } catch (err) {
      console.warn("[CAMERA STORY ERROR]:", err);
    }
  };

  // 3. Submit Text Status
  const handlePostTextStatus = () => {
    if (!textContent.trim()) {
      Alert.alert("Empty Post", "Please enter a message to share.");
      return;
    }
    setIsTextModalVisible(false);
    setTextContent("");
    Alert.alert("Update Posted 🎉", "Your cricket status update has been published!");
  };

  return (
    <View className="flex-row items-center my-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs relative">
      {/* Left: User Story Avatar Circle with (+) Badge */}
      <TouchableOpacity
        className="items-center mr-3"
        activeOpacity={0.8}
        onPress={() => setIsMenuVisible(true)}
      >
        <View className="relative">
          <View className="w-14 h-14 rounded-full bg-slate-800 justify-center items-center overflow-hidden border-2 border-[#0D9488] shadow-sm">
            {profileImage ? (
              <Image source={{ uri: profileImage }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <Ionicons name="person" size={32} color="#CBD5E1" />
            )}
          </View>

          {/* Teal (+) Plus Badge Icon */}
          <View className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#0D9488] justify-center items-center border-2 border-white shadow-xs">
            <Ionicons name="add" size={12} color="#FFFFFF" />
          </View>
        </View>

        <Text className="text-slate-800 text-[11px] font-extrabold mt-1 text-center" numberOfLines={1}>
          You
        </Text>
      </TouchableOpacity>

      {/* Right: Speech Bubble Recommendation Box */}
      <TouchableOpacity
        className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-200 relative justify-center"
        activeOpacity={0.85}
        onPress={() => setIsMenuVisible(true)}
      >
        <Text className="text-slate-600 text-xs font-medium leading-5">
          Follow your favourite cricketers to see their updates here.
        </Text>
      </TouchableOpacity>

      {/* Quick Action Popup Menu Modal (Gallery, Camera, Text) */}
      <Modal visible={isMenuVisible} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-center items-center px-6"
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} className="bg-white rounded-2xl p-3 w-56 shadow-2xl border border-slate-100">
            {/* Gallery Option */}
            <TouchableOpacity
              className="flex-row items-center px-3 py-3 rounded-xl active:bg-slate-100"
              onPress={handleOpenGallery}
            >
              <Ionicons name="images-outline" size={22} color="#334155" className="mr-3" style={{ width: 28 }} />
              <Text className="text-slate-900 font-extrabold text-base ml-2">Gallery</Text>
            </TouchableOpacity>

            {/* Camera Option */}
            <TouchableOpacity
              className="flex-row items-center px-3 py-3 rounded-xl active:bg-slate-100"
              onPress={handleOpenCamera}
            >
              <Ionicons name="camera-outline" size={22} color="#334155" className="mr-3" style={{ width: 28 }} />
              <Text className="text-slate-900 font-extrabold text-base ml-2">Camera</Text>
            </TouchableOpacity>

            {/* Text (Aa) Option */}
            <TouchableOpacity
              className="flex-row items-center px-3 py-3 rounded-xl active:bg-slate-100"
              onPress={() => {
                setIsMenuVisible(false);
                setIsTextModalVisible(true);
              }}
            >
              <Text className="font-serif text-lg font-black text-slate-800 mr-3" style={{ width: 28, textAlign: "center" }}>
                Aa
              </Text>
              <Text className="text-slate-900 font-extrabold text-base ml-2">Text</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Text Post Creator Compose Modal */}
      <Modal visible={isTextModalVisible} transparent animationType="slide">
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-end"
          activeOpacity={1}
          onPress={() => setIsTextModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-5 border-t border-slate-200">
            <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-4" />
            <Text className="text-slate-900 font-black text-base mb-3">Create Text Update 🏏</Text>

            <TextInput
              className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-slate-900 font-medium text-sm min-h-[100px] text-top"
              placeholder="What's happening in your cricket match today?"
              placeholderTextColor="#94A3B8"
              multiline
              value={textContent}
              onChangeText={setTextContent}
            />

            <View className="flex-row justify-end space-x-3 mt-4">
              <TouchableOpacity
                className="px-4 py-2.5 rounded-xl bg-slate-200 mr-2"
                onPress={() => setIsTextModalVisible(false)}
              >
                <Text className="text-slate-700 font-bold text-xs">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-5 py-2.5 rounded-xl bg-[#0D9488]"
                onPress={handlePostTextStatus}
              >
                <Text className="text-white font-black text-xs">Post Update</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default UserStoryFeedBar;
