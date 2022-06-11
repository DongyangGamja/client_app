import AsyncStorage from "@react-native-async-storage/async-storage"
import * as React from "react"
import MainContainer from "./navigation/components/MainContainer"
import SettingContainer from "./navigation/components/SettingContainer"

function App() {
  // AsyncStorage.removeItem("id")
  return <SettingContainer />
}

export default App
