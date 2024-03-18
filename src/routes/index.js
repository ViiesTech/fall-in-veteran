import { View, Text } from 'react-native'
import React from 'react'
import AuthStack from './AuthStack'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Bottomtabs from '../screens/mainScreens/Bottomtabs'
import MyDrawer from './DrawerStack'
import { useSelector } from 'react-redux'
const Routes = () => {
    const Stack = createNativeStackNavigator()


    const token = useSelector(state => state.Data.token)


    return (
        <NavigationContainer>
            <Stack.Navigator  screenOptions={{ headerShown: false }}>
                {
                    token ?
                        <>
                            <Stack.Screen name='Bottomtabs' component={Bottomtabs}></Stack.Screen>
                            <Stack.Screen name='MyDrawer' component={MyDrawer}></Stack.Screen>
                        </>
                        :

                        <Stack.Screen name='AuthStack' component={AuthStack}></Stack.Screen>
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes