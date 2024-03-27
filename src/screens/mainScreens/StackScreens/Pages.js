import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Back from 'react-native-vector-icons/AntDesign';
import Base_Api_Url from '../../../utls/Base_Api_Url'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Page_Porfile_Base_Url from '../../../utls/Page_Porfile_Base_Url'
import { setData } from '../../../redux/AuthSlice'

const Pages = ({ navigation }) => {

    const [allPages, setAllPages] = useState([])

    const token = useSelector(state => state.Data.token)
    const isLoading = useSelector(state => state.Data.isLoading)
    const currentUserData = useSelector(state => state.Data.data)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getAllPages()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation])
    const getAllPages = () => {

        console.log("run again")
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}GetAllPages`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: data
        };

        axios.request(config)
            .then((response) => {

                setAllPages(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });


    }


    const LikePage = (id) => {

        let data = JSON.stringify({
            "PageId": id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}LikePage`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                
                dispatch(setData(response.data.updated_data))
                getAllPages()
                
            })
            .catch((error) => {
                console.log(error);
            });

    }

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
                    data={allPages}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ height: 80, width: '90%', alignSelf: 'center', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 80, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>


                                    <TouchableOpacity onPress={() => navigation.navigate("PageDetail", { pageId: item._id, pageImageandName: item })} style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: `${Page_Porfile_Base_Url}${item.PageImage}` }} style={{ alignSelf: 'center', borderRadius: 10, width: 50, height: 50, borderRadius: 100, marginLeft: 10 }} />

                                        <View style={{ paddingHorizontal: 10, }}>

                                            <Text style={{ color: 'white', fontSize: 16 }}>{item.PageName}</Text>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                <Fontisto
                                                    name={'world-o'}
                                                    color={'white'}
                                                    size={14}
                                                />
                                                <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>{item.Mode} Page {item?.Members?.length} Likes</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    {
                                        item.Members.includes(currentUserData._id) ?

                                            <TouchableOpacity onPress={() => LikePage(item._id)} style={{ backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, flexDirection: 'row', paddingVertical: 10 }}>
                                                <AntDesign
                                                    name={'like2'}
                                                    color={'black'}
                                                    size={20}
                                                />
                                                <Text style={{ color: Colors.black, marginLeft: 10 }}>Liked</Text>
                                            </TouchableOpacity>
                                            :

                                            <TouchableOpacity onPress={() => LikePage(item._id)} style={{ backgroundColor: Colors.red, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, flexDirection: 'row', paddingVertical: 10 }}>
                                                <AntDesign
                                                    name={'like2'}
                                                    color={'white'}
                                                    size={20}
                                                />
                                                <Text style={{ color: Colors.white, marginLeft: 10 }}>Like</Text>
                                            </TouchableOpacity>
                                    }
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