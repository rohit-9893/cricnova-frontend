// Storage Helper with Safe Fallback
let memoryStorage = {};

export const getItem = async (key) => {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return memoryStorage[key] || null;
  }
};

export const setItem = async (key, value) => {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    memoryStorage[key] = value;
  }
};
