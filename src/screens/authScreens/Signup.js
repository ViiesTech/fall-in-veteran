import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Appassets from '../../assets/images/Appassets'
import Eye from 'react-native-vector-icons/Entypo'
import Colors from '../../assets/utils/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setLoader } from '../../redux/AuthSlice'
import Toast from 'react-native-toast-message'
import Base_Api_Url from '../../utls/Base_Api_Url'

const Signup = ({ navigation }) => {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.Data.isLoading)



  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [termscondition, setTermscondition] = useState(true)
  const [pickedImage, setpickedImage] = useState()
  const [showPassword, setShowPassword] = useState(true)

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setpickedImage(image)
    });
  }


  const SignUp = () => {


    

    dispatch(setLoader(true))
    if (email == "") {
      dispatch(setLoader(false))
      showToast("error", "Please enter your email")
    } else if (password == "") {
      dispatch(setLoader(false))
      showToast("error", "Please enter your password")
    } else if (name == "") {
      dispatch(setLoader(false))
      showToast("error", "Please enter your name")
    } else if (termscondition == false) {
      dispatch(setLoader(false))
      showToast("error", "Please confirm your terms & condition")
    }else if(pickedImage == undefined){
      dispatch(setLoader(false))
      showToast("error", "Please select your profile picture")
    } 
    
    else {

      let data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('profile', {
        name: 'image',
        type: pickedImage?.mime,
        uri: pickedImage?.path
      });
      data.append('name', name);
      data.append('tc', termscondition);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Base_Api_Url}Register`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          showToast("success", response.data.message)

          dispatch(setLoader(false))

          if(response.data.status == true){

            navigation.navigate("Login")
            dispatch(setLoader(false))
          }else{
            dispatch(setLoader(false))

          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setLoader(false))
          showToast("error", "Something went wrong")
        });

    }

  }

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg
    })
  }

  return (

    <ImageBackground style={{ flex: 1, justifyContent: "flex-end" }} source={Appassets.splash}>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 0.45, alignItems: 'center', justifyContent: 'flex-end', }}>
          <View style={{ paddingVertical: 30 }}>

            <Text style={{ color: Colors.white, fontSize: 30 }}>FALL IN VETERAN</Text>
            <Text style={{ color: Colors.white, fontSize: 25, marginTop: 10 }}>Create Your Account</Text>
          </View>
        </View>

        <View style={{ flex: 0.55, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>




          <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', alignItems: 'center', backgroundColor: '#707070', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
          </View>

          <TouchableOpacity onPress={() => openLibrary()} style={{ height: 90, width: 90, borderRadius: 200, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>

            {
              pickedImage ?

                <Image source={{ uri: pickedImage.path }} style={{ height: 90, width: 90, borderRadius: 200 }} />
                :
                <Ionicons
                  name="person"
                  color={"white"}
                  size={45}
                />
            }

          </TouchableOpacity>

          <View style={{ width: '100%', padding: 20, alignItems: 'center' }}>



            <TextInput
              style={{ height: 50, width: '100%', borderRadius: 10, backgroundColor: Colors.white, paddingHorizontal: 20, marginBottom: 15 }}
              placeholderTextColor={'grey'}
              placeholder='john'
              onChangeText={(txt) => {
                setName(txt)
              }}
              value={name}
            />

            <TextInput
              style={{ height: 50, width: '100%', borderRadius: 10, backgroundColor: Colors.white, paddingHorizontal: 20, marginBottom: 15 }}
              placeholderTextColor={'grey'}
              placeholder='john@gmail.com'
              onChangeText={(txt) => {
                setEmail(txt)
              }}
              value={email}
            />


            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, width: '100%', borderRadius: 10, paddingHorizontal: 20 }}>

              <TextInput
                style={{ height: 50, width: '90%', borderRadius: 10, }}
                secureTextEntry={showPassword}
                placeholderTextColor={'grey'}
                placeholder='*******'
                onChangeText={(txt) => {
                  setPassword(txt)
                }}
                value={password}
              />

              <Eye color={Colors.black} name={showPassword ? 'eye-with-line' : 'eye'} size={25} onPress={() => setShowPassword(!showPassword)} />
            </View>
            {
              isLoading == true ?

                <View style={{ backgroundColor: Colors.red, height: 60, width: '100%', borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginTop: 15 }} >
                  <ActivityIndicator size={'small'} color={'white'} />
                </View>
                :

                <TouchableOpacity onPress={() => SignUp()} style={{ backgroundColor: Colors.red, height: 60, width: '100%', borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginTop: 15 }} ><Text style={{ color: Colors.white, fontSize: 16 }} >Create</Text></TouchableOpacity>
            } 
            <View style={{ flexDirection: 'row', gap: 3, marginTop: 10 }}>
              <Text style={{ color: Colors.white, fontSize: 16 }}>Already have an Account?</Text>
              <Text onPress={() => navigation.navigate("Login")} style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }} >Login</Text>
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

export default Signup


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