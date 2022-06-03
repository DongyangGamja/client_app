import React from "react";
import { ActivityIndicator, View } from "react-native";

const SplashScreen = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "teal" }}
    >
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default SplashScreen;
