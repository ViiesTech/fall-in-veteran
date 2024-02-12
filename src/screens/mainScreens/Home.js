import { View, Text, ImageBackground, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Appassets from '../../assets/images/Appassets'
import SearchIcon from 'react-native-vector-icons/Feather'
import Notification from 'react-native-vector-icons/Ionicons'
import Menu from 'react-native-vector-icons/Entypo'
import LikeIcon from 'react-native-vector-icons/AntDesign'
import CommentIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotsIcon from 'react-native-vector-icons/Entypo'
import Header from '../../components/Header'
import SaveIcon from 'react-native-vector-icons/FontAwesome'
import HideIcon from 'react-native-vector-icons/Feather'
import ReportIcon from 'react-native-vector-icons/AntDesign'



const Home = ({ navigation }) => {
  const [dialogState, setDialogState] = useState({});
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
  const toggleDialog = (postId) => {
    setDialogState(prevState => ({
      ...prevState,
      [postId]: !prevState[postId] // Toggle dialog state for the postId
    }));
  };
  const renderItem = ({ item }) => (
    <View style={{ gap: 10, marginVertical: 10, }}>
      <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', }}>
      </View>
      <View style={{ padding: 15, gap: 10, }}>
        {item.userPost ? (
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <TouchableOpacity >

              <Image source={item.profilePic} style={{ height: 40, width: 40 }}></Image>
            </TouchableOpacity>
            <View >
              <View style={{ flexDirection: 'row', gap: 20,alignItems:'center' }}>
                <TouchableOpacity>

                  <Text style={{ color: 'white',fontSize:16 }}>{item.name}</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white' }}>{item.addedPhoto}</Text>
              </View>
              <View>

                <Text style={{ color: 'white' }}>{item.time}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>

              <TouchableOpacity >

                <Image source={item.profilePic} style={{ height: 40, width: 40 }}></Image>
              </TouchableOpacity>
              <View style={{}}>
                <TouchableOpacity >
                  <Text style={{ color: 'white',fontSize:16 }}>{item.name}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <View style={{ flexDirection: 'row', gap: 10 }}>

                    <Text style={{ color: 'white' }}>{item.time}</Text>
                    <Text style={[styles.textColor, { fontSize: 14 }]}>Community Post</Text>
                  </View>

                </View>

              </View>

            </View>
            <View>
              <TouchableOpacity style={{ backgroundColor: '#BF0B30', height: 35, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Join Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        }



        <View style={{ borderColor: '#BF0B30', borderWidth: 1, borderRadius: 10 }}>
          <Text style={{ color: 'white', padding: 10 }}>{item.caption}</Text>
          {item.postPic && (
            <Image source={Appassets.postImage} style={{ width: '100%', borderRadius: 10 }}></Image>

          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
            <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><LikeIcon name='like2' size={20} color='white' /><Text style={styles.textColor}>{item.likes}</Text></View></TouchableOpacity>
            <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><CommentIcon size={20} name='comment-outline' color='white' /><Text style={styles.textColor}>{item.comment}</Text></View></TouchableOpacity>
            <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><ShareIcon size={20} name='share-outline' color='white' /><Text style={styles.textColor}>{item.share}</Text></View></TouchableOpacity>
          </View>
          <View>

            <TouchableOpacity onPress={(() => toggleDialog(item.id))}><DotsIcon name='dots-three-vertical' color='white' size={17} /></TouchableOpacity>

          </View>

        </View>
        {dialogState[item.id] && (
          <View style={{ backgroundColor: 'white', position: 'absolute', bottom: -40, right: 30, borderRadius: 5,zIndex:999, padding: 10, height: 80, justifyContent: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <SaveIcon name='bookmark-o' />
              <Text style={[styles.blackText, { marginLeft: 3 }]}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <HideIcon name='eye-off' /><Text style={[styles.blackText, { marginLeft: 3 }]}>Hide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <ReportIcon name='exclamationcircleo' />
              <Text style={[styles.blackText, { marginLeft: 3 }]}>Report</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </View>


  );


  return (
    <ImageBackground source={Appassets.splash} style={{ flex: 1 }}>
      <Header title={"FALL IN VETERAN"} arrow={false} navigation={navigation} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 30, }}
      />
    </ImageBackground>
  )
}





export default Home

const styles = StyleSheet.create({
  textColor: {
    color: 'white'
  },
  blackText: {
    color: 'black'
  }
})