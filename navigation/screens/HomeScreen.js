import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import charGamja_baby from "../../assets/charGamja_baby.png";
import charGamja_baby_sick from "../../assets/charGamja_baby_sick.png";
import charGamja_teenager from "../../assets/charGamja_teenager.png";

export default function HomeScreen({ navigation }) {
  const [gamja, setGamja] = useState(1);
  const [gamjaImg, setGamjaImg] = useState(charGamja_baby);

  const countGamja = () => {
    setGamja((current) => current + 1);
    if (gamja === 0) setGamjaImg(charGamja_baby);
    else if (gamja === 1) setGamjaImg(charGamja_baby_sick);
    else if (gamja === 2) setGamjaImg(charGamja_teenager);
    if (gamja >= 2) setGamja(0);
  };

  //감자 = 서버로부터 감자 경험치 가져온 후 계산. gamjaExp / 100 = gamjaLevel

  return (
    <View style={styles.container}>
      <Image source={gamjaImg} style={styles.image} />
      <TouchableOpacity
        onPress={countGamja}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
        }}
      >
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 26,
  },
  image: {
    width: 500,
    height: 500,
  },
});
