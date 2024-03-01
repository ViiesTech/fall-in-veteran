import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'

import Back from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const Forums = ({navigation}) => {

    const evets = [
        { id: 1 , title: "Our Daily Breads"},
        { id: 2 , title: "Situational Awareness"},
        { id: 3 , title: "What's Going on?"},

    ]

    return (
        <ImageBackground source={Appassets.slide2} style={{ flex: 1, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
                    <Back name='arrowleft' size={25} color={Colors.white} />
                </TouchableOpacity>

                <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 20, }}>Forums</Text>
            </View>


            <View style={{ padding: 20 }}>
                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', }}>Forums</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ width: '100%', backgroundColor: 'gray', opacity: 0.5, borderRadius: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={Colors.white}
                            style={{ width: '80%',height:40  }}
                        />


                        <AntDesign
                            name={'search1'}
                            color={Colors.white}

                        />
                    </View>

                  
                </View>

                <FlatList
                    data={evets}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ height: 50, width: '100%', alignSelf: 'center', marginTop:20 }}>
                                <View style={{ height: 50, width: '100%', opacity: 0.6, backgroundColor: 'gray', position: 'absolute', borderRadius: 10 }} />

                                <View style={{flexDirection:'row', alignItems:'center', height:50, paddingHorizontal:20, justifyContent:'space-between'}}>
                                    <Text style={{color:'white'}}>{item.title}</Text>
                                    <AntDesign
                                    name={'right'}
                                    color={'white'}
                                    size={20}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />


            </View>

        </ImageBackground>
    )
}

export default Forums