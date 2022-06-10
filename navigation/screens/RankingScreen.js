import React, { useState, useEffect, useContext } from "react";
import { FlatGrid } from "react-native-super-grid";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";

import first from "../../assets/first.png";
import second from "../../assets/second.png";
import third from "../../assets/third.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../logins/AuthContext";

const window = Dimensions.get("window").width;
const screen = Dimensions.get("window").height;

export default function RankingScreen({ navigation }) {
  const [items, setItems] = useState([
    { name: "1st. 김인후", code: "Gamja Lv.3" },
    { name: "2nd. 문빛채운", code: "Gamja Lv.2" },
    { name: "3rd. 강승재", code: "Gamja Lv.2" },
    { name: "박영기", code: "Gamja Lv.2" },
    { name: "김지원", code: "Gamja Lv.1" },
  ]);
  const [exp, setExp] = useState(null);

  const { kcalInfo } = useContext(AuthContext);

  const rank = () => {
    const expString = AsyncStorage.getItem("@gamja_info");
    const exp = JSON.parse(expString);
    setExp(exp.g_exp);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1.5,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Image
          source={second}
          resizeMode="contain"
          style={{
            width: (window * 1) / 7,
            height: 100,
            position: "relative",
            margin: 10,
          }}
        />
        <Image
          source={first}
          resizeMode="contain"
          style={{
            width: (window * 1) / 6,
            height: 100,
            position: "relative",
            margin: 10,
          }}
        />
        <Image
          source={third}
          resizeMode="contain"
          style={{
            width: (window * 1) / 7,
            height: 100,
            position: "relative",
            margin: 10,
          }}
        />
      </View>
      <View style={{ flex: 2 }}>
        <FlatGrid
          itemDimension={200}
          data={items}
          style={styles.gridView}
          staticDimension={400}
          showsVerticalScrollIndicator={false}
          // fixed
          spacing={30}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
              <Text style={styles.itemCode}>{exp}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gridView: {
    borderRadius: 40,
    backgroundColor: "orange",
    marginVertical: 20,
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    height: 80,
  },
  itemName: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#000",
    paddingLeft: 3,
  },
});
