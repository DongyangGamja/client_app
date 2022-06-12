import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import moment from "moment";
import "moment/locale/ko";
import { AuthContext } from "../logins/AuthContext";

import charGamja_baby from "../../assets/charGamja_baby.jpg";
import charGamja_baby_sick from "../../assets/charGamja_baby_sick.jpg";
import charGamja_baby_ssak from "../../assets/charGamja_baby_ssak.jpg";
import charGamja_teen from "../../assets/charGamja_teen.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const window = Dimensions.get("window").width;
const screen = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  const [gamjaImg, setGamjaImg] = useState(charGamja_baby);
  const [gamjaImgName, setGamjaImgName] = useState("애기감자");
  const [gamjaName, setGamjaName] = useState("");
  const [gamjaExp, setGamjaExp] = useState(null);
  const [gamjaKind, setGamjaKind] = useState(null);
  const [gamjaKcal, setGamjaKcal] = useState(null);
  const [gamjaDate, setGamjaDate] = useState("");
  const [gamjaDay, setGamjaDay] = useState("");
  const [gamjaTime, setGamjaTime] = useState("");

  const { kcalInfo, calInfo } = useContext(AuthContext);

  //시간 계산(불러온 날짜 데이터가 오늘보다 이전이면 초기화)
  useEffect(() => {
    const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const nowDay = moment().format("YYYY-MM-DD");
    if (moment(gamjaDay).isAfter(nowDay)) {
      //초기화
    }
    console.log(nowTime);
  }, []);

  //exp의 양에 따라 그림 변경
  useEffect(() => {
    if (gamjaExp / 100 >= 3) {
      setGamjaImg(charGamja_teen);
      setGamjaImgName("청년감자");
    } else if (gamjaExp / 100 >= 1) {
      setGamjaImg(charGamja_baby);
      setGamjaImgName("애기감자");
    } else {
      setGamjaImg(charGamja_baby);
      setGamjaImgName("데이터를 불러주세요");
    }
  }, [gamjaExp]);

  //스토리지 불러오기
  const kcalDataHandled = async () => {
    try {
      const gamjaInfoString = await AsyncStorage.getItem("@gamja_info");
      const gamjaInfo = JSON.parse(gamjaInfoString);
      setGamjaName(gamjaInfo.g_name);
      setGamjaExp(gamjaInfo.g_exp);
      setGamjaKind(gamjaInfo.m_kind);
      setGamjaKcal(gamjaInfo.m_kcal);
      setGamjaDate(gamjaInfo.m_date);
      //날짜와 시간으로 분리해서 저장, day=날짜, time=시간
      const gamjaDaySet = gamjaInfo.m_date.substring(0, 10);
      setGamjaDay(gamjaDaySet);
      const gamjaTimeSet = gamjaInfo.m_date.substring(11, 19);
      setGamjaTime(gamjaTimeSet);
    } catch (e) {
      console.error(e);
    }
  };

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
          >
            {gamjaImgName}
          </Text>
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
                marginVertical: 10,
              }}
            >
              감자 이름: {gamjaName}
            </Text>
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              감자 경험치: {gamjaExp}
            </Text>
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              음식 종류: {gamjaKind}
            </Text>
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              칼로리: {gamjaKcal}
            </Text>
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              생성 날짜: {gamjaDay} {gamjaTime}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ padding: 20, backgroundColor: "teal", borderRadius: 20 }}
              onPress={() => {
                kcalInfo();
                kcalDataHandled();
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                데이터 불러오기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Image
        source={gamjaImg}
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
  );
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
});
