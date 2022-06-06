//스플래시 페이지(감자 로고있는 페이지 X, 감자 로고 스플래시 페이지 이후 잠깐 나오는 초록창)
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
