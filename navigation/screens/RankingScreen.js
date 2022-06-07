import React, { useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import { Text, View, StyleSheet, FlatList, StatusBar } from "react-native";

export default function RankingScreen({ navigation }) {
  const [items, setItems] = useState([
    { name: "김인후", code: "Gamja Lv.5" },
    { name: "문빛채운", code: "Gamja Lv.4" },
    { name: "강승재", code: "Gamja Lv.3" },
    { name: "박영기", code: "Gamja Lv.3" },
    { name: "김지원", code: "Gamja Lv.2" },
    { name: "No one", code: "Gamja Lv.0" },
    { name: "No one", code: "Gamja Lv.0" },
    { name: "No one", code: "Gamja Lv.0" },
    { name: "No one", code: "Gamja Lv.0" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "ALIZARIN", code: "#e74c3c" },
    { name: "CLOUDS", code: "#ecf0f1" },
    { name: "CONCRETE", code: "#95a5a6" },
    { name: "ORANGE", code: "#f39c12" },
    { name: "PUMPKIN", code: "#d35400" },
    { name: "POMEGRANATE", code: "#c0392b" },
    { name: "SILVER", code: "#bdc3c7" },
    { name: "ASBESTOS", code: "#7f8c8d" },
  ]);

  return (
    <FlatGrid
      itemDimension={200}
      data={items}
      style={styles.gridView}
      staticDimension={400}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: "black" }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.code}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  gridView: {
    marginTop: 50,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    height: 80,
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
    paddingLeft: 3,
  },
});
