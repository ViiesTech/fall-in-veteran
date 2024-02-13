import React from 'react'
import Signup from '../screens/authScreens/Signup'
import Login from '../screens/authScreens/Login'
import ForgetPassword from '../screens/authScreens/ForgetPassword'
import Otp from '../screens/authScreens/Otp'
import ResetPassword from '../screens/authScreens/ResetPassword'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/authScreens/Splash'
import Slider from '../screens/authScreens/Slider'
import Welcome from '../screens/authScreens/Welcome'
const AuthStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={Splash}></Stack.Screen>
            <Stack.Screen name='Slider' component={Slider}></Stack.Screen>
            <Stack.Screen name='Welcome' component={Welcome}></Stack.Screen>
            <Stack.Screen name='Signup' component={Signup}></Stack.Screen>
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
            <Stack.Screen name='ForgetPassword' component={ForgetPassword}></Stack.Screen>
            <Stack.Screen name='Otp' component={Otp}></Stack.Screen>
            <Stack.Screen name='ResetPassword' component={ResetPassword}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack