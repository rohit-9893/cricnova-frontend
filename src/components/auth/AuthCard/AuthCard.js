import React from "react";
import { View } from "react-native";
import AuthLogoBadge from "../AuthLogoBadge";
import CountrySelectBtn from "../CountrySelectBtn";
import WhatsAppLoginBtn from "../WhatsAppLoginBtn";
import MobileLoginBtn from "../MobileLoginBtn";

const AuthCard = ({
  countryName = "India",
  countryFlag = "🇮🇳",
  onCountryPress,
  onWhatsAppPress,
  onMobilePress,
}) => {
  return (
    <View
      className="w-full bg-white rounded-3xl p-7 shadow-2xl items-center"
      style={{
        width: "90%",
        borderRadius: 28,
        paddingHorizontal: 24,
        paddingVertical: 28,
        elevation: 12,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      }}
    >
      {/* Circle Logo & Brand Name */}
      <AuthLogoBadge />

      {/* Country Selection Button */}
      <CountrySelectBtn
        countryName={countryName}
        countryFlag={countryFlag}
        onPress={onCountryPress}
      />

      {/* WhatsApp Login Button */}
      <WhatsAppLoginBtn onPress={onWhatsAppPress} />

      {/* Mobile Login Button */}
      <MobileLoginBtn onPress={onMobilePress} />
    </View>
  );
};

export default AuthCard;
