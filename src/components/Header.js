import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import SearchIcon from 'react-native-vector-icons/Feather';
import Notification from 'react-native-vector-icons/Ionicons';
import Menu from 'react-native-vector-icons/Entypo';
import Appassets from '../assets/images/Appassets';
import Back from 'react-native-vector-icons/AntDesign';
import ModalContent from './modal/Modal';
import Colors from '../assets/utils/colors';
import Modal from 'react-native-modal'
import Redhr from './Redhr';
import ModalSection from './modal/ModalSection';
import Profile from 'react-native-vector-icons/FontAwesome'
import Cross from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import PagesAndHelp from 'react-native-vector-icons/Feather'
import SettingIcon from 'react-native-vector-icons/AntDesign'
import WatchIcon from 'react-native-vector-icons/Foundation'
import BlogAndJobs from 'react-native-vector-icons/Ionicons'
import OfferAndLogout from 'react-native-vector-icons/MaterialIcons'
import ForumIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/AuthSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Post_Profile_Base_Url from '../utls/Post_Profile_Base_Url';
import Profile_Image_Base_Url from '../utls/Profile_Image_Base_Url';


const Header = ({ navigation, title, onSearchButtonPress, arrow }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const userData = useSelector((state) => state.Data.data)

    // console.log("userData", userData)

    const dispatch = useDispatch()


    const logout = () => {
        setModalVisible(false)
        Alert.alert("Logout", "Are you sure you want to logout", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Confirm", onPress: () => CallLogout() }
        ],
            { cancelable: false })
    }

    const CallLogout = () => {
        
        dispatch(setLogout())
    }

    return (
        <View onPress={() => console.log('Hi')}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    {arrow && (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Back name='arrowleft' size={25} color={Colors.white} />
                        </TouchableOpacity>
                    )}
                    <Text style={{ color: '#BF0B30', fontSize: 20 }}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                    <TouchableOpacity onPress={()=> onSearchButtonPress()}><SearchIcon name='search' size={25} color={Colors.white} /></TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Notification name='notifications-outline' size={25} color={Colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>

                        <Ionicons
                            name={'chatbubble-outline'}
                            color={Colors.white}
                            size={25}

                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Image source={{ uri: `${Profile_Image_Base_Url}${userData?.Profile_Picture}` }} style={{ width: 40, height: 40, borderRadius: 200 }} />

                        <View style={{ backgroundColor: '#002768', position: 'absolute', bottom: 0, left: -5, height: 20, width: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Menu name='menu' color={Colors.white} size={18} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', marginHorizontal: 10, borderColor: '#272727', backgroundColor: '#272727', marginBottom: 5 }}></View>

            <Modal
                isVisible={modalVisible}
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                backdropOpacity={0}
                animationInTiming={600}

                style={{ margin: 0 }}
            >
                <SafeAreaView style={{ flex: 1 }}>


                    <View style={{ backgroundColor: Colors.black, flex: 1, padding: 13, width: '70%', alignSelf: 'flex-end', height: '100%', opacity: 0.9 }}>
                        <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={{ right: 0, position: 'absolute', padding: 15 }} >
                            <Cross name='cross' size={30} color={Colors.white} />
                        </TouchableOpacity>
                        {
                            userData?.Profile_Picture ?

                                <Image source={{ uri: `${Profile_Image_Base_Url}${userData?.Profile_Picture}` }} style={{ width: 80, height: 80, borderRadius: 200, marginTop: 50, marginBottom: 20 }} />
                                :
                                <Ionicons
                                    name={'person'}
                                    color={Colors.red}
                                    size={25}
                                />
                        }
                        <TouchableOpacity>
                            <Text style={[styles.textColor, { fontWeight: 'bold' }]}>{userData?.name}</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 }}>
                            <Text style={[styles.textColor, { fontSize: 16 }]}>{userData?.Friends?.length} Friends</Text>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'red', }}></View>

                            <Text style={[styles.textColor, { fontSize: 16 }]}>1K Posts</Text>
                        </View>


                        <View style={{ marginTop: 15 }}>

                            <Redhr height={2} />
                        </View>

                        <ModalSection navigation={() => { navigation.navigate('FindFriends'), setModalVisible(false) }} IconName={FontAwesome5} title={'Find Friends'} Icon={'user-friends'} color={Colors.white} size={10} />
                        <Redhr height={2} />

                        <ModalSection navigation={() => { navigation.navigate('Pages'), setModalVisible(false) }} IconName={PagesAndHelp} title={'Pages'} Icon={'flag'} color={Colors.white} size={25} />

                        <Redhr height={2} />
                        <ModalSection navigation={() => { navigation.navigate('Watchs'), setModalVisible(false) }} IconName={WatchIcon} title={'Watch'} Icon={'play-video'} color={Colors.white} size={25} />

                        <Redhr height={2} />
                        <ModalSection navigation={() => { navigation.navigate('Blogs'), setModalVisible(false) }} IconName={BlogAndJobs} title={'Blogs'} Icon={'newspaper-outline'} color={Colors.white} size={25} />

                        <Redhr height={2} />
                        <ModalSection navigation={() => { navigation.navigate('Jobs'), setModalVisible(false) }} IconName={BlogAndJobs} title={'Jobs'} Icon={'bag-outline'} color={Colors.white} size={25} />

                        <Redhr height={2} />
                        <ModalSection navigation={() => { navigation.navigate('MyDrawer'), setModalVisible(false) }} IconName={BlogAndJobs} title={'Shops'} Icon={'bag-outline'} color={Colors.white} size={25} />

                        <Redhr height={2} />
                        <ModalSection navigation={() => { navigation.navigate('Offers'), setModalVisible(false) }} IconName={OfferAndLogout} title={'Offers'} Icon={'local-offer'} color={Colors.white} size={25} />

                        <Redhr height={2} />
                        <ModalSection navigation={() => { navigation.navigate('Forums'), setModalVisible(false) }} IconName={ForumIcon} title={'Forums'} Icon={'forum-outline'} color={Colors.white} size={25} />

                        <Redhr height={2} />


                        <View style={{ position: 'absolute', bottom: 10, width: '100%', paddingLeft: 10 }}>
                            <ModalSection IconName={PagesAndHelp} title={'Help And Support'} Icon={'help-circle'} color={Colors.white} size={25} />
                            <Redhr height={2} />
                            <ModalSection IconName={SettingIcon} title={'Setting'} Icon={'setting'} color={Colors.white} size={25} />

                            <Redhr height={2} />
                            <ModalSection IconName={OfferAndLogout} navigation={() => logout()} title={'Logout'} Icon={'logout'} color={Colors.white} size={25} />

                            <Redhr height={2} />
                        </View>

                    </View>


                </SafeAreaView>
            </Modal>


        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    textColor: {
        color: 'white',
        fontSize: 18
    }
})