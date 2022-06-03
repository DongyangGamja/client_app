import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import MainContainer from "./MainContainer";
import LoginScreen from "../logins/LoginScreen";
import StartScreen from "../logins/StartScreen";
import RegisterScreen from "../logins/RegisterScreen";
import { AuthContext } from "../logins/AuthContext";

const Stack = createNativeStackNavigator();

export default function SettingContainer() {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splashLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
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
  );
}
