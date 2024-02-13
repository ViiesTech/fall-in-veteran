import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView,  } from 'react-native'
import React from 'react'
import Profile from 'react-native-vector-icons/FontAwesome'
import Cross from 'react-native-vector-icons/Entypo'
import PagesAndHelp from 'react-native-vector-icons/Feather'
import SettingIcon from 'react-native-vector-icons/AntDesign'
import WatchIcon from 'react-native-vector-icons/Foundation'
import BlogAndJobs from 'react-native-vector-icons/Ionicons'
import OfferAndLogout from 'react-native-vector-icons/MaterialIcons'
import ForumIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from "react-native-modal";
import ModalSection from './ModalSection'
import Appassets from '../../assets/images/Appassets'
import Redhr from '../Redhr'
import Colors from '../../assets/utils/colors'

const ModalContent = ({ navigation, modalVisible, setModalVisible }) => {
  return (
    <Modal
    isVisible={modalVisible}
    animationIn={'slideInRight'}
    animationOut={'slideOutRight'}
    backdropOpacity={0}
    animationInTiming={600}
    onBackdropPress={()=> setModalVisible(!modalVisible)}
    style={{ margin: 0 }}
>
    <SafeAreaView style={{ flex: 1 }}>


            <View style={{ backgroundColor: Colors.black, flex: 1, padding: 13, width: '70%', alignSelf: 'flex-end', height: '100%', opacity: 0.9 }}>
                <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={{ right: 0, position: 'absolute', padding: 15 }} >

                    <Cross name='cross' size={30} color={Colors.white} />
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

                    <Redhr height={2} />
                </View>
                <ModalSection IconName={Profile} title={'Profile'} Icon={'user-o'} color={Colors.white} size={25} />

                <Redhr height={2} />
                <ModalSection IconName={PagesAndHelp} title={'Pages'} Icon={'flag'} color={Colors.white} size={25} />

                <Redhr height={2} />
                <ModalSection IconName={WatchIcon} title={'Watch'} Icon={'play-video'} color={Colors.white} size={25} />

                <Redhr height={2} />
                <ModalSection IconName={BlogAndJobs} title={'Blogs'} Icon={'newspaper-outline'} color={Colors.white} size={25} />

                <Redhr height={2} />
                <ModalSection IconName={BlogAndJobs} title={'Jobs'} Icon={'bag-outline'} color={Colors.white} size={25} />

                <Redhr height={2} />
                <ModalSection IconName={OfferAndLogout} title={'Offers'} Icon={'local-offer'} color={Colors.white} size={25} />

                <Redhr height={2} />
                <ModalSection IconName={ForumIcon} title={'Forums'} Icon={'forum-outline'} color={Colors.white} size={25} />

                <Redhr height={2} />


                <View style={{ position: 'absolute', bottom: 10, width: '100%', paddingLeft: 10 }}>
                    <ModalSection IconName={PagesAndHelp} title={'Help And Support'} Icon={'help-circle'} color={Colors.white} size={25} />
                    <Redhr height={2} />
                    <ModalSection IconName={SettingIcon} title={'Setting'} Icon={'setting'} color={Colors.white} size={25} />

                    <Redhr height={2} />
                    <ModalSection IconName={OfferAndLogout} navigation={() => navigation.navigate('Login')} title={'Logout'} Icon={'logout'} color={Colors.white} size={25} />

                    <Redhr height={2} />
                </View>

            </View>


    </SafeAreaView>
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