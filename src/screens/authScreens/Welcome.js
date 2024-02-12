import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Appassets from '../../assets/images/Appassets'

const Welcome = ({ navigation }) => {
    return (
        <ImageBackground source={Appassets.splash} style={{ flex: 1 }}>
            <View style={{ flex: 0.5, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 30 }}>WELCOME TO</Text>
                <Text style={{ color: 'white', fontSize: 25 }}>FALL IN VETERAN</Text>
            </View>

            <View style={{ alignItems: 'center', gap: 10, flex: 0.5 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Time To Get Started</Text>
                <TouchableOpacity style={{ backgroundColor: '#BF0B30', height: 60, width: '85%', borderRadius: 35, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Login')}><Text style={{ color: 'white', fontSize: 16 }}>Get Started! Sign Up</Text></TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>Already Have An Account.</Text>
                    <Text style={{ color: '#BF0B30', fontSize: 16, fontWeight: 'bold', marginLeft: 2 }} >Login Here</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Welcome