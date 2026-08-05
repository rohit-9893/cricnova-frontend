import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DropdownInput = ({ label, value, options = [], onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    setModalVisible(false);
    if (onSelect) onSelect(item);
  };

  return (
    <View className="mb-5">
      {label && <Text className="text-xs text-slate-500 mb-1">{label}</Text>}
      <TouchableOpacity
        className="flex-row items-center justify-between border-b border-slate-300 pb-2"
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-base text-slate-900 font-medium">{value}</Text>
        <Ionicons name="caret-down" size={14} color="#94A3B8" />
      </TouchableOpacity>

      {/* Floating Dropdown Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-center items-center px-6"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View className="w-11/12 max-h-96 bg-white rounded-lg py-2 elevation-lg">
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`px-5 py-3.5 border-b border-slate-100 ${
                      value === item ? "bg-teal-50" : ""
                    }`}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(item)}
                  >
                    <Text
                      className={`text-base ${
                        value === item
                          ? "text-brand-teal font-bold"
                          : "text-slate-700 font-normal"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DropdownInput;
