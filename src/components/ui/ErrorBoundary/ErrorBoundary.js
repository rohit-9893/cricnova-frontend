import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("[CRITICAL ERROR BOUNDARY CATCH]:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView className="flex-1 bg-[#F8FAFC]">
          <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

          <View className="flex-1 justify-center items-center px-6 py-8">
            {/* Warning Icon Badge */}
            <View className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-emerald-200 justify-center items-center shadow-xs mb-6">
              <MaterialCommunityIcons name="alert-decagram-outline" size={54} color="#0D9488" />
            </View>

            {/* Error Heading */}
            <Text className="text-2xl font-black text-slate-900 text-center mb-2">
              Oops! Something went wrong
            </Text>
            <Text className="text-slate-500 text-sm font-semibold text-center mb-6 px-4 leading-6">
              An unexpected error occurred. Don't worry, your match data is safe.
            </Text>

            {/* Dev Diagnostics Accordion */}
            {__DEV__ && this.state.error && (
              <View className="w-full bg-slate-100 border border-slate-300 rounded-2xl p-4 mb-6">
                <Text className="text-slate-800 text-xs font-bold mb-1 uppercase tracking-wider">
                  [DEV] Diagnostics Error Trace:
                </Text>

                <ScrollView style={{ maxHeight: 120 }}>
                  <Text className="text-red-600 text-xs font-mono">
                    {this.state.error.toString()}
                  </Text>
                </ScrollView>
              </View>
            )}

            {/* Action Buttons */}
            <View className="w-full space-y-3">
              <TouchableOpacity
                className="w-full h-13 bg-[#0D9488] rounded-xl justify-center items-center shadow-md shadow-teal-500/20 mb-3"
                activeOpacity={0.85}
                onPress={this.handleReset}
              >
                <View className="flex-row items-center">
                  <Ionicons name="refresh-outline" size={20} color="#FFFFFF" className="mr-2" />
                  <Text className="text-white text-base font-extrabold ml-1">Try Again 🔄</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
