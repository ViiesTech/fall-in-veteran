import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import SearchIcon from 'react-native-vector-icons/Feather';
import Notification from 'react-native-vector-icons/Ionicons';
import Menu from 'react-native-vector-icons/Entypo';
import Appassets from '../assets/images/Appassets';
import Back from 'react-native-vector-icons/AntDesign';
import ModalContent from './Modal';

const Header = ({ navigation, title, arrow }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    {arrow && (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Back name='arrowleft' size={25} color='white' />
                        </TouchableOpacity>
                    )}
                    <Text style={{ color: '#BF0B30', fontSize: 20 }}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                    <TouchableOpacity><SearchIcon name='search' size={25} color='white' /></TouchableOpacity>
                    <TouchableOpacity><Notification name='notifications-outline' size={25} color='white' /></TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Image source={Appassets.profile} style={{ height: 40, width: 40 }} />
                        <View style={{ backgroundColor: '#002768', position: 'absolute', bottom: 0, left: -5, height: 20, width: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Menu name='menu' color='white' size={18} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', marginHorizontal: 10, borderColor: '#272727', backgroundColor: '#272727', marginBottom: 5 }}></View>
            {modalVisible && <ModalContent navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
        </View>
    );
}

export default Header;
