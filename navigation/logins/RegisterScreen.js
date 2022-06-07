//회원가입 페이지
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
import axios from "axios";
import Toast from "react-native-toast-message";

import gamjaLogo from "../../assets/LOGO.png";
import { AuthContext } from "./AuthContext";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function RegisterScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const [createUserPw, setCreateUserPw] = useState("");
  const [createUserId, setCreateUserId] = useState("");
  const [confirmUserPw, setConfirmUserPw] = useState("");
  const [createUsername, setCreateUsername] = useState("");

  const { isLoading, register } = useContext(AuthContext);

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
              <Text style={styles.modalText}>
                Check the blank exists or pw&pwConfirm are same
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible((current) => !current)}
              >
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={registerVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Email : {createUserId}</Text>
              <Text style={styles.modalText}>Password : {createUserPw}</Text>
              <Text style={styles.modalText}>Username : {createUsername}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  register(createUsername, createUserId, createUserPw);
                  navigation.navigate("Login");
                  setRegisterVisible((current) => !current);
                }}
              >
                <Text style={styles.textStyle}>Register</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setRegisterVisible((current) => !current);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={{ flex: 2 }}></View>
        <View style={{ flex: 2.5, padding: 25 }}>
          <TextInput
            style={{
              height: 48,
              backgroundColor: "white",
              opacity: 0.9,
              borderRadius: 15,
            }}
            placeholder="Email"
            onChangeText={setCreateUserId}
          />
          <TextInput
            style={{
              height: 48,
              backgroundColor: "white",
              opacity: 0.9,
              marginTop: 5,
              borderRadius: 15,
            }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setCreateUserPw}
          />
          <TextInput
            style={{
              height: 48,
              backgroundColor: "white",
              opacity: 0.9,
              marginTop: 5,
              borderRadius: 15,
            }}
            placeholder="Password Confirm"
            secureTextEntry={true}
            onChangeText={setConfirmUserPw}
          />
          <TextInput
            style={{
              height: 48,
              backgroundColor: "white",
              opacity: 0.9,
              marginTop: 5,
              borderRadius: 15,
            }}
            placeholder="Username"
            onChangeText={setCreateUsername}
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
              if (
                createUserId === "" ||
                createUserPw === "" ||
                confirmUserPw === "" ||
                createUsername === ""
              ) {
                setModalVisible(true);
              } else if (createUserPw !== confirmUserPw) {
                setModalVisible(true);
              } else {
                setRegisterVisible(true);
              }
            }}
          >
            <Text style={{ fontSize: 20 }}> Register </Text>
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
    marginTop: 20,
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
