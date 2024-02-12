import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import Appassets from '../../assets/images/Appassets'

const Create = () => {
  return (
    <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
      <Text style={{ color: 'white', fontSize: 25, padding: 20 }}>Create</Text>
    </ImageBackground>
  )
}

export default Create