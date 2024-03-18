import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import Appassets from '../../../assets/images/Appassets'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../../assets/utils/colors'
import Post_Profile_Base_Url from '../../../utls/Post_Profile_Base_Url'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import Base_Api_Url from '../../../utls/Base_Api_Url'
import axios from 'axios'
const CommentScreen = ({ route, navigation }) => {

  const { Post_data } = route.params
  const token = useSelector(state => state.Data.token)
  const [commentText, setCommentText] = useState("")

  const [ThisPostComment, setPostComment] = useState(Post_data)

  const comment = () => {
    
    if (commentText == "") {
      console.log("Don't comment")
    } else {
    let data = JSON.stringify({
      "Post_id": Post_data._id,
      "comment": commentText
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}Comment_On_Post`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log("data",JSON.stringify(response.data));
      setCommentText("")
      setPostComment(response.data.Post_data)
    })
    .catch((error) => {
      console.log(error);
    });
  }


  }


  console.log("post_data", Post_data)
  return (
    <ImageBackground source={Appassets.splash} style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={'arrow-back'}
            color={'white'}
            size={25}
          />
        </TouchableOpacity>

        <Text style={{ color: Colors.white, fontSize: 20 }}>Comments</Text>

        <View style={{ width: 30 }} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>

        <View style={{}}>
        <View style={{ position: 'absolute', height:'100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', }}>
        </View>

        <Text style={{ color: Colors.white, padding: 10 }}>{Post_data?.Post_Text}</Text>
        {
          Post_data?.Post_Image ?

          <Image source={{ uri: `${Post_Profile_Base_Url}${Post_data?.Post_Image}` }} style={{ height: 300, width: '100%', resizeMode: 'contain', }} />
          :
          null
        }
        </View>

        { 
          ThisPostComment?.All_Comments_On_Post?.length > 0 ?
            <View style={{ flex: 1 }}>
              <FlatList
                data={ThisPostComment?.All_Comments_On_Post.sort((a, b) => {
                  const timeA = new Date(JSON.parse(a.Created_at)).getTime();
                  const timeB = new Date(JSON.parse(b.Created_at)).getTime();
                  return timeB - timeA;
                })}
                renderItem={({ item }) => {


                  const timestamp = JSON.parse(item.Created_at);
                  const date = new Date(timestamp);

                  const time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} `



                  return (
                    <View style={{ marginTop: 20, padding: 10, borderRadius: 10, flexDirection: 'row' }}>
                      
                      
                      <Image style={{ height: 30, width: 30, resizeMode: 'contain', borderRadius: 200 }} source={{ uri: `${Profile_Image_Base_Url}${item.Userpicture}` }} />
                      <View style={{ borderRadius: 10, backgroundColor: 'white', marginLeft: 10, paddingHorizontal: 10, paddingVertical: 5 }}>

                        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', }}>

                          <Text style={{ color: Colors.black, fontSize: 14, fontWeight: 'bold' }}>{item.Username}</Text>
                          <Text style={{ color: Colors.black, fontSize: 10 }}>{time}</Text>
                        </View>

                        <View style={{ width: '90%', marginTop: 5 }}>

                          <Text style={{ color: Colors.black }}>{item.Comment}</Text>
                        </View>
                      </View>
                    </View>
                  )
                }}
              />
            </View>

            :

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

              <Text style={{ color: Colors.white }}>No Comment found</Text>
            </View>
        }

      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal:10 }}>
        <TextInput
          placeholder='Type here ...'
          onChangeText={(txt) => {
            setCommentText(txt)
          }}
          value={commentText}
          style={{ width: '80%', borderWidth: 1, borderColor: Colors.white, color: Colors.white, borderRadius: 10, paddingHorizontal: 10 }}
          placeholderTextColor={Colors.white}

        />

        <TouchableOpacity style={{ padding: 10, backgroundColor: Colors.white, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }} onPress={() => comment()}>
          <MaterialIcons
            name={'send'}
            color={Colors.black}
            size={20}

          />
        </TouchableOpacity>

      </View>
    </ImageBackground>
  )
}

export default CommentScreen