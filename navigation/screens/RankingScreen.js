import React, { useState, useEffect, useContext } from "react"
import { FlatGrid } from "react-native-super-grid"
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from "react-native"

import first from "../../assets/first.png"
import second from "../../assets/second.png"
import third from "../../assets/third.png"
import axios from "axios"

const window = Dimensions.get("window").width
const screen = Dimensions.get("window").height

export default function RankingScreen({ navigation }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Rank List Data
  const getRankData = () => {
    axios
      .get("http://3.39.32.181:8001/api/gamja")
      .then((res) => {
        if (res.data.result) {
          setItems(res.data.data)
          setLoading(false)
        }
      })
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    getRankData()
  }, [])

  if (loading) return <View></View>
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
              <Text style={styles.itemName}>{item.u_name}</Text>
              <Text style={styles.itemCode}>Gamja: {item.g_name}</Text>
              <Text style={styles.itemCode}>Exp. {item.g_exp}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gridView: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "orange",
    marginTop: 20,
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
})
