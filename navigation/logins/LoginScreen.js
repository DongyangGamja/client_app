//로그인 페이지
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import gamjaLogo from "../../assets/LOGO.png";
import { AuthContext } from "./AuthContext";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function LoginScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userPw, setUserPw] = useState("");
  const [userId, setUserId] = useState("");

  const { isLoading, login, userInfo, userLogin } = useContext(AuthContext);

  return (
    <ImageBackground
      source={gamjaLogo}
      resizeMode="center"
      style={{ flex: 1, position: "relative" }}
    >
      <View style={{ flex: 1 }}>
        <Spinner visible={isLoading} />
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Login Failed!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{ flex: 2 }}></View>
        <View style={{ flex: 1.8, padding: 25 }}>
          <TextInput
            style={{
              height: 48,
              backgroundColor: "white",
              opacity: 0.9,
              borderRadius: 15,
            }}
            placeholder="Enter your email"
            onChangeText={setUserId}
          />
          <TextInput
            style={{
              height: 48,
              backgroundColor: "white",
              marginTop: 5,
              opacity: 0.9,
              borderRadius: 15,
            }}
            secureTextEntry={true}
            placeholder="Enter your password"
            onChangeText={setUserPw}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "orange",
              marginTop: 20,
              paddingVertical: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              if (userId === "" || userPw === "") {
                setModalVisible(true);
              } else {
                console.log("beforeLogin");
                login(userId, userPw);
                console.log("afterLogin");
                if (userLogin === true) {
                  navigation.navigate("Main");
                }
              }
            }}
          >
            <Text style={{ fontSize: 20 }}> Login </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text></Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "orange",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
