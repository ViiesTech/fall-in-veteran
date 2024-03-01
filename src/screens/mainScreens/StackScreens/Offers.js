import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'

import Back from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Offers = ({navigation}) => {

    const evets = [
        { id: 1, title: "Our Daily Breads" },
        { id: 2, title: "Situational Awareness" },
        { id: 3, title: "What's Going on?" },
        { id: 5, title: "Our Daily Breads" },
        { id: 6, title: "Situational Awareness" },
        { id: 7, title: "What's Going on?" },
        { id: 8, title: "Our Daily Breads" },
        { id: 9, title: "Situational Awareness" },
        { id: 10, title: "What's Going on?" },
        { id: 11, title: "Our Daily Breads" },
        { id: 12, title: "Situational Awareness" },
        { id: 13, title: "What's Going on?" },
        { id: 15, title: "Our Daily Breads" },
        { id: 16, title: "Situational Awareness" },
        { id: 17, title: "What's Going on?" },
        { id: 18, title: "Our Daily Breads" },
        { id: 19, title: "Situational Awareness" },
        { id: 20, title: "What's Going on?" },
    ]

    return (
        <ImageBackground source={Appassets.slide2} style={{ flex: 1, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
                    <Back name='arrowleft' size={25} color={Colors.white} />
                </TouchableOpacity>

                <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 20, }}>OFFERS</Text>
            </View>


            <View style={{ padding: 20, paddingBottom:135 }}>
                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', }}>LATEST</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ width: '100%', backgroundColor: 'gray', opacity: 0.5, borderRadius: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={Colors.white}
                            style={{ width: '80%',height:40 }}
                        />


                        <AntDesign
                            name={'search1'}
                            color={Colors.white}

                        />
                    </View>


                </View>


                
                <FlatList
                    data={evets}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ height: 180, width: '100%', alignSelf: 'center', marginTop: 20 }}>
                                <View style={{ height: 180, width: '100%', opacity: 0.6, backgroundColor: 'gray', position: 'absolute', borderRadius: 10 }} />

                                <View style={{ height: 180, padding: 10 }}>
                                    <Image source={require('../../../assets/images/offer.png')} style={{ width: '100%', alignSelf: 'center', borderRadius: 10 }} />

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 20 }}>Nike official outlet sale</Text>
                                        <Text style={{ color: 'white', fontSize: 12 }}>EXP: 2, 27 , 2024</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />


            </View>

        </ImageBackground>
    )
}

export default Offers