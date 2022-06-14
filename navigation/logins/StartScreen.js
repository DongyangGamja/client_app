//앱 실행 처음 로그인, 회원가입 선택 페이지
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native"

import gamjaLogo from "../../assets/LOGO.png"

const window = Dimensions.get("window").width
const screen = Dimensions.get("window").height

export default function StartScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1.2 }}>
        <ImageBackground
          source={gamjaLogo}
          resizeMode="contain"
          style={{
            flex: 0.2,
            position: "relative",
            width: window / 2,
            height: (screen + 50) / 2,
            marginLeft: window / 4,
            backgroundColor: "white",
          }}
        ></ImageBackground>
      </View>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
            <Text style={{ fontSize: 45, fontWeight: "bold", padding: 10 }}>
              Welcome
            </Text>
            <Text style={{ fontSize: 22, padding: 10, fontWeight: "bold" }}>
              This is Gamja application for diet lunchbox!
            </Text>
          </View>
          <View style={{ flexDirection: "row", padding: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                width: window / 2.5,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                height: screen / 14,
                margin: 15,
              }}
              onPress={() => {
                navigation.navigate("Login")
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: window / 2.5,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                height: screen / 14,
                margin: 15,
              }}
              onPress={() => {
                navigation.navigate("Register")
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "orange",
    paddingVertical: 60,
    paddingBottom: 150,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
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
})
