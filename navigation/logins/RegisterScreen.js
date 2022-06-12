//회원가입 페이지
import React, { useEffect, useState, useContext } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Modal,
  Image,
} from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import axios from "axios"

import gamjaLogo from "../../assets/LOGO.png"
import gamja from "./../../assets/gamja4.png"
export default function RegisterScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)
  const [text, setText] = useState()

  const [createUserPw, setCreateUserPw] = useState("")
  const [createUserId, setCreateUserId] = useState("")
  const [confirmUserPw, setConfirmUserPw] = useState("")
  const [createUsername, setCreateUsername] = useState("")
  const [gamjaName, setGamjaName] = useState()

  const postRegister = (req, res) => {
    if (confirmUserPw === confirmUserPw) {
      axios({
        method: "post",
        url: "http://3.39.32.181:8001/api/auth/register",
        data: {
          id: createUserId,
          pw: createUserPw,
          name: createUsername,
        },
      }).then((res) => {
        if (!res.data.result) {
          setText("중복된 아이디가 있습니다.")
          setModalVisible(true)
        } else {
          setRegisterVisible(true)
        }
      })
    } else {
      setText("비밀번호가 같지 않습니다.")
      setModalVisible(true)
    }
  }

  const postGamjaName = (req, res) => {
    axios({
      method: "post",
      url: "http://3.39.32.181:8001/api/gamja",
      data: {
        id: createUserId,
        name: gamjaName,
      },
    }).then((res) => {
      if (res.data.result) {
        setRegisterVisible(false)
        navigation.navigate("Login")
      }
    })
  }

  return (
    <ImageBackground
      source={gamjaLogo}
      resizeMode="center"
      style={{ flex: 1, position: "relative" }}
    >
      <View style={{ flex: 1 }}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{text}</Text>
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
              <Image
                style={styles.gamjaImage}
                source={gamja}
                resizeMode="center"
              />
              <TextInput
                onChangeText={setGamjaName}
                placeholder="감자의 이름을 정하세요!"
              />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    gamja && postGamjaName()
                  }}
                >
                  <Text style={styles.textStyle}>시작하기!</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setRegisterVisible((current) => !current)}
                >
                  <Text style={styles.textStyle}>취소</Text>
                </Pressable>
              </View>
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
              postRegister()
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
  )
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
    marginHorizontal: 10,
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
  gamjaImage: {
    width: 50,
    height: 50,
  },
})
