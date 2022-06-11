import React, { useEffect, useState } from "react"
import { FlatGrid } from "react-native-super-grid"
import { SectionGrid } from "react-native-super-grid"
import { Text, View, StyleSheet } from "react-native"
import axios from "axios"

export default function FeedScreen({ navigation }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  //보드 데이터 가져오는 기능
  const getData = () => {
    axios.get("http://3.39.32.181:8001/api/board").then((res) => {
      setItems(res.data.boards)
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  if (loading) return <View></View>
  return (
    <View style={styles.container}>
      <SectionGrid
        itemDimension={170}
        // staticDimension={300}
        // fixed
        spacing={20}
        sections={[
          {
            title: "Title1",
            data: items.slice(0, 6),
          },
          {
            title: "Title2",
            data: items.slice(6, 12),
          },
          {
            title: "Title3",
            data: items.slice(12, 20),
          },
        ]}
        style={styles.gridView}
        renderItem={({ item, section, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.b_title}</Text>
            <Text style={styles.itemCode}>{item.u_name}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
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
    fontSize: 26,
  },
  gridView: {
    marginTop: 50,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#636e72",
    color: "white",
    padding: 10,
  },
})
