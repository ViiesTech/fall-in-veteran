import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Appassets from '../../../../assets/images/Appassets'
import Back from 'react-native-vector-icons/AntDesign';
import Colors from '../../../../assets/utils/colors';
import Page_Porfile_Base_Url from '../../../../utls/Page_Porfile_Base_Url';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Profile_Image_Base_Url from '../../../../utls/Profile_Image_Base_Url';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageCropPicker from 'react-native-image-crop-picker';
import Base_Api_Url from '../../../../utls/Base_Api_Url';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import LikeIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modal'


import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';


import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Post from '../../../../components/PostCard/Post';
import { setData } from '../../../../redux/AuthSlice';

const PageDetail = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const { pageId, pageImageandName } = route.params

    console.log("pageImageandName",pageImageandName)
    const currentUserData = useSelector(state => state.Data.data)
    const token = useSelector(state => state.Data.token)

    const [pickedImage, setpickedImage] = useState()

    const [StatusText, setStatusText] = useState("")
    const [allData, setAllData] = useState([])

    const [pageData, setPageData] = useState(pageId)

    const [OnlyMyPosts, setOnlyMyPost] = useState()
    const [postReaction, setPostReaction] = useState([])
    const [reactionshowing, ShowReaction] = useState(false)
    const [activePostId, setActivePostId] = useState(null);
    const [alert, showAlert] = useState(false)
    const [visible, setIsVisible] = useState(false);
    const [postImage, setPostImage] = useState([])

    const reactions = [

        {
            id: 0,
            source: Appassets.like,
            title: 'like'
        },
        {
            id: 1,
            source: Appassets.heart,
            title: 'heart'
        },
        {
            id: 2,
            source: Appassets.laugh,
            title: 'laugh'
        },
        {
            id: 3,
            source: Appassets.wow,
            title: 'wow'
        },
        {
            id: 4,
            source: Appassets.sad,
            title: 'sad'
        },
        {
            id: 5,
            source: Appassets.angry,
            title: 'angry'
        },
    ];



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getmyPagePost()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount

        return unsubscribe;
    }, [navigation])



    const openLibrary = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setpickedImage(image)
        });
    }

    const LikePage = (id) => {

        

        let data = JSON.stringify({
            "PageId": pageId
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
                // navigation.goBack()
                dispatch(setData(response.data.updated_data))
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const CreatePost = () => {

        if (pickedImage == undefined && StatusText == "") {

            showToast('error', 'What are you trying to create?')
        } else {

            let data = new FormData();
            data.append('Post_Picture', pickedImage ? {
                name: "image",
                type: pickedImage.mime,
                uri: pickedImage.path
            }
                :
                ""
            );
            data.append('message', StatusText);
            data.append('Page_id', pageData._id);
            data.append('Page_Profile_Picture', pageData?.PageImage ? pageData?.PageImage : "");
            data.append('Page_name', pageData.PageName);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${Base_Api_Url}CreatePost`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    showToast('success', 'Successfully created.')
                    setStatusText("")
                    setpickedImage("")

                })
                .catch((error) => {
                    console.log(error);
                    showToast('error', 'Not Created')
                    dispatch(setLoader(false))

                });
        }
    }

    const getmyPagePost = () => {
        let data = JSON.stringify({
            "PageId": pageId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}GetPagePost`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {

                setAllData(response.data.data)
                
                // const filteringIexist = response.data.All_Post.Post_Like.filter(post => post.myId == currentUserData._id)

                // console.log("Filtering I exist",  filteringIexist)

                console.log("all post length",response.data.data)
                const fullData = response.data.data
                const AllPostLength = response.data.data.length

                const temp = []
                for (i = 0; i <= AllPostLength; i++) {
                    const filterinng = fullData[i]?.Post_Like?.filter(post => post.myId == currentUserData._id)

                    if (filterinng?.length > 0) {

                        temp.push(filterinng[0])

                    } else {
                        console.log("not found ")
                    }
                }


                setPostReaction(temp)

            })
            .catch((error) => {
                console.log(error);
            });

    }



    // const LikeFuntion = (item) => {



    //     const indexOf = postReaction.findIndex((id) => id.postId == item._id)


    //     if (indexOf == -1) {
    //         Like(item, 0)

    //         console.log("like function is not exist in it")
    //     } else {
    //         // if()
    //         const whatisreactionNum = postReaction[indexOf]?.PostReaction

    //         if ([10].includes(whatisreactionNum)) {
    //             console.log("10 is cluded inn it")
    //             const updateState = [...postReaction]

    //             updateState[indexOf].PostReaction = 0

    //             setPostReaction(updateState)
    //             Like(item, 0)
    //         } else {
    //             const updateState = [...postReaction]

    //             updateState[indexOf].PostReaction = 10

    //             setPostReaction(updateState)
    //             Like(item, 10)
    //         }
    //     }

    // }


    // const Like = (item, index) => {

    //     const postIdIndex = postReaction.findIndex((postIdObj) => postIdObj.postId === item._id);

    //     if (postIdIndex === -1) {
    //         setPostReaction([...postReaction, { postId: item._id, PostReaction: index, myId: currentUserData._id }]);
    //     } else {

    //         if ([0, 1, 2, 3, 4, 5].includes(index)) {
    //             const updatedState = [...postReaction];
    //             updatedState[postIdIndex].PostReaction = index;
    //             setPostReaction(updatedState);
    //         } else {
    //             const updatedState = postReaction.filter((_, idx) => idx !== postIdIndex);
    //             setPostReaction(updatedState);

    //         }
    //         // }
    //     }



    //     let data = JSON.stringify({
    //         "postId": item._id,
    //         "PostReaction": index
    //     });

    //     let config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: `${Base_Api_Url}Like_On_Post`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         data: data
    //     };

    //     axios.request(config)
    //         .then((response) => {

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });



    // }

    // const Share = () => {


    //     showAlert(false)
    //     let data = JSON.stringify({
    //         "Post_id": shareItem._id
    //     });

    //     let config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: `${Base_Api_Url}Share_the_Post`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         data: data
    //     };

    //     axios.request(config)
    //         .then((response) => {
    //             console.log(JSON.stringify(response.data));
    //             getAllPost()

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    // }


    const renderItem = ({ item }) => {

        return (
            <Post item={item} postReaction={postReaction} reactionshowing={reactionshowing} navigation={navigation} setPostReaction={(txt) => setPostReaction(txt)} />

        )

        // console.log("posttttd data", item)

        // const getTime = new Date(item.createdAt).getTime()

        // const timeAgo = moment(getTime).fromNow(true);


        // const userId = item



        // const filter = postReaction.filter((items) => items.postId == item._id)

        // const filteringFromDataBase = item?.Post_Like.filter((items) => items.myId == currentUserData._id && items.postId === item._id)




        // return (
        //     <View style={{ marginTop: 20 }}>
        //         <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', }}>
        //         </View>
        //         <View style={{ padding: 15, gap: 10, }}>
        //             {item.comunityStatus === false ? (
        //                 <View style={{ flexDirection: 'row', gap: 15 }}>

        //                     <View onPress={() => item.userId == currentUserData._id ? navigation.navigate("Profile") : navigation.navigate("FriendsProfile", { data: item })} style={{ flexDirection: 'row' }} >
        //                         <Image source={{ uri: Profile_Image_Base_Url + item?.Profile_Picture }} style={{ height: 40, width: 40, borderRadius: 200 }}></Image>


        //                         <View style={{ marginLeft: 10 }}>
        //                             <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>

        //                                 <Text style={{ color: Colors.white, fontSize: 16 }}>{item.name}</Text>

        //                                 <Text style={{ color: Colors.white }}>{item.addedPhoto}</Text>
        //                             </View>
        //                             <View>

        //                                 <Text style={{ color: Colors.white }}>{timeAgo} ago</Text>

        //                             </View>
        //                         </View>
        //                     </View>

        //                 </View>
        //             ) : (
        //                 <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between', alignItems: 'center', }}>
        //                     <View style={{ flexDirection: 'row', gap: 10 }}>

        //                         <TouchableOpacity onPress={() => navigation.navigate("FriendsProfile", { data: item })} style={{ flexDirection: 'row', }} >
        //                             <Image source={{ uri: Profile_Image_Base_Url + item?.Profile_Picture }} style={{ height: 40, width: 40, borderRadius: 200 }}></Image>

        //                             <View style={{ marginLeft: 10 }}>

        //                                 <Text style={{ color: Colors.white, fontSize: 16 }}>{item.name}</Text>

        //                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        //                                     <View style={{ flexDirection: 'row', gap: 10 }}>

        //                                         <Text style={{ color: Colors.white }}>{timeAgo} ago</Text>
        //                                     </View>

        //                                 </View>

        //                             </View>
        //                         </TouchableOpacity>

        //                     </View>
        //                     <View>
        //                         <TouchableOpacity style={{ backgroundColor: Colors.red, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
        //                             <Text style={{ color: Colors.white }}>Join Now</Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //             )
        //             }



        //             <View style={{ borderColor: Colors.red, borderWidth: 1, borderRadius: 10 }}>
        //                 <Text style={{ color: Colors.white, padding: 10 }}>{item?.Post_Text}</Text>
        //                 {item.Post_Image && (
        //                     <TouchableOpacity onPress={() => { setIsVisible(true), setPostImage([{ uri: Post_Profile_Base_Url + item.Post_Image }]) }}>
        //                         <Image source={{ uri: Post_Profile_Base_Url + item.Post_Image }} style={{ width: '100%', borderRadius: 10, height: 200, resizeMode: 'cover' }}></Image>
        //                     </TouchableOpacity>

        //                 )}
        //             </View>


        //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>



        //                 <View style={{ flexDirection: 'row' }}>

        //                     <Text style={{ color: Colors.white, marginRight: 5 }}>{item?.All_Comments_On_Post?.length}</Text>
        //                     <Text style={{ color: Colors.white, marginRight: 20 }}>Comment</Text>

        //                     <Text style={{ color: Colors.white, marginRight: 5 }}>{item?.Post_Share?.length}</Text>
        //                     <Text style={{ color: Colors.white, }}>Share</Text>
        //                 </View>

        //             </View>


        //             {

        //             }
        //             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>

        //                 {
        //                     reactionshowing == true ?
        //                         <>
        //                             {
        //                                 item._id == activePostId ?

        //                                     <View
        //                                         style={{ height: 50, width: '70%', backgroundColor: Colors.white, borderRadius: 200, position: 'absolute', top: -60, left: -10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        //                                         <FlatList
        //                                             data={reactions}
        //                                             horizontal
        //                                             renderItem={({ item }) => {
        //                                                 return (
        //                                                     <TouchableOpacity onPress={() => { ShowReaction(false), Like(userId, item.id) }} style={{ height: 50, alignItems: 'center', justifyContent: 'center' }} >
        //                                                         {
        //                                                             item.title == 'like' ?
        //                                                                 <Animatable.View animation={'swing'} iterationCount="infinite" iterationDelay={500}>

        //                                                                     <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
        //                                                                 </Animatable.View>
        //                                                                 :
        //                                                                 item.title == 'heart' ?
        //                                                                     <Animatable.View animation={'pulse'} iterationCount="infinite" iterationDelay={500}>


        //                                                                         <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
        //                                                                     </Animatable.View>
        //                                                                     :
        //                                                                     item.title == 'laugh' ?
        //                                                                         <Animatable.View animation={'swing'} iterationCount="infinite" iterationDelay={500}>

        //                                                                             <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
        //                                                                         </Animatable.View>
        //                                                                         :
        //                                                                         item.title == 'wow' ?
        //                                                                             <Animatable.View animation={'rubberBand'} iterationCount="infinite" iterationDelay={500}>

        //                                                                                 <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
        //                                                                             </Animatable.View>
        //                                                                             :
        //                                                                             item.title == 'sad' ?
        //                                                                                 <Animatable.View animation={'swing'} iterationCount="infinite" iterationDelay={500}>

        //                                                                                     <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
        //                                                                                 </Animatable.View>
        //                                                                                 :
        //                                                                                 item.title == 'angry' ?
        //                                                                                     <Animatable.View animation={'tada'} iterationCount="infinite" iterationDelay={500}>

        //                                                                                         <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
        //                                                                                     </Animatable.View>
        //                                                                                     :
        //                                                                                     null

        //                                                         }
        //                                                     </TouchableOpacity>
        //                                                 )
        //                                             }}
        //                                         />
        //                                     </View>
        //                                     :
        //                                     null
        //                             }
        //                         </>
        //                         :
        //                         null
        //                 }

        //                 <TouchableOpacity onLongPress={() => { setActivePostId(item._id); ShowReaction(true) }} onPress={() => { LikeFuntion(item), ShowReaction(false) }} >
        //                     {

        //                         filter[0]?.postId == item._id && filter[0]?.myId == currentUserData?._id ?

        //                             <>
        //                                 {
        //                                     filter[0].PostReaction == 10 ?
        //                                         <LikeIcon name={"like2"} size={20} color={Colors.white} />
        //                                         :

        //                                         <Image source={reactions[filter[0].PostReaction]?.source} style={{ height: 20, width: 20 }} resizeMode='contain' />
        //                                 }

        //                             </>

        //                             :

        //                             <LikeIcon name={"like2"} size={20} color={Colors.white} />

        //                     }

        //                 </TouchableOpacity>


        //                 <TouchableOpacity onPress={() => { navigation.navigate("CommentScreen", { Post_data: item }) }} >
        //                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><EvilIcons size={20} name='comment' color={Colors.white} />
        //                         <Text style={styles.textColor}>{item?.All_Comments_On_Post?.length}</Text>
        //                     </View>
        //                 </TouchableOpacity>

        //                 <TouchableOpacity onPress={() => { setShareItem(item), showAlert(true) }}>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><ShareIcon size={20} name='share-outline' color={Colors.white} />
        //                         <Text style={styles.textColor}>{item?.Post_Share?.length}</Text>
        //                     </View>
        //                 </TouchableOpacity>
        //             </View>
        //             {/* share modal */}
        //             <Modal backdropOpacity={0.2} isVisible={alert} animationIn={'bounceIn'} animationOut={'bounceOut'}>
        //                 <View style={{ backgroundColor: Colors.black, borderRadius: 10, padding: 20 }}>
        //                     <Text style={{ color: Colors.white, alignSelf: 'center', fontSize: 20 }}>Share</Text>

        //                     <Text style={{ color: Colors.white, alignSelf: 'center', fontSize: 16, marginTop: 20 }}>Do you want to share it now?</Text>

        //                     <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
        //                         <TouchableOpacity style={{ padding: 10, width: '45%', backgroundColor: Colors.red, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => showAlert(false)}>
        //                             <Text style={{ color: Colors.white }}>Close</Text>
        //                         </TouchableOpacity>

        //                         <TouchableOpacity style={{ padding: 10, width: '45%', backgroundColor: Colors.white, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => Share()}>
        //                             <Text style={{ color: Colors.black }}>Share</Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //             </Modal>



        //         </View>
        //     </View>
        // )
    };

    const showToast = (type, msg) => {
        Toast.show({
            type: type,
            text1: msg
        })
    }

    const memoizeAllPostData = useMemo(() => allData, [allData])


    return (
        <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
                        <Back name='arrowleft' size={25} color={Colors.white} />
                    </TouchableOpacity>

                    <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 20, }}>Page</Text>
                </View>


                <View>
                    <Image source={{ uri: `${Page_Porfile_Base_Url}${pageImageandName.PageImage ?pageImageandName.PageImage : pageImageandName.Page_Profile_Picture}` }} style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 200 }} />

                    <Text style={{ color: Colors.white, alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{pageImageandName.PageName ? pageImageandName.PageName : pageImageandName.Page_name}</Text>
                </View>




                {
                    currentUserData.PageIFollow.includes(pageId) ?

                        <TouchableOpacity onPress={() => LikePage(pageData._id)} style={{ backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, flexDirection: 'row', paddingVertical: 10, width: '90%', alignSelf: 'center', marginTop: 20 }}>
                            <AntDesign
                                name={'like2'}
                                color={'black'}
                                size={20}
                            />
                            <Text style={{ color: Colors.black, marginLeft: 10 }}>Liked</Text>
                        </TouchableOpacity>
                        :

                        <TouchableOpacity onPress={() => LikePage(pageData._id)} style={{ backgroundColor: Colors.red, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, flexDirection: 'row', paddingVertical: 10, width: '90%', alignSelf: 'center', marginTop: 20 }}>
                            <AntDesign
                                name={'like2'}
                                color={'white'}
                                size={20}
                            />
                            <Text style={{ color: Colors.white, marginLeft: 10 }}>Like</Text>
                        </TouchableOpacity>
                }

                
                {
                   currentUserData.PageIFollow.includes(pageId) ?

                <View style={{ height: 140, marginTop: 20, width: '90%', alignSelf: 'center' }}>
                    <View style={{ height: 140, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute', alignSelf: 'center' }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, paddingHorizontal: 10 }}>
                        {
                            currentUserData ?
                                <Image source={{ uri: `${Profile_Image_Base_Url}${currentUserData.Profile_Picture}` }} style={{ height: 50, width: 50, borderRadius: 200 }} />
                                :

                                <Ionicons
                                    name={'person'}
                                    color={'white'}
                                    size={30}
                                    style={{ height: 40, width: 40, borderRadius: 200 }} />
                        }

                        <View style={{ marginLeft: 10, width: '70%' }}>
                            <Text style={{ color: 'white' }}>{currentUserData.name}</Text>
                            <TextInput
                                placeholder='What is in your mind?'
                                onChangeText={(txt) => {
                                    setStatusText(txt)
                                }}
                                value={StatusText}
                                placeholderTextColor={Colors.white}
                                style={{ height: 35, color: Colors.white, }}
                            />
                        </View>

                        <TouchableOpacity onPress={() => openLibrary()}>
                            <FontAwesome
                                name={'photo'}
                                color={Colors.white}
                                size={25}
                            />
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity onPress={() => CreatePost()} style={{ padding: 10, width: '90%', alignSelf: 'center', backgroundColor: Colors.red, borderRadius: 5 }}>
                        <Text style={{ color: Colors.white, fontWeight: 'bold' }}>Create Post</Text>
                    </TouchableOpacity>
                </View>
                :
                <Text style={{color:Colors.white, alignSelf:'center', marginTop:20}}>To start posting on this page, you have to like it.</Text>
                }
                {
                    pickedImage &&
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>

                        <Image source={{ uri: pickedImage.path }} style={{ height: 80, width: 60, borderRadius: 5, }} />
                    </View>
                }



                <View style={{ flex: 1, marginTop: 20 }}>
                    <FlatList


                        data={memoizeAllPostData?.sort((a, b) => {
                            const timeA = new Date(a.createdAt).getTime();
                            const timeB = new Date(b.createdAt).getTime();
                            return timeB - timeA;
                        })}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 30, }}
                    />
                </View>

                

            </ScrollView>

        </ImageBackground>
    )
}

export default PageDetail

const styles = StyleSheet.create({
    textColor: {
        color: Colors.white,

    },

})
