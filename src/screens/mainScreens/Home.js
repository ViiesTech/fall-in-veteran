import { View, Text, ImageBackground, Image, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, Animated } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Appassets from '../../assets/images/Appassets'

import LikeIcon from 'react-native-vector-icons/AntDesign'
import CommentIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotsIcon from 'react-native-vector-icons/Entypo'
import Header from '../../components/Header'
import SaveIcon from 'react-native-vector-icons/FontAwesome'
import HideIcon from 'react-native-vector-icons/Feather'
import ReportIcon from 'react-native-vector-icons/AntDesign'
import Colors from '../../assets/utils/colors'
import ModalContent from '../../components/modal/Modal'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Base_Api_Url from '../../utls/Base_Api_Url'
import Profile_Image_Base_Url from '../../utls/Profile_Image_Base_Url'
import moment, { normalizeUnits, updateLocale } from 'moment'
import Post_Profile_Base_Url from '../../utls/Post_Profile_Base_Url'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Modal from 'react-native-modal'
import socketServices from '../../socket/Socket_Service'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';

import ImageView from "react-native-image-viewing";
import Feather from "react-native-vector-icons/Feather"
import { setData } from '../../redux/AuthSlice'




const Home = ({ navigation, }) => {
  const [dialogState, setDialogState] = useState({});
  const currentUserData = useSelector(state => state.Data.data)
  const isLoading = useSelector(state => state.Data.isLoading)
  const token = useSelector(state => state.Data.token)
  const dispatch = useDispatch()

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


  const [reactionSelected, setReactionSelected] = useState(null);

  const [allPost, setAllPost] = useState([])

  const [postImage, setPostImage] = useState([])
  const [shareItem, setShareItem] = useState()
  const [alert, showAlert] = useState(false)

  const [onlineUsers, setOnnlineUsers] = useState()
  const [reactionshowing, ShowReaction] = useState(false)


  const [visible, setIsVisible] = useState(false);


  // State to store the ID of the post being reacted to
  const [activePostId, setActivePostId] = useState(null);

  const [postReaction, setPostReaction] = useState([])

  const [DislikeOrLike, setDislikeOrLike] = useState(false)

  const [searchModalVisible, setSearchModalVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getCurrentUserData()
      getAllPost()
    });
    return unsubscribe;
  }, [navigation]);




  useEffect(() => {
    socketServices.on('onlineUsers', (res) => {
      // console.log("ssssss", res)
      setOnnlineUsers(res)
    })
  }, [])

  const getAllPost = (commetPostID) => {
    let data = JSON.stringify({
      "page": "1"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}GetAllPost`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setAllPost(response.data.All_Post)


        // const filteringIexist = response.data.All_Post.Post_Like.filter(post => post.myId == currentUserData._id)

        // console.log("Filtering I exist",  filteringIexist)

        const fullData = response.data.All_Post
        const AllPostLength =  response.data.All_Post.length
        const temp =[]
        for(i = 0; i <=  AllPostLength; i++) {
            const filterinng = fullData[i]?.Post_Like?.filter(post => post.myId == currentUserData._id)

              if(filterinng?.length > 0){

                temp.push(filterinng[0])

              }else{
                console.log("not found ")
              }
        }

        console.log("temp", temp)
        setPostReaction(temp)

      })
      .catch((error) => {
        console.log(error);
      });

  }

  const LikeFuntion = (item) => {



    const indexOf = postReaction.findIndex((id) => id.postId == item._id)


    if (indexOf == -1) {
      Like(item, 0)

      console.log("like function is not exist in it")
    } else {
      // if()
      const whatisreactionNum = postReaction[indexOf]?.PostReaction

      if ([10].includes(whatisreactionNum)) {
        console.log("10 is cluded inn it")
        const updateState = [...postReaction]

        updateState[indexOf].PostReaction = 0

        setPostReaction(updateState)
        Like(item, 0)
      } else {
        const updateState = [...postReaction]

        updateState[indexOf].PostReaction = 10

        setPostReaction(updateState)
        Like(item, 10)
      }
    }

  }


  const Like = (item, index) => {

    const postIdIndex = postReaction.findIndex((postIdObj) => postIdObj.postId === item._id);

    if (postIdIndex === -1) {
      setPostReaction([...postReaction, { postId: item._id, PostReaction: index, myId: currentUserData._id }]);
    } else {

      if ([0, 1, 2, 3, 4, 5].includes(index)) {
        const updatedState = [...postReaction];
        updatedState[postIdIndex].PostReaction = index;
        setPostReaction(updatedState);
      } else {
        const updatedState = postReaction.filter((_, idx) => idx !== postIdIndex);
        setPostReaction(updatedState);

      }
      // }
    }



    let data = JSON.stringify({
      "postId": item._id,
      "PostReaction": index
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}Like_On_Post`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        getAllPost()
      })
      .catch((error) => {
        console.log(error);
      });



  }

  const Share = () => {


    showAlert(false)
    let data = JSON.stringify({
      "Post_id": shareItem._id
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}Share_the_Post`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        getAllPost()

      })
      .catch((error) => {
        console.log(error);
      });

  }

  const getCurrentUserData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}getUserData`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    axios.request(config)
      .then((response) => {
        if (response.data.success == false) {

        } else {

          dispatch(setData(response.data.data))
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }


  // console.log("reactionn selected", reactionSelected)


  const memoizeAllPostData = useMemo(() => allPost, [allPost])


  const renderItem = ({ item }) => {

    // console.log("posttttd data",item.Post_Like)

    const getTime = new Date(item.createdAt).getTime()

    const timeAgo = moment(getTime).fromNow(true);

    const AmIOnline = onlineUsers?.includes(item.userId)

    const userId = item



    const filter = postReaction.filter((items) => items.postId == item._id)

    const filteringFromDataBase = item?.Post_Like.filter((items)=> items.myId == currentUserData._id && items.postId === item._id)


    // console.log("filteringFromDataBase data exist?", filteringFromDataBase)
    // console.log("filtering data exist?", filter)


    return (
      <View style={{ gap: 10, marginVertical: 10, }}>
        <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', }}>
        </View>
        <View style={{ padding: 15, gap: 10, }}>
          {item.comunityStatus === false ? (
            <View style={{ flexDirection: 'row', gap: 15 }}>

              <TouchableOpacity onPress={() => item.userId == currentUserData._id ? navigation.navigate("Profile") : navigation.navigate("FriendsProfile", { data: item })} style={{ flexDirection: 'row' }} >
                <Image source={{ uri: Profile_Image_Base_Url + item?.Profile_Picture }} style={{ height: 40, width: 40, borderRadius: 200 }}></Image>


                <View style={{ marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>

                    <Text style={{ color: Colors.white, fontSize: 16 }}>{item.name}</Text>

                    <Text style={{ color: Colors.white }}>{item.addedPhoto}</Text>
                  </View>
                  <View>

                    <Text style={{ color: Colors.white }}>{timeAgo} ago</Text>

                  </View>
                </View>
              </TouchableOpacity>

            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between', alignItems: 'center', }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>

                <TouchableOpacity onPress={() => navigation.navigate("FriendsProfile", { data: item })} style={{ flexDirection: 'row', }} >
                  <Image source={{ uri: Profile_Image_Base_Url + item?.Profile_Picture }} style={{ height: 40, width: 40, borderRadius: 200 }}></Image>

                  <View style={{ marginLeft: 10 }}>

                    <Text style={{ color: Colors.white, fontSize: 16 }}>{item.name}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <View style={{ flexDirection: 'row', gap: 10 }}>

                        <Text style={{ color: Colors.white }}>{timeAgo} ago</Text>
                      </View>

                    </View>

                  </View>
                </TouchableOpacity>

              </View>
              <View>
                <TouchableOpacity style={{ backgroundColor: Colors.red, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                  <Text style={{ color: Colors.white }}>Join Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
          }



          <View style={{ borderColor: Colors.red, borderWidth: 1, borderRadius: 10 }}>
            <Text style={{ color: Colors.white, padding: 10 }}>{item?.Post_Text}</Text>
            {item.Post_Image && (
              <TouchableOpacity onPress={() => { setIsVisible(true), setPostImage([{ uri: Post_Profile_Base_Url + item.Post_Image }]) }}>
                <Image source={{ uri: Post_Profile_Base_Url + item.Post_Image }} style={{ width: '100%', borderRadius: 10, height: 200, resizeMode: 'cover' }}></Image>
              </TouchableOpacity>

            )}
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


            <Text style={styles.textColor}>{item?.Post_Like?.length}</Text>
            <View style={{ flexDirection: 'row' }}>

              <Text style={{ color: Colors.white, marginRight: 5 }}>{item?.All_Comments_On_Post?.length}</Text>
              <Text style={{ color: Colors.white, marginRight: 20 }}>Comment</Text>

              <Text style={{ color: Colors.white, marginRight: 5 }}>{item?.Post_Share?.length}</Text>
              <Text style={{ color: Colors.white, }}>Share</Text>
            </View>

          </View>


          {

          }
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>

            {
              reactionshowing == true ?
                <>
                  {
                    item._id == activePostId ?

                      <View
                        style={{ height: 50, width: '70%', backgroundColor: Colors.white, borderRadius: 200, position: 'absolute', top: -60, left: -10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <FlatList
                          data={reactions}
                          horizontal
                          renderItem={({ item }) => {
                            return (
                              <TouchableOpacity onPress={() => { setReactionSelected(item.id), ShowReaction(false), Like(userId, item.id) }} style={{ height: 50, alignItems: 'center', justifyContent: 'center' }} >
                                {
                                  item.title == 'like' ?
                                    <Animatable.View animation={'swing'} iterationCount="infinite" iterationDelay={500}>

                                      <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
                                    </Animatable.View>
                                    :
                                    item.title == 'heart' ?
                                      <Animatable.View animation={'pulse'} iterationCount="infinite" iterationDelay={500}>


                                        <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
                                      </Animatable.View>
                                      :
                                      item.title == 'laugh' ?
                                        <Animatable.View animation={'swing'} iterationCount="infinite" iterationDelay={500}>

                                          <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
                                        </Animatable.View>
                                        :
                                        item.title == 'wow' ?
                                          <Animatable.View animation={'rubberBand'} iterationCount="infinite" iterationDelay={500}>

                                            <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
                                          </Animatable.View>
                                          :
                                          item.title == 'sad' ?
                                            <Animatable.View animation={'swing'} iterationCount="infinite" iterationDelay={500}>

                                              <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
                                            </Animatable.View>
                                            :
                                            item.title == 'angry' ?
                                              <Animatable.View animation={'tada'} iterationCount="infinite" iterationDelay={500}>

                                                <Image source={item.source} resizeMode='contain' style={{ height: 30, width: 30, marginLeft: 10 }} />
                                              </Animatable.View>
                                              :
                                              null

                                }
                              </TouchableOpacity>
                            )
                          }}
                        />
                      </View>
                      :
                      null
                  }
                </>
                :
                null
            }


            <TouchableOpacity onLongPress={() => { setActivePostId(item._id); ShowReaction(true) }} onPress={() => { LikeFuntion(item), ShowReaction(false) }} >
              {

                filter[0]?.postId == item._id && filter[0]?.myId == currentUserData?._id ?

                  <>
                    {
                      filter[0].PostReaction == 10 ?
                        <LikeIcon name={"like2"} size={20} color={Colors.white} />
                        :

                        <Image source={reactions[filter[0].PostReaction]?.source} style={{ height: 20, width: 20 }} resizeMode='contain' />
                    }

                  </>

                  :

                  <LikeIcon name={"like2"} size={20} color={Colors.white} />

              }

            </TouchableOpacity>



            {/* <TouchableOpacity onPress={() => Like(item)} >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <LikeIcon name={item.Post_Like.includes(currentUserData._id) ? "like1" : "like2"} size={20} color={Colors.white} />
                <Text style={styles.textColor}>{item?.Post_Like?.length}</Text>
              </View>
            </TouchableOpacity> */}



            <TouchableOpacity onPress={() => { navigation.navigate("CommentScreen", { Post_data: item }) }} >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><EvilIcons size={20} name='comment' color={Colors.white} />
                <Text style={styles.textColor}>{item?.All_Comments_On_Post?.length}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setShareItem(item), showAlert(true) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><ShareIcon size={20} name='share-outline' color={Colors.white} />
                <Text style={styles.textColor}>{item?.Post_Share?.length}</Text>
              </View>
            </TouchableOpacity>
          </View>


          {/* {dialogState[item.id] && (
            <View style={{ backgroundColor: Colors.white, position: 'absolute', bottom: -40, right: 30, borderRadius: 5, zIndex: 999, padding: 10, height: 80, justifyContent: 'center' }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <SaveIcon name='bookmark-o' />
                <Text style={[Colors.black, { marginLeft: 3 }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <HideIcon name='eye-off' /><Text style={[Colors.black, { marginLeft: 3 }]}>Hide</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <ReportIcon name='exclamationcircleo' />
                <Text style={[Colors.black, { marginLeft: 3 }]}>Report</Text>
              </TouchableOpacity>
            </View>
          )} */}



          {/* share modal */}
          <Modal backdropOpacity={0.2} isVisible={alert} animationIn={'bounceIn'} animationOut={'bounceOut'}>
            <View style={{ backgroundColor: Colors.black, borderRadius: 10, padding: 20 }}>
              <Text style={{ color: Colors.white, alignSelf: 'center', fontSize: 20 }}>Share</Text>

              <Text style={{ color: Colors.white, alignSelf: 'center', fontSize: 16, marginTop: 20 }}>Do you want to share it now?</Text>

              <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ padding: 10, width: '45%', backgroundColor: Colors.red, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => showAlert(false)}>
                  <Text style={{ color: Colors.white }}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ padding: 10, width: '45%', backgroundColor: Colors.white, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => Share()}>
                  <Text style={{ color: Colors.black }}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>



        </View>
      </View>


    )
  };


  return (
    <ImageBackground source={Appassets.splash} style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => ShowReaction(false)} style={{ flex: 1 }} activeOpacity={1} touchSoundDisabled={true}>
        <Header title={"FALL IN VETERAN"} onSearchButtonPress={() => setSearchModalVisible(true)} arrow={false} navigation={navigation} />

        <ImageView
          images={postImage}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />

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
      </TouchableOpacity>

      <Modal style={{ margin: 0 }} isVisible={searchModalVisible} animationIn={'bounceInRight'} animationOut={'slideOutRight'}>
        <View style={{ flex: 1, backgroundColor: Colors.black, padding: 20, paddingTop: 10 }}>
          <TouchableOpacity onPress={() => setSearchModalVisible(false)} style={{ padding: 10, backgroundColor: Colors.black, borderRadius: 200, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.white }}>X</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <TextInput
              style={{ borderWidth: 1, height: 50, borderColor: Colors.white, borderRadius: 10, color: Colors.white, paddingHorizontal: 10, width: '85%' }}
              placeholder={"Search"}
              placeholderTextColor={Colors.white}
            />

            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => console.log("search")}>
              <Feather name='search' size={25} color={Colors.white} />
            </TouchableOpacity>

          </View>


          {/* <FlatList
          data={}
          renderItem={()=>{
            return()
          }}
          
          /> */}

        </View>
      </Modal>
    </ImageBackground>
  )
}





export default Home

const styles = StyleSheet.create({
  textColor: {
    color: Colors.white,

  },

})