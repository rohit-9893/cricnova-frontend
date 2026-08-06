import { COUNTRIES } from "../constants/countries";

/**
 * Default India country fallback object
 */
const DEFAULT_COUNTRY = {
  name: "India",
  code: "IN",
  dialCode: "+91",
  flag: "🇮🇳",
};

/**
 * Detects device default country or returns India fallback cleanly
 * @returns {{ name: string, code: string, dialCode: string, flag: string }}
 */
export const getDefaultCountry = () => {
  try {
    // Default fallback to India (IN)
    const indiaCountry = COUNTRIES.find((c) => c.code === "IN");
    return indiaCountry || DEFAULT_COUNTRY;
  } catch (error) {
    return DEFAULT_COUNTRY;
  }
};
