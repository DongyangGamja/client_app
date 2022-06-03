import React, { useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../logins/AuthContext";

export default function OptionScreen({ navigation }) {
  const { userInfo, logout, isLoading } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text>Welcome</Text>
      <Button title="Logout" color="red" onPress={logout} />
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
