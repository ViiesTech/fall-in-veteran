import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'


import LikeIcon from 'react-native-vector-icons/AntDesign'
import CommentIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotsIcon from 'react-native-vector-icons/Entypo'
import Header from '../../../components/Header'
import SaveIcon from 'react-native-vector-icons/FontAwesome'
import HideIcon from 'react-native-vector-icons/Feather'
import ReportIcon from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import Profile_Image_Base_Url from '../../../utls/Profile_Image_Base_Url'
import Base_Api_Url from '../../../utls/Base_Api_Url'
import axios from 'axios'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { setData } from '../../../redux/AuthSlice'

const FriendsProfile = ({ route, navigation }) => {

    const [FriendsPost, setFriendsPost] = useState()

    const { data } = route.params
    const dispatch = useDispatch()

    const token = useSelector(state => state.Data.token)
    const userData = useSelector((state) => state.Data.data)

    console.log("userData userData userData userData ", userData)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action

            getAllPost()
        });
        return unsubscribe;
    }, [navigation]);


    const getAllPost = () => {
        let datas = JSON.stringify({
            "FriendID": data.userId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}getFriendsPost`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: datas
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setFriendsPost(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }



    const sendFriendRequest = (item) => {

        const userId = item.userId
        // const updateState = [...friend_req_send]
        // const findIndex = friend_req_send.indexOf(userId)

        // if (findIndex !== -1) {
        //     updateState.splice(findIndex, 1)
        //     set_Friend_Req_Send(updateState)
        // } else {
        //     updateState.push(userId)
        //     set_Friend_Req_Send(updateState)
        // }

        // if (findIndex !== -1) {

        // } else {
            let data = JSON.stringify({
                "friendId": userId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${Base_Api_Url}FriendRequestSend`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: data
            };

            axios.request(config)
                .then((response) => {

                    if (response.data.success == false) {

                    } else {
                        dispatch(setData(response.data.updated_data))

                        Toast.show({
                            type: 'success',
                            text1: "Friend request sent successfully"
                        })

                    }


                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        // }
    }

    const AcceptRequest = (item) => {


        const userId = item.userId

        let data = JSON.stringify({
            "friendId": userId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}AcceptFriendRequest`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.data.success == false) {

                } else {
                    dispatch(setData(response.data.updated_data))

                }
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const CancelRequest = (item) => {
        const userId = item.userId



        if (userId) {

            let data = JSON.stringify({
                "friendId": userId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${Base_Api_Url}CancelFriendRequest`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    if (response.data.success == false) {

                    } else {
                        dispatch(setData(response.data.updated_data))

                    }
                    console.log(JSON.stringify(response.data));

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    const RevertTheFriendReques = (item) =>{
        const userId = item.userId

        
        let data = JSON.stringify({
            "friendId": userId
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}CancelTheRequestISend`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {

            if (response.data.success == false) {

            } else {
                dispatch(setData(response.data.updated_data))

            }

          })
          .catch((error) => {
            console.log(error);
          });
          
    }



    const unFriendUser = (item) => {

        const userId = item.userId

        let data = JSON.stringify({
            "friendId": userId
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}unFriendUser`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            if (response.data.success == false) {

            } else {
                dispatch(setData(response.data.updated_data))

            }

          })
          .catch((error) => {
            console.log(error);
          });
          
    }

    return (
        <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20, paddingBottom: 10 }}>

                    <Ionicons
                        name={'chevron-back'}
                        size={25}
                        color={Colors.white}

                    />
                </TouchableOpacity>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, }}>
                    <View style={{ height: '100%', width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />
                    <Image source={require('../../../assets/images/cover.png')} style={{ alignSelf: 'center', borderTopRightRadius: 10, borderTopLeftRadius: 10, width: '100%', height: 100, }} />

                    {
                        data ?

                            <Image source={{ uri: `${Profile_Image_Base_Url}${data?.Profile_Picture}` }} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 10, position: 'absolute', top: 70 }} />
                            :
                            <Ionicons
                                name={'person'}
                                color={'white'}
                                size={30}
                                style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 10, position: 'absolute', top: 70 }} />
                    }


                    <View style={{ paddingHorizontal: 10, width: '75%', alignSelf: 'flex-end', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'ce' }}>

                        <View>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{data?.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../../assets/images/medal.png')} style={{ height: 20, width: 20 }} />
                                <Text style={{ color: '#79C14B', fontSize: 12, marginLeft: 1 }}>Verified Profile</Text>
                            </View>
                        </View>



                    </View>


                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginBottom: 20, marginTop: 20, justifyContent: 'space-between' }}>
                        {

                            userData?.Req?.includes(data.userId) ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

                                    <TouchableOpacity onPress={() => AcceptRequest(data)} style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: Colors.white }}>Accept Request</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => CancelRequest(data)} style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: Colors.white }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                userData?.ReqSend?.includes(data.userId) ?
                                    <TouchableOpacity onPress={() => RevertTheFriendReques(data)} style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: Colors.white }}>Cancel Request</Text>
                                    </TouchableOpacity>
                                    :
                                    userData?.Friends?.includes(data.userId) ?
                                        <TouchableOpacity onPress={()=> unFriendUser(data)} style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: Colors.white }}>Unfriend</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={()=> sendFriendRequest(data)} style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 14 }}>Send Request</Text>
                                        </TouchableOpacity>
                        }

                        {
                            userData?.Friends?.includes(data.userId) ?

                                <TouchableOpacity onPress={() => navigation.navigate("Conversation", { FriendData: { _id: data.userId, Profile_Picture: data.Profile_Picture, name: data.name } })} style={{ backgroundColor: 'green', borderRadius: 10, width: "45%", alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 14 }}>Message</Text>
                                </TouchableOpacity>
                                :
                                null

                        }

                    </View>
                </View>


                <View style={{ flex: 1, marginTop: 30 }}>

                    <FlatList
                        data={FriendsPost?.sort((a, b) => {
                            const timeA = new Date(a.createdAt).getTime();
                            const timeB = new Date(b.createdAt).getTime();
                            return timeB - timeA;
                        })}
                        renderItem={({ item }) => {

                            console.log("item", item)
                            const getTime = new Date(item.createdAt).getTime()

                            const timeAgo = moment(getTime).fromNow(true);
                            return (
                                <View style={{ width: '100%', marginTop: 10, alignSelf: 'center', overflow: 'hidden', }}>
                                    <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', alignSelf: 'center' }}>
                                    </View>

                                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 10 }}>
                                        <TouchableOpacity >
                                            <Image source={{ uri: Profile_Image_Base_Url + item?.Profile_Picture }} style={{ height: 40, width: 40, borderRadius: 200 }}></Image>
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: 10 }} >
                                            <TouchableOpacity >
                                                <Text style={{ color: Colors.white, fontSize: 16 }}>{item.name}</Text>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                                    <Text style={{ color: Colors.white }}>{timeAgo}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ padding: 20 }}>
                                        <View style={{ borderColor: Colors.red, borderWidth: 1, borderRadius: 10 }}>
                                            <Text style={{ color: Colors.white, padding: 10 }}>{item.Post_Text}</Text>
                                            {item.Post_Image && (
                                                <TouchableOpacity >
                                                    <Image source={{ uri: Post_Profile_Base_Url + item.Post_Image }} style={{ width: '100%', borderRadius: 10, height: 200, resizeMode: 'cover' }}></Image>
                                                </TouchableOpacity>

                                            )}
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25, height: 40, paddingHorizontal: 20 }}>

                                            <TouchableOpacity onPress={() => Like(item)} >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <LikeIcon name={item.Post_Like.includes(data._id) ? "like1" : "like2"} size={20} color={Colors.white} />
                                                    <Text style={styles.textColor}>{item?.Post_Like?.length}</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { navigation.navigate("CommentScreen", { Post_data: item }) }} >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><CommentIcon size={20} name='comment-outline' color={Colors.white} />
                                                    <Text style={styles.textColor}>{item?.All_Comments_On_Post?.length}</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { setShareItem(item), showAlert(true) }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><ShareIcon size={20} name='share-outline' color={Colors.white} />
                                                    <Text style={styles.textColor}>{item?.Post_Share?.length}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            {/* <TouchableOpacity onPress={(() => toggleDialog(item.id))}><DotsIcon name='dots-three-vertical' color={Colors.white} size={17} /></TouchableOpacity> */}
                                        </View>

                                    </View>



                                </View>
                            )
                        }}
                    />

                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default FriendsProfile


const styles = StyleSheet.create({
    textColor: {
        color: Colors.white
    },

})