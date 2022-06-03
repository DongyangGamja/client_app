import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function OptionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => navigation.navigate("Home")}>
        This is GAMJA's Option Screen!
      </Text>
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
    fontSize: 26,
  },
});
