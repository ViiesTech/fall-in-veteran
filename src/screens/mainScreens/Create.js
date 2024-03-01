import { View, Text, ImageBackground, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appassets from '../../assets/images/Appassets'
import Colors from '../../assets/utils/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Create = () => {



  return (
   
      <ImageBackground source={Appassets.slide2} style={{ height: '100%', }}>
        <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Create</Text>



        <View style={{ padding:20 }}>

          <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', borderRadius: 10,  alignSelf: 'center' }}>
          </View>

          <View style={{ height:250}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
              <Text style={{ color: 'white', fontSize: 20 }}>Create Post</Text>

              <TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 1, width: '100%', backgroundColor: 'white', marginTop: 10, marginBottom: 10 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>

              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/images/profile.png')} style={{ height: 40, width: 40 }} />

                <View style={{ marginLeft: 10, }}>
                  <Text style={{ color: 'white' }}>Charles James</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <FontAwesome5
                      name={'user-friends'}
                      color={'white'}
                      size={15}

                    />
                    <Text style={{ color: 'white', marginLeft: 5 }}>Friends</Text>

                    <Text style={{ color: 'white', marginLeft: 10, fontSize: 20 }}>+</Text>
                    <Text style={{ color: 'white', marginLeft: 5 }}>Friends</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={{ padding: 20, backgroundColor: Colors.red, borderRadius: 10, paddingVertical: 10 }}>
                <Text style={{ color: 'white' }}>Post</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="What's on your mind?"
              placeholderTextColor={'white'}
              style={{ width: '90%', alignSelf: 'center', marginTop: 10, fontSize: 20, color: 'white' }}

            />

            <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 10, justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ height: 50, width: '45%', borderWidth: 1, borderColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <EvilIcons
                  name={'image'}
                  color={'white'}
                  size={25}
                />
                <Text style={{ color: 'white', marginLeft: 10 }}>Photos</Text>
              </TouchableOpacity>


              <TouchableOpacity style={{ height: 50, width: '45%', borderWidth: 1, borderColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <AntDesign
                  name={'tago'}
                  color={'white'}
                  size={20}
                />
                <Text style={{ color: 'white', marginLeft: 10 }}>Tag People</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>


      </ImageBackground>

  )
}

export default Create