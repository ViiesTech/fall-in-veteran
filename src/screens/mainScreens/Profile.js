import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Appassets from '../../assets/images/Appassets'
import Colors from '../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'


import LikeIcon from 'react-native-vector-icons/AntDesign'
import CommentIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotsIcon from 'react-native-vector-icons/Entypo'
import Header from '../../components/Header'
import SaveIcon from 'react-native-vector-icons/FontAwesome'
import HideIcon from 'react-native-vector-icons/Feather'
import ReportIcon from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import Profile_Image_Base_Url from '../../utls/Profile_Image_Base_Url'
import Base_Api_Url from '../../utls/Base_Api_Url'
import axios from 'axios'
import moment from 'moment'
import Modal from 'react-native-modal'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';
import ImageView from "react-native-image-viewing";
import Post from '../../components/PostCard/Post'

const Profile = ({ navigation }) => {

  const currentUserData = useSelector(state => state.Data.data)
  const isLoading = useSelector(state => state.Data.isLoading)
  const token = useSelector(state => state.Data.token)

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
      getAllPost()
    });
    return unsubscribe;
  }, [navigation]);

  const getAllPost = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}getOnlyMyPost`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    axios.request(config)
      .then((response) => {

        setOnlyMyPost(response.data.data)

        const fullData = response?.data?.data
        const AllPostLength = response?.data?.data?.length

        console.log("all Post length: " + AllPostLength)
        const temp = []
        for (i = 0; i < AllPostLength; i++) {

          const filterinng = fullData[i]?.Post_Like?.filter(post => post.myId == currentUserData._id)


          if (filterinng?.length > 0) {

            temp.push(filterinng[0])

          } else {
            console.log("not found ")
          }
        }

        // console.log("temp......................", temp)
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


  const renderItem = ({ item }) => {

    // console.log("posttttd data",item.Post_Like)



    return (
      <Post item={item} postReaction={postReaction} reactionshowing={reactionshowing} navigation={navigation} setPostReaction={(txt) => setPostReaction(txt)} />

  )

    const getTime = new Date(item.createdAt).getTime()

    const timeAgo = moment(getTime).fromNow(true);


    const userId = item



    const filter = postReaction.filter((items) => items.postId == item._id)

    const filteringFromDataBase = item?.Post_Like.filter((items) => items.myId == currentUserData._id && items.postId === item._id)




    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', }}>
        </View>
        <View style={{ padding: 15, gap: 10, }}>
          {item.comunityStatus === false ? (
            <View style={{ flexDirection: 'row', gap: 15 }}>

              <View onPress={() => item.userId == currentUserData._id ? navigation.navigate("Profile") : navigation.navigate("FriendsProfile", { data: item })} style={{ flexDirection: 'row' }} >
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
              </View>

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
                              <TouchableOpacity onPress={() => { ShowReaction(false), Like(userId, item.id) }} style={{ height: 50, alignItems: 'center', justifyContent: 'center' }} >
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

  const memoizeAllPostData = useMemo(() => OnlyMyPosts, [OnlyMyPosts])
  return (
    <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
        <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Profile</Text>

        <View style={{ height: 150, width: '90%', alignSelf: 'center', marginTop: 10, }}>
          <View style={{ height: 170, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />

          <Image source={require('../../assets/images/cover.png')} style={{ alignSelf: 'center', borderTopRightRadius: 10, borderTopLeftRadius: 10, width: '100%', height: 100, }} />

          {
            currentUserData ?

              <Image source={{ uri: `${Profile_Image_Base_Url}${currentUserData?.Profile_Picture}` }} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 10, position: 'absolute', top: 70 }} />
              :
              <Ionicons
                name={'person'}
                color={'white'}
                size={30}
                style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 10, position: 'absolute', top: 70 }} />
          }


          <View style={{ paddingHorizontal: 10, width: '75%', alignSelf: 'flex-end', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'ce' }}>

            <View>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{currentUserData?.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/images/medal.png')} style={{ height: 20, width: 20 }} />
                <Text style={{ color: '#79C14B', fontSize: 12, marginLeft: 1 }}>Verified Profile</Text>
              </View>
            </View>
            <Text style={{ color: 'white' }}>Edit Profile</Text>


          </View>


        </View>

        <View style={{flex:1, marginTop:20}}>
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



        <View>

        </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default Profile


const styles = StyleSheet.create({
  textColor: {
    color: Colors.white
  },

})