import { View, Text, ImageBackground, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Back from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Base_Api_Url from '../../../utls/Base_Api_Url'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Profile_Image_Base_Url from '../../../utls/Profile_Image_Base_Url'
import Toast from 'react-native-toast-message'
import { setData } from '../../../redux/AuthSlice'


const FindFriends = ({ navigation }) => {

  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)

  const [friendType, setFriendType] = useState("Find Friends")

  //Flatlist states
  const [MyFriends, setMyFriends] = useState([])
  const [FriendRequestIGet, setFriendRequestIGet] = useState([])
  const [FrendRequestISend, setFrendRequestISend] = useState([])
  const [AllUserOfApp, setAllUserOfApp] = useState([])

  //Will update in realtime
  const [friend_req_send, set_Friend_Req_Send] = useState([])
  const [friends_req_confirm, set_Friend_Req_Confirm] = useState([])



  const currentUserData = useSelector(state => state.Data.data)
  const token = useSelector(state => state.Data.token)


  const getFriends = () => {
    setLoader(true)

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}GetAppUsers`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    axios.request(config)
      .then((response) => {
        const friendTemp = []
        const IsendTheReqTemp = []
        const ReqIGetTemp = []
        const FriendsToBeAdd = []

        response.data.data.forEach((item) => {
          
          


          if (item.Friends.includes(currentUserData._id)) {
            friendTemp.push(item)
          } else if (item.Req.includes(currentUserData._id)) {
            IsendTheReqTemp.push(item)
          } else if (item.ReqSend.includes(currentUserData._id)) {
            ReqIGetTemp.push(item)
          } else {
            FriendsToBeAdd.push(item)

          }

        })
        console.log("response", friendTemp)
        setMyFriends(friendTemp)
        setFriendRequestIGet(ReqIGetTemp)
        setFrendRequestISend(IsendTheReqTemp)
        setAllUserOfApp(FriendsToBeAdd)
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      
      getFriends()
    });
    return unsubscribe;

  }, [navigation])


  const sendFriendRequest = (item) => {

    const userId = item._id
    const updateState = [...friend_req_send]
    const findIndex = friend_req_send.indexOf(userId)

    if (findIndex !== -1) {
      updateState.splice(findIndex, 1)
      set_Friend_Req_Send(updateState)
    } else {
      updateState.push(userId)
      set_Friend_Req_Send(updateState)
    }

    if (findIndex !== -1) {

    } else {
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
            getFriends()
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
    }
  }

  const AcceptRequest = (item) => {
    const userId = item._id


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
          getFriends()
        }
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const CancelRequest = (item) => {
    const userId = item._id

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
            getFriends()
          }
          console.log(JSON.stringify(response.data));

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const unFriendUser = (item) => {

    const userId = item._id

 
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
            getFriends()

        }

      })
      .catch((error) => {
        console.log(error);
      });
      
}

  return (
    <ImageBackground source={Appassets.slide2} style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
          <Back name='arrowleft' size={25} color={Colors.white} />
        </TouchableOpacity>

        <Text style={{ color: Colors.white, fontSize: 20 }}>Friends</Text>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity onPress={() => setFriendType("Find Friends")} style={{ padding: 10, borderWidth: 1, borderColor: Colors.white, borderRadius: 10, backgroundColor: friendType == "Find Friends" ? Colors.red : null }}>
          <Text style={{ color: Colors.white }}>Find Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFriendType("Friend Request")} style={{ padding: 10, borderWidth: 1, borderColor: Colors.white, borderRadius: 10, backgroundColor: friendType == "Friend Request" ? Colors.red : null }}>
          <Text style={{ color: Colors.white }}>Friend Request</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFriendType("My Friends")} style={{ padding: 10, borderWidth: 1, borderColor: Colors.white, borderRadius: 10, backgroundColor: friendType == "My Friends" ? Colors.red : null }}>
          <Text style={{ color: Colors.white }}>My Friends</Text>
        </TouchableOpacity>



      </View>
      <FlatList
        data={friendType == "Find Friends" ? AllUserOfApp : friendType == "Friend Request" ? FriendRequestIGet : friendType == "My Friends" ? MyFriends : null}
        renderItem={({ item }) => {
          const filterFriendReqArray = friend_req_send.filter((id) => {
            return id == item._id
          })

          return (
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', }}>
              {
                friendType == "Find Friends" ?
                  <>
                    <Image source={{ uri: `${Profile_Image_Base_Url}${item.Profile_Picture}` }} style={{ height: 80, width: 80, borderRadius: 300 }} />
                    <View style={{ marginLeft: 20 }}>
                      <Text style={{ color: Colors.white, fontSize: 20, marginBottom: 10 }}>{item.name}</Text>
                      {
                        filterFriendReqArray.includes(item._id) ?
                          <TouchableOpacity onPress={() => sendFriendRequest(item)} style={{ backgroundColor: Colors.white, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={{ color: Colors.black }}>Request Sent</Text>
                          </TouchableOpacity>
                          :

                          <TouchableOpacity onPress={() => sendFriendRequest(item)} style={{ backgroundColor: Colors.red, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 'bold' }}>Add Friend</Text>
                          </TouchableOpacity>
                      }
                    </View>
                  </>
                  :
                  friendType == "Friend Request" ?
                    <>
                      <Image source={{ uri: `${Profile_Image_Base_Url}${item.Profile_Picture}` }} style={{ height: 80, width: 80, borderRadius: 300 }} />
                      <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: Colors.white, fontSize: 20, marginBottom: 10 }}>{item.name}</Text>

                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity onPress={() => AcceptRequest(item)} style={{ backgroundColor: Colors.red, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 'bold' }}>Confirm</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => CancelRequest(item)} style={{ backgroundColor: Colors.black, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginLeft: 10 }}>
                            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: 'bold' }}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                    :
                    friendType == "My Friends" ?
                      <>
                        <Image source={{ uri: `${Profile_Image_Base_Url}${item.Profile_Picture}` }} style={{ height: 80, width: 80, borderRadius: 300 }} />
                        <View style={{ marginLeft: 20, flexDirection:'row', justifyContent:'space-between', width:'70%' ,alignItems:'center'}}>
                          <View>

                          <Text style={{ color: Colors.white, fontSize: 20, marginBottom: 10 }}>{item.name}</Text>
                          <Text style={{ color: Colors.white, fontSize: 14, marginBottom: 10 }}>{item.email}</Text>
                          </View>
                          <TouchableOpacity onPress={()=> unFriendUser(item)} style={{backgroundColor:Colors.red,   borderRadius:5,padding:10}}>
                            <Text style={{color:Colors.white, fontWeight:'bold'}}>Unfriend</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                      :
                      null
              }
            </View>
          )
        }}

      />
    </ImageBackground>
  )
}

export default FindFriends