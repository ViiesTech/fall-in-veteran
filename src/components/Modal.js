import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Appassets from '../assets/images/Appassets'
import Redhr from './Redhr'
import Profile from 'react-native-vector-icons/FontAwesome'
import Cross from 'react-native-vector-icons/Entypo'
import PagesAndHelp from 'react-native-vector-icons/Feather'  // 
import SettingIcon from 'react-native-vector-icons/AntDesign'  //
import WatchIcon from 'react-native-vector-icons/Foundation'  //
import BlogAndJobs from 'react-native-vector-icons/Ionicons'  //newspaper-outline bag-outline
import OfferAndLogout from 'react-native-vector-icons/MaterialIcons'  //local-offer 
import ForumIcon from 'react-native-vector-icons/MaterialCommunityIcons'  //
import Modal from "react-native-modal";




const ModalContent = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationIn="slideInRight" 
      animationOut="slideOutRight" 
      animationInTiming={3300} 
      animationOutTiming={3300} 
      style={{ margin: 0, }}
    >
      <View style={{ backgroundColor: 'black', flex: 1, padding: 13, width: '70%',alignSelf:'flex-end' , height: '100%', opacity: 0.9 }}>
        <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={{ right: 0, position: 'absolute', padding: 15 }} >

          <Cross name='cross' size={30} color='white' />
        </TouchableOpacity>
        <Image source={Appassets.modalProfile} style={{ marginTop: 25, marginBottom: 10 }}></Image>
        <TouchableOpacity>
          <Text style={[styles.textColor, { fontWeight: 'bold' }]}>Mary Elizabeth</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 }}>
          <Text style={[styles.textColor, { fontSize: 16 }]}>145 Friends</Text>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'red', }}></View>

          <Text style={[styles.textColor, { fontSize: 16 }]}>1K Posts</Text>
        </View>
        <View style={{ marginTop: 15 }}>

          <Redhr />
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
          <Profile name='user-o' color='white' size={25} />
          <Text style={styles.textColor}>Profile</Text>
        </TouchableOpacity>
        <Redhr />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
          <PagesAndHelp name='flag' color='white' size={25} />
          <Text style={styles.textColor}>Pages</Text>
        </TouchableOpacity>
        <Redhr />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
          <WatchIcon name='play-video' color='white' size={25} />
          <Text style={styles.textColor}>Watch</Text>
        </TouchableOpacity>
        <Redhr />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
          <BlogAndJobs name='newspaper-outline' color='white' size={25} />
          <Text style={styles.textColor}>Blogs</Text>
        </TouchableOpacity>
        <Redhr />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
          <BlogAndJobs name='bag-outline' color='white' size={25} />
          <Text style={styles.textColor}> Jobs</Text>
        </TouchableOpacity>
        <Redhr />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
          <OfferAndLogout name='local-offer' color='white' size={25} />
          <Text style={styles.textColor}>Offers</Text>
        </TouchableOpacity>
        <Redhr />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
          <ForumIcon name='forum-outline' color='white' size={25} />
          <Text style={styles.textColor}>Forums</Text>
        </TouchableOpacity>
        <Redhr />


        <View style={{ position: 'absolute', bottom: 10, width: '100%', paddingLeft: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
            <PagesAndHelp name='help-circle' color='white' size={25} />
            <Text style={styles.textColor}>Help & Support</Text>
          </TouchableOpacity>
          <Redhr />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
            <SettingIcon name='setting' color='white' size={25} />
            <Text style={styles.textColor}>Setting</Text>
          </TouchableOpacity>
          <Redhr />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
            <OfferAndLogout name='logout' color='white' size={25} />
            <Text style={styles.textColor}>Logout</Text>
          </TouchableOpacity>
          <Redhr />
        </View>

      </View>
    </Modal>
  )
}

export default ModalContent

const styles = StyleSheet.create({
  textColor: {
    color: 'white',
    fontSize: 18
  }
})