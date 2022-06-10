import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../logins/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const window = Dimensions.get("window").width;
const screen = Dimensions.get("window").height;

export default function OptionScreen({ navigation }) {
  const [gamjaKind, setGamjaKind] = useState(null);
  const [gamjaKcal, setGamjaKcal] = useState(null);
  const [gamjaDate, setGamjaDate] = useState("");
  const [gamjaKind1, setGamjaKind1] = useState(null);
  const [gamjaKcal1, setGamjaKcal1] = useState(null);
  const [gamjaDate1, setGamjaDate1] = useState("");
  const [gamjaKind2, setGamjaKind2] = useState(null);
  const [gamjaKcal2, setGamjaKcal2] = useState(null);
  const [gamjaDate2, setGamjaDate2] = useState("");

  const { userInfo, logout, isLoading, kcalInfo } = useContext(AuthContext);

  const kcalDataHandled = async () => {
    try {
      const gamjaInfoString = await AsyncStorage.getItem("@gamja_info");
      const gamjaInfo = JSON.parse(gamjaInfoString);
      setGamjaKind(gamjaInfo.m_kind);
      setGamjaKcal(gamjaInfo.m_kcal);
      setGamjaDate(gamjaInfo.m_date);
      const gamjaInfoString1 = await AsyncStorage.getItem("@gamja_info1");
      const gamjaInfo1 = JSON.parse(gamjaInfoString1);
      setGamjaKind1(gamjaInfo1.m_kind);
      setGamjaKcal1(gamjaInfo1.m_kcal);
      setGamjaDate1(gamjaInfo1.m_date);
      const gamjaInfoString2 = await AsyncStorage.getItem("@gamja_info2");
      const gamjaInfo2 = JSON.parse(gamjaInfoString2);
      setGamjaKind2(gamjaInfo2.m_kind);
      setGamjaKcal2(gamjaInfo2.m_kcal);
      setGamjaDate2(gamjaInfo2.m_date);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: window,
          }}
        >
          <Text style={styles.text}>{gamjaDate}</Text>
          <Text style={styles.text}>{gamjaKind}</Text>
          <Text style={styles.text}>{gamjaKcal}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: window,
          }}
        >
          <Text style={styles.text}>{gamjaDate1}</Text>
          <Text style={styles.text}>{gamjaKind1}</Text>
          <Text style={styles.text}>{gamjaKcal1}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: window,
          }}
        >
          <Text style={styles.text}>{gamjaDate2}</Text>
          <Text style={styles.text}>{gamjaKind2}</Text>
          <Text style={styles.text}>{gamjaKcal2}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange",
            padding: 20,
            borderRadius: 20,
          }}
          onPress={() => {
            kcalInfo();
            kcalDataHandled();
          }}
        >
          <Text>불러오기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
});
