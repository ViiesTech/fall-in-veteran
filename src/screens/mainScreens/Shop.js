import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Appassets from '../../assets/images/Appassets'
import Menu from 'react-native-vector-icons/Entypo'
import Heart from 'react-native-vector-icons/AntDesign'
import Rating from 'react-native-vector-icons/AntDesign'
import Colors from '../../assets/utils/colors'

const Shop = ({ navigation, navigate }) => {


    const data = [
        {
            id: 1,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
        {
            id: 2,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
        {
            id: 3,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
        {
            id: 4,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
        {
            id: 5,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
        {
            id: 6,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
        {
            id: 7,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
        {
            id: 8,
            background: Appassets.beverage,
            title1: 'Fireside Utensils',
            title2: 'Firefork 360 ',
            price: '$54.74'
        },
    ]
    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ width: '48.5%' }}>
            <View style={{ position: 'absolute', height: '100%', opacity: 0.8, width: '100%', backgroundColor: '#707070', borderRadius: 10 }}>
            </View>
            <Image source={item.background} style={{ height: 220, width: '100%', borderRadius: 10, }}></Image>
            <View>
                <View style={{ padding: 5 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}><Text style={{ fontSize: 16,color:Colors.white }}>Fireside Utensils</Text>
                        <TouchableOpacity><Heart name='hearto' size={20} color={Colors.white} /></TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 16,color:Colors.white }}>Firefork 360 </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, gap: 2 }}>
                        <Rating name='star' size={16} color={Colors.yellow} />
                        <Rating name='star' size={16} color={Colors.yellow} />
                        <Rating name='star' size={16} color={Colors.yellow} />
                        <Rating name='star' size={16} color={Colors.yellow} />
                        <Rating name='star' size={16} color={Colors.yellow} />
                    </View>
                    <Text style={{ fontSize: 16,color:Colors.white, marginTop: 10 }}>$54.74</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
    return (
        <ImageBackground source={Appassets.splash} style={{ flex: 1 }}>
            <Header title={"Shop"} arrow={true} navigation={navigation} />
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#707070', width: '40%', height: 50, borderRadius: 8 }} onPress={() => navigation.openDrawer()}><Menu name='menu' color={Colors.white} size={30} /><Text style={{ fontSize: 16,color:Colors.white }}>Categories</Text></TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: '#707070', justifyContent: 'center', alignItems: 'center' }}><Image source={Appassets.filter}></Image></TouchableOpacity>
                </View>
                <Text style={{ fontSize: 20,color:Colors.white, fontWeight: 'bold', marginTop: 15 }}>Food and Beverage</Text>
                <View style={{ paddingBottom: 250, marginTop: 5 }}>

                    <FlatList
                        data={data}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}

                    />
                </View>
            </View>


        </ImageBackground>
    )
}

export default Shop

const styles = StyleSheet.create({
  
})