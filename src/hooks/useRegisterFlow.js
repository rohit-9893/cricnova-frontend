import { useState, useRef, useEffect } from "react";
import { Alert, Keyboard, Platform, Animated } from "react-native";
import useAuthStore from "../store/useAuthStore";

export const AVATAR_STICKERS = [
  { id: 1, color: "#DC2626", bg: "#7F1D1D", icon: "cricket", label: "Batsman Red" },
  { id: 2, color: "#2563EB", bg: "#581C87", icon: "run-fast", label: "Fielder Blue" },
  { id: 3, color: "#06B6D4", bg: "#164E63", icon: "arm-flex", label: "Bowler Cyan" },
  { id: 4, color: "#EF4444", bg: "#991B1B", icon: "trophy", label: "Champ Red" },
];

export const useRegisterFlow = (navigation, initialMobile) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [gender, setGender] = useState("Male");
  const [selectedSticker, setSelectedSticker] = useState(AVATAR_STICKERS[1]);
  const [profileImageUri, setProfileImageUri] = useState(null);

  const updateUserProfile = useAuthStore((state) => state.updateUser);
  const keyboardMarginAnim = useRef(new Animated.Value(0)).current;

  const handlePickFromGallery = async () => {
    try {
      let ImagePicker;
      try {
        ImagePicker = require("expo-image-picker");
      } catch (loadErr) {
        Alert.alert(
          "Dev Build Notice 📱",
          "expo-image-picker is a native module. Please rebuild your development build (npx expo run:android) or use Expo Go."
        );
        return;
      }

      if (!ImagePicker || !ImagePicker.requestMediaLibraryPermissionsAsync) {
        Alert.alert(
          "Dev Build Notice 📱",
          "Native ImagePicker module not loaded in current development build. Please rebuild native app (npx expo run:android)."
        );
        return;
      }

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Gallery permission is needed to pick a profile photo.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.warn("[PICK GALLERY ERROR]:", err);
      Alert.alert(
        "Dev Build Notice 📱",
        "Native ImagePicker module requires rebuilding your custom dev client build (npx expo run:android)."
      );
    }
  };

  const handleTakePhoto = async () => {
    try {
      let ImagePicker;
      try {
        ImagePicker = require("expo-image-picker");
      } catch (loadErr) {
        Alert.alert(
          "Dev Build Notice 📱",
          "expo-image-picker is a native module. Please rebuild your development build (npx expo run:android) or use Expo Go."
        );
        return;
      }

      if (!ImagePicker || !ImagePicker.requestCameraPermissionsAsync) {
        Alert.alert(
          "Dev Build Notice 📱",
          "Native ImagePicker module not loaded in current development build. Please rebuild native app (npx expo run:android)."
        );
        return;
      }

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Camera permission is needed to take a profile photo.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.warn("[TAKE PHOTO ERROR]:", err);
      Alert.alert(
        "Dev Build Notice 📱",
        "Native ImagePicker module requires rebuilding your custom dev client build (npx expo run:android)."
      );
    }
  };

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardMarginAnim, {
        toValue: e.endCoordinates ? e.endCoordinates.height : 260,
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

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "CN";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleNextStep1 = () => {
    if (!fullName.trim()) {
      Alert.alert("Required Field", "Please enter your full name.");
      return;
    }
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    if (!city.trim()) {
      Alert.alert("Required Field", "Please enter your city.");
      return;
    }
    setCurrentStep(3);
  };

  const handleNextStep3 = () => {
    if (!dobDay || !dobMonth || !dobYear) {
      Alert.alert("Required Field", "Please complete your date of birth.");
      return;
    }
    setCurrentStep(4);
  };

  const handleNextStep4 = () => {
    if (!gender) {
      Alert.alert("Required Field", "Please select your gender.");
      return;
    }
    setCurrentStep(5);
  };

  const handleDoneStep5 = () => {
    setCurrentStep(6);
  };

  const updateProfileApi = useAuthStore((state) => state.updateProfileApi);

  const handleLetTheGamesBegin = async () => {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || fullName.trim();
    const lastName = nameParts.slice(1).join(" ") || "";

    const formattedDobApi = dobYear && dobMonth && dobDay
      ? `${dobYear}-${dobMonth.padStart(2, "0")}-${dobDay.padStart(2, "0")}`
      : undefined;

    let apiGender = "MALE";
    if (gender === "Female") apiGender = "FEMALE";
    else if (gender === "Prefer, not to say") apiGender = "PREFER_NOT_TO_SAY";

    const localProfile = {
      firstName,
      lastName,
      fullName: fullName.trim(),
      mobileNumber: initialMobile,
      city: city.trim(),
      gender: apiGender,
      dateOfBirth: formattedDobApi,
      avatarId: selectedSticker.label ? selectedSticker.label.toLowerCase().replace(/ /g, "_") : "batsman_red",
      avatarColor: selectedSticker.bg,
      avatarInitials: getInitials(fullName),
      profileImageUrl: profileImageUri,
      isRegistered: true,
    };

    await updateProfileApi(localProfile);

    if (navigation && navigation.replace) {
      navigation.replace("Home");
    }
  };

  return {
    currentStep,
    setCurrentStep,
    fullName,
    setFullName,
    city,
    setCity,
    dobDay,
    setDobDay,
    dobMonth,
    setDobMonth,
    dobYear,
    setDobYear,
    gender,
    setGender,
    selectedSticker,
    setSelectedSticker,
    profileImageUri,
    setProfileImageUri,
    handlePickFromGallery,
    handleTakePhoto,
    keyboardMarginAnim,
    getInitials,
    handleNextStep1,
    handleNextStep2,
    handleNextStep3,
    handleNextStep4,
    handleDoneStep5,
    handleLetTheGamesBegin,
  };
};

export default useRegisterFlow;
