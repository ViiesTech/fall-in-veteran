import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Appassets from '../../assets/images/Appassets'
import Colors from '../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'

const Group = () => {

  const evets = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
  ]

  return (
    <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
      <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Events</Text>


      <View style={{flex:1, paddingBottom:0}}>
        <FlatList
          data={evets}
          renderItem={({ item }) => {
            return (

              <View style={{ height: 80, width: '90%', alignSelf: 'center', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 80, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />

                <Image source={require('../../assets/images/profile.png')} style={{ alignSelf: 'center', borderRadius: 10, width: 50, height: 50, borderRadius: 100, marginLeft: 10 }} />

                <View style={{ paddingHorizontal: 20, }}>

                  <Text style={{ color: 'white', fontSize: 16 }}>Summer Movie Night</Text>
                  <Text style={{ color: 'white', fontSize: 10 }}>Happening Right Now</Text>
                </View>


                <TouchableOpacity style={{ backgroundColor: Colors.red, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10 }}>
                  <Text style={{ color: Colors.white }}>Join Now</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>
    </ImageBackground>
  )
}

export default Group