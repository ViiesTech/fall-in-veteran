import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Appassets from '../../assets/images/Appassets'
import Eye from 'react-native-vector-icons/Entypo'
import Colors from '../../assets/utils/colors'
const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true)

  return (

    <ImageBackground style={{ flex: 1, justifyContent: "flex-end" }} source={Appassets.splash}>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 0.45, alignItems: 'center', justifyContent: 'flex-end', }}>
          <View style={{ paddingVertical: 30 }}>

            <Text style={{ color: Colors.white, fontSize: 30 }}>FALL IN VETERAN</Text>
            <Text style={{ color: Colors.white, fontSize: 25, marginTop: 10 }}>Login To Your Account</Text>
          </View>
        </View>

        <View style={{ flex: 0.55, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>

          <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', alignItems: 'center', backgroundColor: '#707070', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
          </View>
          <View style={{ width: '100%', padding: 20, alignItems: 'center' }}>
            <TextInput style={{ height: 50, width: '100%', borderRadius: 10, backgroundColor: Colors.white, paddingHorizontal: 20 }} placeholderTextColor={'grey'} placeholder='john@gmail.com'>

            </TextInput>
            <View style={{ flexDirection: 'row' }}>

              <TextInput style={{ height: 50, width: '100%', borderRadius: 10, backgroundColor: Colors.white, paddingHorizontal: 20, marginTop: 15 }} secureTextEntry={showPassword} placeholderTextColor={'grey'} placeholder='*******'>
              </TextInput>
              <Eye style={{ position: 'absolute', right: 0, alignSelf: 'center', padding: 5, top: 22, }} color={Colors.black} name={showPassword ? 'eye-with-line' : 'eye'} size={25} onPress={() => setShowPassword(!showPassword)}></Eye>
            </View>

            <Text style={{ alignSelf: 'flex-end',  color: Colors.white, fontSize: 16, marginTop: 10 }}>Forgot Password?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Bottomtabs')} style={{ backgroundColor: Colors.red, height: 60, width: '100%', borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginTop: 15 }} ><Text style={{ color: Colors.white, fontSize: 16 }} >Login</Text></TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 3, marginTop: 10 }}>
              <Text style={{ color: Colors.white, fontSize: 16 }}>Don't have an Account?</Text>
              <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }} >Sign Up</Text>
            </View>

            <View style={{ height: 1, width: '100%', borderColor: '#1D1D1D', backgroundColor: '#1D1D1D', marginTop: 30 }}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '100%' }}>
              <Text style={styles.footerText}>About</Text>
              <Text style={styles.footerText}>Terms</Text>
              <Text style={styles.footerText}>Privacy</Text>
              <Text style={styles.footerText}>Contact Us</Text>
              <Text style={styles.footerText}>Directory</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20, alignItems: 'center' }}>
              <View><Text style={styles.footerText}>© 2024 Fall In Veteran</Text></View>
              <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}><Image source={Appassets.flag}></Image><Text style={styles.footerText}>English</Text></View>
            </View>
          </View>
        </View>

      </ScrollView>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({

  footerText: {
    color: Colors.white,
    fontSize: 13
  },
  absolute: {
    position: "absolute",
    height: '100%',
    width: '100%',
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    overflow: 'hidden',
  }
})