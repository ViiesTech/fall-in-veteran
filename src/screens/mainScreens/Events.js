import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Appassets from '../../assets/images/Appassets'
import Colors from '../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'
const Events = () => {

  const evets = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },

    { id: 5 },
    { id: 6 },
    { id: 7 },
  ]
  return (
    <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
      <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Events</Text>


      <View style={{ paddingBottom: 75 }}>
        <FlatList
          data={evets}
          renderItem={({ item }) => {
            return (

              <View style={{ height: 300, width: '90%', alignSelf: 'center', marginTop: 10, }}>
                <View style={{ height: 300, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />

                <Image source={require('../../assets/images/Events.png')} style={{ alignSelf: 'center', marginTop: 5, borderRadius: 10, width: '90%', marginTop: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginTop: 10 }}>

                  <Text style={{ color: 'white', fontSize: 16 }}>Summer Movie Night</Text>
                  <Text style={{ color: 'white', fontSize: 10 }}>Happening Right Now</Text>
                </View>

                <Text style={{ color: '#EFEFEF', width: '90%', alignSelf: 'center', marginTop:5  }} numberOfLines={3}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </Text>

                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 10 }}>
                  <TouchableOpacity style={{ height: 50, width: '80%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.red, borderRadius: 10 }}>
                    <Text style={{ color: 'white' }}>Interested</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 10, borderWidth: 1, borderColor: Colors.red, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Fontisto
                      name={'share-a'}
                      color={Colors.white}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </View>
    </ImageBackground>
  )
}

export default Events





