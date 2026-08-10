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

  const updateUserProfile = useAuthStore((state) => state.updateUser);
  const keyboardMarginAnim = useRef(new Animated.Value(0)).current;

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
    if (!name.trim()) return "CN";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
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
      Alert.alert("Required Field", "Please enter your city / town.");
      return;
    }
    setCurrentStep(3);
  };

  const handleNextStep3 = () => {
    if (!dobDay.trim() || !dobMonth.trim() || !dobYear.trim()) {
      Alert.alert("Required Field", "Please enter your date of birth (DD / MM / YYYY).");
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

  const handleLetTheGamesBegin = async () => {
    const formattedDob = `${dobDay.padStart(2, "0")}/${dobMonth.padStart(2, "0")}/${dobYear}`;

    const userProfile = {
      fullName: fullName.trim(),
      mobileNumber: initialMobile,
      city: city.trim(),
      dateOfBirth: formattedDob,
      gender: gender,
      avatarColor: selectedSticker.bg,
      avatarInitials: getInitials(fullName),
      isRegistered: true,
    };

    await updateUserProfile(userProfile);
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
