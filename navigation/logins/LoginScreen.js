//로그인 페이지
import React, { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import lunchbox from "../../assets/lunchboxImage.jpg"

const window = Dimensions.get("window").width
const screen = Dimensions.get("window").height

export default function LoginScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  //ID, PW 상태 관리
  const [userId, setUserId] = useState("")
  const [userPw, setUserPw] = useState("")
  const [tasks, setTasks] = useState()

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem("id", JSON.stringify(id))
    } catch (e) {
      console.log(e)
    }
  }

  // const getData = async () => {
  //   try {
  //     const loadedData = await AsyncStorage.getItem("id")
  //     setTasks(JSON.parse(loadedData) || "{}")
  //   } catch (e) {
  //     // error reading value
  //   }
  // }

  // Login 기능
  const login = () => {
    axios({
      url: "http://3.39.32.181:8001/api/auth/login",
      method: "post",
      data: {
        id: userId,
        pw: userPw,
      },
    })
      .then(async (res) => {
        // 로그인 성공
        !res.data.result && setModalVisible(true)
        storeData(res.data.info[1])
        await navigation.navigate("Main")
      })
      .catch((e) => {
        return e
      })
  }

  return (
    //배경
    <ImageBackground
      source={lunchbox}
      resizeMode="cover"
      blurRadius={20}
      style={{
        flex: 1,
        position: "absolute",
        width: window,
        height: screen + 50,
      }}
    >
      <View style={{ flex: 1 }}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Login Failed</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              padding: 10,
              paddingLeft: 35,
              fontWeight: "bold",
              color: "#111",
              textShadowColor: "black",
              textShadowOffset: {
                width: 0,
                height: 1,
              },
              textShadowRadius: 1.5,
            }}
          >
            Welcome
          </Text>
        </View>
        <View
          style={{
            flex: 1.3,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              height: screen / 18,
              width: window / 1.2,
              backgroundColor: "black",
              opacity: 0.7,
              borderRadius: 15,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
            color="white"
            placeholder="Enter your email"
            placeholderTextColor="white"
            onChangeText={setUserId}
          />
          <TextInput
            style={{
              height: screen / 18,
              width: window / 1.2,
              backgroundColor: "black",
              opacity: 0.7,
              borderRadius: 15,
              padding: 10,
              marginTop: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
            color="white"
            secureTextEntry={true}
            placeholder="Enter your password"
            placeholderTextColor="white"
            onChangeText={setUserPw}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: window / 2.7,
                alignItems: "center",
                backgroundColor: "teal",
                marginHorizontal: 13,
                paddingVertical: 12,
                borderRadius: 30,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() => {
                navigation.navigate("Register")
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}> Register </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 13,
                width: window / 2.7,
                alignItems: "center",
                backgroundColor: "orange",
                paddingVertical: 12,
                borderRadius: 30,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() => {
                login()
              }}
            >
              <Text style={{ fontSize: 18 }}> Login </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

/* STYLES */
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: window,
    height: screen / 3.5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: window / 2,
    marginVertical: 20,
  },
  buttonClose: {
    backgroundColor: "orange",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  modalText: {
    paddingVertical: 30,
    fontSize: 30,
  },
})
