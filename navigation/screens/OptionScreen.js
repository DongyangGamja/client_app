import React, { useEffect, useState } from "react"
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import axios from "axios"

import AsyncStorage from "@react-native-async-storage/async-storage"
const window = Dimensions.get("window").width
const screen = Dimensions.get("window").height

export default function OptionScreen({ navigation }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState([])
  const [idInfo, setIdInfo] = useState()

  //스토리지 정보 추출(ID)
  const getStorage = async () => {
    try {
      const loadedData = await AsyncStorage.getItem("id")
      setIdInfo(JSON.parse(loadedData))
    } catch (e) {}
  }

  const clickLogout = async () => {
    AsyncStorage.removeItem("id")
    setIdInfo(null)
    await navigation.navigate("Login")
  }

  // 유저 칼로리 데이터 추출 함수
  const getData = () => {
    getStorage()
    axios.get(`http://3.39.32.181:8001/api/kcal/${idInfo}`).then((res) => {
      setItems(res.data.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, [items])

  const changeMenu = (m) => {
    switch (m) {
      case 1:
        return "사과"
      case 2:
        return "바나나"
      case 3:
        return "당근"
    }
  }

  if (loading) return <View></View>
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "orange",
            marginTop: 100,
            paddingVertical: 10,
            borderRadius: 50,
          }}
          onPress={() => {
            clickLogout()
          }}
        >
          <Text style={{ fontSize: 20 }}> Logout </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          width: window,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            marginTop: 30,
          }}
        >
          Calorie List
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: window,
          }}
        >
          <Text style={styles.text}>시간</Text>
          <Text style={styles.text}>음식</Text>
          <Text style={styles.text}>열량</Text>
        </View>
        {items.map((item) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: window,
            }}
          >
            <Text style={styles.text}>{changeMenu(item.m_kind)}</Text>
            <Text style={styles.text}>{item.m_kcal}</Text>
            <Text style={styles.text}>{item.m_date}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: 20,
  },
})
