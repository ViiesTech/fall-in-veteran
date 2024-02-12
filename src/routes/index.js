import { View, Text } from 'react-native'
import React from 'react'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Bottomtabs from '../screens/mainScreens/Bottomtabs'
import MyDrawer from './DrawerStack'
const Routes = () => {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='AuthStack' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='AuthStack' component={AuthStack}></Stack.Screen>
                <Stack.Screen name='Bottomtabs' component={Bottomtabs}></Stack.Screen>
                <Stack.Screen name='MyDrawer' component={MyDrawer}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes