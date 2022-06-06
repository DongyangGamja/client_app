//바텀 탭 스크린용 컨테이너
import * as React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import HomeScreen from "../screens/HomeScreen";
import RankingScreen from "../screens/RankingScreen";
import FeedScreen from "../screens/FeedScreen";
import OptionScreen from "../screens/OptionScreen";

//Screens name
const homeName = "Home";
const rankingName = "Ranking";
const feedName = "Feed";
const optionName = "Option";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === rankingName) {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (rn === feedName) {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          } else if (rn === optionName) {
            iconName = focused ? "options" : "options-outline";
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarShowLabel: true,
        headerShown: false,
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={rankingName} component={RankingScreen} />
      <Tab.Screen name={feedName} component={FeedScreen} />
      <Tab.Screen name={optionName} component={OptionScreen} />
    </Tab.Navigator>
  );
}
