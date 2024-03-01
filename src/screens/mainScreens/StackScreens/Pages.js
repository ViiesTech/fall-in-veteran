import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Back from 'react-native-vector-icons/AntDesign';

const Pages = ({navigation}) => {

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

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
                    <Back name='arrowleft' size={25} color={Colors.white} />
                </TouchableOpacity>

                <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 20, }}>Pages</Text>
            </View>


            <View style={{ flex: 1, paddingBottom: 0 }}>
                <FlatList
                    data={evets}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ height: 80, width: '90%', alignSelf: 'center', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 80, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>


                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../../assets/images/profile.png')} style={{ alignSelf: 'center', borderRadius: 10, width: 50, height: 50, borderRadius: 100, marginLeft: 10 }} />

                                        <View style={{ paddingHorizontal: 10, }}>

                                            <Text style={{ color: 'white', fontSize: 16 }}>Listen America</Text>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                <Fontisto
                                                    name={'world-o'}
                                                    color={'white'}
                                                    size={14}
                                                />
                                                <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>Public Page  1k Likes</Text>
                                            </View>
                                        </View>
                                    </View>


                                    <TouchableOpacity style={{ backgroundColor: Colors.red, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, flexDirection: 'row', paddingVertical: 10 }}>
                                        <AntDesign
                                            name={'like2'}
                                            color={'white'}
                                            size={20}
                                        />
                                        <Text style={{ color: Colors.white, marginLeft: 10 }}>Like</Text>
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

export default Pages