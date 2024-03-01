import { View, Text, ImageBackground, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React from 'react'
import Appassets from '../../../assets/images/Appassets'
import Colors from '../../../assets/utils/colors'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Back from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const Seller = ({ navigation }) => {
    return (
        <ImageBackground source={Appassets.slide2} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', paddingTop: 20, paddingRight: 20, paddingLeft: 20, justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>

                    <TouchableOpacity onPress={() => navigation.navigate('Alltabs')}>
                        <Back name='arrowleft' size={25} color={Colors.white} />
                    </TouchableOpacity>

                    <Text style={{ color: '#BF0B30', fontSize: 20 }}>Shop</Text>
                </View>


                <TouchableOpacity onPress={() => navigation.navigate("MyDrawer")} style={{ backgroundColor: '#707070', padding: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Switch to Buyer</Text>
                </TouchableOpacity>

            </View>




            <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Sell your product</Text>



            <View style={{ padding: 20 }}>

                <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '100%', backgroundColor: '#707070', borderRadius: 10, alignSelf: 'center' }}>
                </View>

                <View style={{ height: 450 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Product</Text>
                    </View>

                    <View style={{ height: 1, width: '100%', backgroundColor: 'white', marginTop: 10, marginBottom: 10 }} />


                    <View style={{ padding: 20 }}>
                        <TouchableOpacity style={{ height: 50, width: '100%', borderWidth: 1, borderColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <EvilIcons
                                name={'image'}
                                color={'white'}
                                size={25}
                            />
                            <Text style={{ color: 'white', marginLeft: 10 }}>Add Product Pictures</Text>
                        </TouchableOpacity>

                        <Text style={{ color: 'white' , marginTop:20}}>Product Name</Text>
                        <TextInput
                            placeholder="type here"
                            placeholderTextColor={'white'}
                            style={{ width: '100%', alignSelf: 'center', marginTop: 10, fontSize: 14, color: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 10, paddingHorizontal: 10, height:40 }}

                        />

                        <Text style={{ color: 'white', marginTop: 20 }}>Product Price</Text>
                        <TextInput
                            placeholder="$"
                            placeholderTextColor={'white'}
                            style={{ width: '100%', alignSelf: 'center', marginTop: 10, fontSize: 14, color: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 10, paddingHorizontal: 10, height:40 }}

                        />

                        <TouchableOpacity style={{height:50, width:'100%', backgroundColor:Colors.red, marginTop:20, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'white', fontSize:14}}>Sell Now</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
        </ImageBackground>
    )
}

export default Seller