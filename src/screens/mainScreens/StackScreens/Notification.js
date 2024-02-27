import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'

import Back from 'react-native-vector-icons/AntDesign';

const Notification = ({ navigation }) => {


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
        <ImageBackground source={Appassets.slide2} style={{ flex: 1, }}>
            <TouchableOpacity style={{marginTop:20, marginLeft:20}} onPress={() => navigation.goBack()}>
                <Back name='arrowleft' size={25} color={Colors.white} />
            </TouchableOpacity>


            <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Notifications</Text>


            <View style={{ flex: 1, paddingBottom: 0 }}>
                <FlatList
                    data={evets}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View style={{ height: 80, width: '90%', alignSelf: 'center', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 80, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />

                                    <Image source={require('../../../assets/images/profile.png')} style={{ alignSelf: 'center', borderRadius: 10, width: 50, height: 50, borderRadius: 100, marginLeft: 10 }} />

                                    <View style={{ paddingHorizontal: 20, width: '80%' }}>

                                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>MIchael James: Posted a Video in Farmer JS</Text>
                                        <Text style={{ color: 'white', fontSize: 10 }} numberOfLines={3}>ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy Lorem</Text>
                                    </View>



                                </View>
                                <Text style={{ color: 'gray', alignSelf:'flex-end', marginRight:20 }}>1 Minute ago</Text>
                            </View>
                        )
                    }}
                />
            </View>

        </ImageBackground>
    )
}

export default Notification