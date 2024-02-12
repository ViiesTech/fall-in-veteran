import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Bottomtabs from '../screens/mainScreens/Bottomtabs'

const MainStack = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Bottomtabs' component={Bottomtabs}></Stack.Screen>
    </Stack.Navigator>

  )
}

export default MainStack