import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainContainer from './MainContainer'
import LoginScreen from './logins/LoginScreen'
import StartScreen from './logins/StartScreen'
import RegisterScreen from './logins/RegisterScreen'

const Stack = createNativeStackNavigator()


export default function SettingContainer(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown: false}}
                >
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Main" component={MainContainer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
