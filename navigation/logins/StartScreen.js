//앱 실행 처음 로그인, 회원가입 선택 페이지
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";

import gamjaLogo from "../../assets/LOGO.png";

export default function StartScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1.2 }}>
        <ImageBackground
          source={gamjaLogo}
          resizeMode="center"
          style={{
            flex: 0.2,
            position: "absolute",
            width: 150,
            height: 150,
            backgroundColor: "white",
            marginTop: 180,
            marginHorizontal: 130,
          }}
        ></ImageBackground>
      </View>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>Welcome</Text>
            <Text style={{ fontSize: 22, paddingTop: 20, fontWeight: "bold" }}>
              This is Gamja application for diet lunchbox!
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 50 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                paddingVertical: 15,
                paddingHorizontal: 30,
                marginHorizontal: 20,
                borderRadius: 80,
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingVertical: 15,
                paddingHorizontal: 30,
                marginHorizontal: 20,
                borderRadius: 80,
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "orange",
    paddingVertical: 60,
    paddingBottom: 150,
    borderRadius: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
