import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Base_Api_Url from '../../../utls/Base_Api_Url'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Profile_Image_Base_Url from '../../../utls/Profile_Image_Base_Url'
import socketServices from '../../../socket/Socket_Service'
const ChatList = ({ navigation }) => {

  const id = useSelector(state => state?.Data?.data?._id)
  const userData = useSelector(state => state?.Data?.data)
  const token = useSelector(state => state?.Data?.token)

  // console.log("id", id, "userData", userData)

  const [allFriends, setAllFriends] = useState()
  const [isLoader, setLoader] = useState(false)
  const [onlineUsers, setOnnlineUsers] = useState()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    getFriends()

  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;

  }, [navigation])

  useEffect(() => {
    socketServices.on('onlineUsers', (res) => {
      console.log("ssssss", res)
      setOnnlineUsers(res)
    })
  }, [])


  const getFriends = async () => {

    setLoader(true)

    let data = JSON.stringify({
      "id": id
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}getAllChatUsers`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setLoader(false)

        console.log(JSON.stringify("chat list response",response.data));
        setAllFriends(response.data.data)
      })
      .catch((error) => {
        setLoader(false)

        console.log(error);
      });


  }



  // console.log("first",allFriends)



  return (

    <ImageBackground source={Appassets.slide1} style={{ padding: 20, flex: 1 }}>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => navigation.goBack()}>

          <Ionicons
            name={'chevron-back'}
            color={Colors.white}
            size={20}
          />
          <Text style={{ fontSize: 14, marginLeft: 4, color: Colors.white }}>Back</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}> Chat</Text>

        <View style={{ width: 100 }} />
      </View>


      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 50 }}>Friends</Text>

      {
        isLoader === true ?

          <ActivityIndicator size={'large'} color={'black'} />
          :
          null
      }

      {
        allFriends?.length > 0 ?
          <FlatList
            data={allFriends}
            renderItem={({ item }) => {
              console.log("itemmmmm", item)
              const AmIOnline = onlineUsers?.includes(item.userId)

              return (
                <TouchableOpacity onPress={() => navigation.navigate("Conversation", { FriendData: item.sender_id == id ? item.reciver_data : item.receiver_id == id ? item?.sender_data : null, isOnline: AmIOnline })} style={{ height: 70, backgroundColor: Colors.red, marginTop: 20, borderRadius: 10, padding: 10, flexDirection: 'row' }}>
                  {
                    AmIOnline == true ?

                      <View
                        style={{ borderRadius: 200, position: 'absolute', zIndex: 200, right: 10, alignItems: 'center', justifyContent: 'center', height: 70 }}
                      >
                        <Text style={{ fontWeight: 'bold', color: Colors.white }}>Online</Text>
                      </View>
                      :
                      <View
                        style={{ borderRadius: 200, position: 'absolute', zIndex: 200, right: 10, alignItems: 'center', justifyContent: 'center', height: 70 }}
                      >

                        <Text style={{ fontWeight: 'bold', color: Colors.white }}>Offline</Text>
                      </View>
                  }
                  <Image source={{ uri: item.receiver_id == userData._id ? `${Profile_Image_Base_Url}${item?.sender_data?.Profile_Picture}` : `${Profile_Image_Base_Url}${item?.reciver_data?.Profile_Picture}` }} style={{ height: 40, width: 40, borderRadius: 200, backgroundColor: Colors.white }} />
                  <View>
                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 10 }}>{item.sender_id == id ? item?.reciver_data?.name : item.receiver_id == id ? item?.sender_data?.name : null}</Text>
                    <Text style={{ color: 'white', fontSize: 12, marginLeft: 10, }}>{item.text}</Text>

                  </View>

                </TouchableOpacity>
              )
            }}
          />
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: Colors.white, fontSize: 20 }}>No Chat</Text>
          </View>
      }


    </ImageBackground>
  )
}

export default ChatList