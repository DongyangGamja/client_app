import React, { useState, useEffect } from "react"
import axios from "axios"
import { Text, View, StyleSheet, Image, Dimensions } from "react-native"
import moment from "moment"
import "moment/locale/ko"

import charGamja_baby from "../../assets/charGamja_baby.jpg"
import charGamja_teen from "../../assets/charGamja_teen.png"
import gamjaImage from "../../assets/gamja4.png"

const window = Dimensions.get("window").width
const screen = Dimensions.get("window").height

export default function HomeScreen({ navigation }) {
  const [gamjaImg, setGamjaImg] = useState(charGamja_baby)
  const [gamja, setGamja] = useState()
  const [kcalList, setKcalList] = useState([])
  const [loading, setLoading] = useState(true)
  const [idInfo, setIdInfo] = useState()

  const getStorage = async () => {
    try {
      const loadedData = await AsyncStorage.getItem("id")
      setIdInfo(JSON.parse(loadedData))
      console.log(1, idInfo)
    } catch (e) {}
  }

  // 메인 화면 데이터 요청 기능
  const getData = () => {
    getStorage()
    console.log(2, idInfo)
    axios.get(`http://3.39.32.181:8001/api/kcal/all/admin`).then((res) => {
      // 요청 성공
      if (res.data.result) {
        setKcalList(res.data.kcal) // 칼로리 데이터 저장
        setGamja(res.data.gamja[0]) // 감자 데이터 저장
        setLoading(false) // 데이터 저장 끝
      }
    })
  }

  // getData를 온마운트 될 때만 초기화
  useEffect(() => {
    getData()
  }, [])

  // 데이터 저장이 안 끝나면 화면 빌드 X
  if (loading) return <View></View>
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
      <View style={styles.cView}>
        <View
          style={{
            flex: 1,
            top: 100,
          }}
        >
          <Text
            style={{
              fontSize: 25,
            }}
          ></Text>
          <Text></Text>
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              감자 이름: {gamja.g_name}
            </Text>
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              감자 경험치: {gamja.g_exp}
            </Text>
            {/* <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              음식 종류: {kcalList.m_kind}
            </Text> */}
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              칼로리: {kcalList[0].m_kcal}
            </Text>
            {/* <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              먹은 날짜: {kcalList.m_date}
            </Text> */}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </View>
      </View>

      <Image
        source={gamja}
        style={{
          width: window / 2,
          height: screen / 4,
          position: "absolute",
          borderRadius: 500,
          borderColor: "#fc0",
          borderWidth: 3,
          top: screen / 6,
          backgroundColor: "white",
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 26,
  },
  cView: {
    flex: 2,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    borderRadius: 30,
    width: window / 1.1,
    alignItems: "center",
    marginBottom: 30,
  },
  textGamja: {
    fontSize: 18,
    paddingTop: screen / 6,
  },
})
