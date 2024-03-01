import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'

import Back from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign'

import LikeIcon from 'react-native-vector-icons/AntDesign'
import CommentIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotsIcon from 'react-native-vector-icons/Entypo'
const Watchs = ({ navigation }) => {
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

                <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 20, }}>Watch</Text>
            </View>


            <View style={{ flex: 1, marginTop: 30 }}>

                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '100%', marginTop: 10, alignSelf: 'center', borderRadius: 20, overflow: 'hidden', }}>
                                <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', alignSelf: 'center' }}>
                                </View>

                                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 10 }}>
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

                                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                                    <View style={{ borderColor: Colors.red, borderWidth: 1, borderRadius: 10 }}>
                                        <Text style={{ color: Colors.white, padding: 10 }}>{item.caption}</Text>

                                        <Image source={Appassets.videopic} style={{ width: '100%', borderRadius: 10 }}></Image>

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25, height: 40, paddingHorizontal: 20 }}>
                                        <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><LikeIcon name='like2' size={20} color={Colors.white} /><Text style={styles.textColor}>{item.likes}</Text></View></TouchableOpacity>
                                        <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><CommentIcon size={20} name='comment-outline' color={Colors.white} /><Text style={styles.textColor}>{item.comment}</Text></View></TouchableOpacity>
                                        <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><ShareIcon size={20} name='share-outline' color={Colors.white} /><Text style={styles.textColor}>{item.share}</Text></View></TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={(() => toggleDialog(item.id))}><DotsIcon name='dots-three-vertical' color={Colors.white} size={17} /></TouchableOpacity>
                                    </View>

                                </View>



                            </View>
                        )
                    }}
                />

            </View>

        </ImageBackground>
    )
}

export default Watchs

const styles = StyleSheet.create({
    textColor: {
        color: Colors.white
    },

})