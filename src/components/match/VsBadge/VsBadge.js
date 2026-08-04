import React from "react";
import { View, Text } from "react-native";
import styles from "./VsBadge.styles";

const VsBadge = () => {
  return (
    <View style={styles.vsContainer}>
      <View style={styles.vsDiamond}>
        <Text style={styles.vsText}>vs</Text>
      </View>
    </View>
  );
};

export default VsBadge;
