//전체 컨테이너 관리
import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MainContainer from "./MainContainer"
import LoginScreen from "../logins/LoginScreen"
import StartScreen from "../logins/StartScreen"
import RegisterScreen from "../logins/RegisterScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Stack = createNativeStackNavigator()

export default function SettingContainer() {
  const [logined, setLogined] = useState(false)
  const getData = async () => {
    try {
      const loadedData = await AsyncStorage.getItem("id")
      JSON.parse(loadedData) && setLogined(true)
    } catch (e) {}
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {logined ? (
          <>
            <Stack.Screen name="Main" component={MainContainer} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Main" component={MainContainer} />
          </>
        )}
        {/*
          {userInfo.access_token ? (
          <Stack.Screen name="Main" component={MainContainer} />
        ) : (
          <>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )} 
          */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
