import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'

import Back from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const Jobs = ({ navigation }) => {
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
                    <Back name='arrowleft' size={25} color={Colors.white} />
                </TouchableOpacity>

                <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 20, }}>Jobs</Text>
            </View>


            <View style={{ padding: 20 }}>
                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', }}>Find Job that suit's You</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ width: '85%', backgroundColor: 'gray', opacity: 0.5, borderRadius: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder='Search for Jobs'
                            placeholderTextColor={Colors.white}
                            style={{ width: '80%' }}
                        />


                        <AntDesign
                            name={'search1'}
                            color={Colors.white}

                        />
                    </View>

                    <View style={{ height: 40, width: 40, borderRadius: 300, backgroundColor: 'gray', opacity: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/images/filter.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                    </View>


                </View>

                                <ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:200}}>

                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Popular Jobs</Text>

                <View style={{ height: 160 }} >
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={evets}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginLeft: 20, marginTop: 20, borderRadius: 10, }}>
                                    <View style={{ height: 140, width: '100%', opacity: 0.6, backgroundColor: 'gray', position: 'absolute', borderRadius: 10 }} />
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>Senior (HR Manager)</Text>
                                            <FontAwesome
                                                name={'bookmark-o'}
                                                size={18}
                                                color={'white'}
                                                style={{ marginLeft: 20 }}
                                            />
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between' }}>

                                            <Text style={{ color: '#EFEFEF' }}>40k - 50k / year</Text>

                                            <TouchableOpacity style={{ padding: 2, borderWidth: 1, borderColor: 'white', borderRadius: 5, }}>
                                                <Text style={{ color: 'white', fontSize: 10 }}>Full Time</Text>
                                            </TouchableOpacity>
                                        </View>


                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', marginTop: 15 }}>

                                            <Image source={require('../../../assets/images/pfp.png')} style={{ height: 40, width: 40, borderRadius: 200 }} />

                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ color: 'white' }}>Channel Inc, LLC</Text>
                                                <Text style={{ color: 'white' }}>San Diago</Text>
                                            </View>

                                            <View style={{ marginTop: 20 }}>
                                                <Text style={{ color: 'white' }}>4 days ago</Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>


                <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>RECENT JOBS</Text>

                    <FlatList
                        horizontal={false}
                        data={evets}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginTop: 20, borderRadius: 10, }}>
                                    <View style={{ height: 80, width: '100%', opacity: 0.6, backgroundColor: 'gray', position: 'absolute', borderRadius: 10 }} />
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>


                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>


                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('../../../assets/images/pfp.png')} style={{ height: 40, width: 40, borderRadius: 200, marginTop: 10 }} />

                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: 'white', fontSize: 20 }}>Senior (HR Manager)</Text>

                                                    <Text style={{ color: 'white' }}>Channel Inc, LLC</Text>
                                                    <Text style={{ color: 'white' }}>San Diago</Text>
                                                </View>
                                            </View>


                                            <View>
                                                <TouchableOpacity style={{ padding: 2, borderWidth: 1, borderColor: 'white', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>Full Time</Text>
                                                </TouchableOpacity>

                                                <View style={{}}>
                                                    <Text style={{ color: 'white', marginTop: 10 }}>4 days ago</Text>
                                                </View>
                                            </View>


                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />



            </ScrollView>
            </View>

        </ImageBackground>
    )
}

export default Jobs