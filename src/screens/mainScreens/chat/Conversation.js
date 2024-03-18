``
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios'
import socketServices from '../../../socket/Socket_Service'
import Base_Api_Url from '../../../utls/Base_Api_Url'
import Colors from '../../../assets/utils/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Profile_Image_Base_Url from '../../../utls/Profile_Image_Base_Url'
import moment from 'moment'
import Appassets from '../../../assets/images/Appassets'
const Conversation = ({ navigation, route }) => {

    const [message, setmessage] = useState()
    const [data, setData] = useState([])
    const [isTyping, setTyping] = useState(false)
    const { FriendData,isOnline } = route.params
    const CurrentUserData = useSelector(state => state?.Data?.data)
    const token = useSelector(state => state?.Data?.token)



    useEffect(() => {

        socketServices.on(`${CurrentUserData._id}_${FriendData._id}_message`, (message) => {
            const socketMessage = message.data

            console.log("message data", socketMessage)
            let arryMessage = [...data]
            setData(arryMessage.concat(socketMessage));
        })

    }, [data])


    useEffect(() => {
        getChatFromDatabase()
    }, [])

    const getChatFromDatabase = () => {
        let data = JSON.stringify({
            "id": CurrentUserData._id,
            "FriendId": FriendData._id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Base_Api_Url}getChat`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setData(response.data.data);
                console.log("database db mongo", JSON.stringify(response.data.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }


    const sendMessage = () => {

        if (message == "") {
            Alert.alert("Ops", "textField is empty")
        } else {


            const localText = {
                "sender": CurrentUserData._id,
                "receiver": FriendData._id,
                "text": message,
            }

            let arryMessage = [...data]
            setData(arryMessage.concat(localText));

            const MessageCollection = {
                "Sender_id": CurrentUserData._id,
                "Reciver_id": FriendData._id,
                "Message": message,
            }


            socketServices.emit('sendMessage', MessageCollection)
            setmessage("")



            const HowChatWithWho = {
                "Sender_id": CurrentUserData,
                "Reciver_id": FriendData,
                "lastMessage": message
            }
            socketServices.emit('Sender_Reciver_data', HowChatWithWho)

            setTyping(false)
        }
    }




    return (
        <ImageBackground source={Appassets.slide3} style={{ flex: 1, paddingBottom: 10 }}>

            <View style={{ height: 60, backgroundColor: Colors.red, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>

                <TouchableOpacity onPress={() => { setData([]), setmessage(""), navigation.goBack() }}>
                    <Ionicons
                        name={"arrow-back"}
                        color={Colors.white}
                        size={25}
                    />
                </TouchableOpacity>

                <Image source={{ uri: `${Profile_Image_Base_Url}${FriendData.Profile_Picture}` }} style={{ height: 40, width:40, borderRadius: 200, marginLeft: 20 }} />
                <View style={{marginLeft:0, justifyContent:'center'}}>

                <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: Colors.white }}>{FriendData.name}</Text>
                {
                    isOnline == true ?

                    <Text style={{marginLeft:10, color:Colors.white}}>Online</Text>
                    :
                    <Text style={{marginLeft:10, color:Colors.white}}>Offline</Text>
                }
                </View>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10 }}>

                <FlatList
            data={[...data].reverse()}
                    inverted
                    renderItem={({ item }) => {
                        const timeStamp = item.timestamp

                        const utcTime = moment.utc(timeStamp).local() 
                        const amPM = utcTime.format('hh:mm A')
                        
                    
                        return (
                            <View style={{ maxWidth:'70%', backgroundColor: 'red', alignSelf: item.receiver == FriendData._id ? 'flex-start' : 'flex-end', padding: 10, marginTop: 10, borderRadius: 10, backgroundColor: item.receiver == FriendData._id ? Colors.red : Colors.white }}>
                                <Text style={{ color:  item.receiver == FriendData._id ? Colors.white: Colors.black }}>{item.text}</Text>
                                <Text style={{color: item.receiver == FriendData._id ? Colors.white: Colors.black, fontSize:10, alignSelf:'flex-end', marginLeft:50}}>{amPM}</Text>
                            </View>
                        )
                    }}

                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    placeholder='Type here'
                    placeholderTextColor={Colors.white}
                    style={{ height: 50, width: '80%', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, borderColor:Colors.white }}
                    onChangeText={(txt) => {
                        setmessage(txt)
                        setTyping(true)
                    }}

                    value={message}

                />
                <TouchableOpacity onPress={() => sendMessage()} style={{ backgroundColor: Colors.red, padding: 15, marginLeft: 5, borderRadius: 200 }}>
                    <FontAwesome
                        name={'send'}
                        color={Colors.white}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Conversation