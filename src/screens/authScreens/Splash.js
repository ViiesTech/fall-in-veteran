import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import Appassets from '../../assets/images/Appassets'
import Colors from '../../assets/utils/colors'
// import Images from '../../assets/Appassets'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Slider')
        }, 1500)
    }, [])
    return (
        <ImageBackground source={Appassets.splash} style={{ flex: 1 }}>
            <View style={{ flex: 0.4, justifyContent: 'flex-end', padding: 20 }}>

                <Text style={{ color: Colors.white, fontSize: 33 }}>FALL IN VETERAN</Text>
            </View>
        </ImageBackground>
    )
}

export default Splash