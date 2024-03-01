import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'

import Back from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Blogs = ({ navigation }) => {
    const data = [
        {
            id: 1,
            profilePic: Appassets.profile2,
            name: 'Charles James',
            addedPhoto: 'added a new photo',
            time: '7h',
            caption: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
            postPic: true,
            likes: '196',
            comment: '20',
            share: '5',
            userPost: true
        },
        {
            id: 2,
            profilePic: Appassets.profile3,
            name: 'Charles James',
            addedPhoto: 'added a new photo',
            time: '7h',
            caption: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor',
            postPic: false,
            likes: '196',
            comment: '20',
            share: '5',
            userPost: false
        },
        {
            id: 3,
            profilePic: Appassets.profile3,
            name: 'The_Fall_In_Skipper',
            addedPhoto: 'Shared a post',
            time: '2 days ago',
            caption: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
            postPic: true,
            likes: '196',
            comment: '20',
            share: '5',
            userPost: true
        },
    ]



    return (
        <ImageBackground source={Appassets.slide2} style={{ flex: 1, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
                    <Back name='arrowleft' size={25} color={Colors.white} />
                </TouchableOpacity>

                <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 20, }}>Blogs</Text>
            </View>


            <View style={{ padding: 20 }}>
                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', }}>Search Artist</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ width: '100%', backgroundColor: 'gray', opacity: 0.5, borderRadius: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={Colors.white}
                            style={{ width: '90%',height:40 }}
                        />
                        <AntDesign
                            name={'search1'}
                            color={Colors.white}

                        />
                    </View>
                </View>
            </View>



            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: '90%', marginTop: 10, alignSelf: 'center', overflow: 'hidden', borderRadius: 10 }}>
                            <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', alignSelf: 'center' }}>
                            </View>

                            
                            <View style={{padding:10}}>
                            <View style={{  borderRadius: 10,  }}>
                                {item.postPic && (
                                    <Image source={Appassets.postImage} style={{ width: '100%', borderRadius: 10 }}></Image>
                                    
                                    )}
                                    <Text style={{ color: Colors.white, fontSize: 20, width:'95%',  alignSelf:'center', marginTop:10 }} numberOfLines={1}>Lorem ipsum dolor sit amet, consetetur</Text>
                                    <Text style={{ color: Colors.white, padding: 10 }} numberOfLines={4}>{item.caption}</Text>
                            </View>
                            </View>
                            

                            <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginBottom:10 }}>
                                <TouchableOpacity >
                                    <Image source={item.profilePic} style={{ height: 40, width: 40 }} />
                                </TouchableOpacity>
                                <View style={{ marginLeft: 10 }} >
                                    <TouchableOpacity >
                                        <Text style={{ color: Colors.white, fontSize: 16 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            <Text style={{ color: Colors.white }}>{item.time}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>



                        </View>
                    )
                }}
            />




        </ImageBackground>
    )
}

export default Blogs


const styles = StyleSheet.create({
    textColor: {
        color: Colors.white
    },

})