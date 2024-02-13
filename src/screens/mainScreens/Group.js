import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import Appassets from '../../assets/images/Appassets'
import Colors from '../../assets/utils/colors'

const Group = () => {
  return (
    <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
      <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Groups</Text>
    </ImageBackground>
  )
}

export default Group