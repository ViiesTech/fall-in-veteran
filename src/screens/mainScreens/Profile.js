import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
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


const Profile = () => {

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


  return (
    <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
      <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Profile</Text>

      <View style={{ height: 150, width: '90%', alignSelf: 'center', marginTop: 10, }}>
        <View style={{ height: 170, width: '100%', opacity: 0.6, backgroundColor: 'gray', borderRadius: 10, position: 'absolute' }} />

        <Image source={require('../../assets/images/cover.png')} style={{ alignSelf: 'center', borderTopRightRadius: 10, borderTopLeftRadius: 10, width: '100%', height: 100, }} />


        <Image source={require('../../assets/images/pfp.png')} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 10, position: 'absolute', top: 70 }} />

        <View style={{ paddingHorizontal: 10, width: '75%', alignSelf: 'flex-end', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'ce' }}>

          <View>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Lilly Unrah</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/images/medal.png')} style={{ height: 20, width: 20 }} />
              <Text style={{ color: '#79C14B', fontSize: 12, marginLeft: 1 }}>Verified Profile</Text>
            </View>
          </View>
          <Text style={{ color: 'white' }}>Edit Profile</Text>


        </View>


      </View>


      <View style={{ flex: 1, marginTop: 30 }}>

        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={{ width: '100%', marginTop: 10, alignSelf: 'center', borderRadius: 20, overflow: 'hidden', }}>
                <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070',  alignSelf:'center' }}>
                </View>

                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 10 }}>
                  <TouchableOpacity >
                    <Image source={item.profilePic} style={{ height: 40, width: 40 }} />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10 }} >
                    <TouchableOpacity >
                      <Text style={{ color: Colors.white, fontSize: 16 }}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Text style={{ color: Colors.white }}>{item.time}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ borderColor: Colors.red, borderWidth: 1, borderRadius: 10 }}>
                  <Text style={{ color: Colors.white, padding: 10 }}>{item.caption}</Text>
                  {item.postPic && (
                    <Image source={Appassets.postImage} style={{ width: '100%', borderRadius: 10 }}></Image>

                  )}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25, height:40, paddingHorizontal:20 }}>
                    <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><LikeIcon name='like2' size={20} color={Colors.white} /><Text style={styles.textColor}>{item.likes}</Text></View></TouchableOpacity>
                    <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><CommentIcon size={20} name='comment-outline' color={Colors.white} /><Text style={styles.textColor}>{item.comment}</Text></View></TouchableOpacity>
                    <TouchableOpacity><View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><ShareIcon size={20} name='share-outline' color={Colors.white} /><Text style={styles.textColor}>{item.share}</Text></View></TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={(() => toggleDialog(item.id))}><DotsIcon name='dots-three-vertical' color={Colors.white} size={17} /></TouchableOpacity>
                  </View>

                </View>



              </View>
            )
          }}
        />

      </View>

    </ImageBackground>
  )
}

export default Profile


const styles = StyleSheet.create({
  textColor: {
    color: Colors.white
  },

})