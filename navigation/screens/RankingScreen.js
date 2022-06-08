import React, { useState } from "react";
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

const window = Dimensions.get("window").width;
const screen = Dimensions.get("window").height;

export default function RankingScreen({ navigation }) {
  const [items, setItems] = useState([
    { name: "김인후", code: "Gamja Lv.5" },
    { name: "문빛채운", code: "Gamja Lv.4" },
    { name: "강승재", code: "Gamja Lv.3" },
    { name: "박영기", code: "Gamja Lv.3" },
    { name: "김지원", code: "Gamja Lv.2" },
  ]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1.5, flexDirection: "row" }}>
        <Image
          source={second}
          resizeMode="contain"
          style={{
            width: (window * 1) / 7,
            height: 100,
            position: "absolute",
            marginLeft: (window * 1) / 5,
            marginTop: (screen * 1) / 3.5,
          }}
        />
        <Image
          source={first}
          resizeMode="contain"
          style={{
            width: (window * 1) / 6,
            height: 100,
            position: "absolute",
            marginLeft: (window * 2) / 5,
            marginTop: (screen * 1) / 3.5,
          }}
        />
        <Image
          source={third}
          resizeMode="contain"
          style={{
            width: (window * 1) / 7,
            height: 100,
            position: "absolute",
            marginLeft: (window * 3) / 5 + 5,
            marginTop: (screen * 1) / 3.5,
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
              <Text style={styles.itemCode}>exp: 120</Text>
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
    marginTop: StatusBar.currentHeight || 0,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
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
