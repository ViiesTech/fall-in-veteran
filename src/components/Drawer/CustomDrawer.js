import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Close from 'react-native-vector-icons/Entypo'
import Redhr from '../Redhr'
import ConsumerIcon from 'react-native-vector-icons/FontAwesome5' // plug  coins
import Military from 'react-native-vector-icons/MaterialIcons' //   table-furniture  health-and-safety knife-military
import EntypoIcon from 'react-native-vector-icons/Entypo' //drink
import FurnitureIcon from 'react-native-vector-icons/MaterialCommunityIcons' //drink
import Apparel from 'react-native-vector-icons/Ionicons' // shirt-outline fast-food-outline
import Grayhr from '../Grayhr'
import SimpleCategory from './SimpleCategory'
import SubCategories from './SubCategories'
import NestedCategory from './NestedCategory'
import SubNestedCategory from './SubNestedCategory'

const CustomDrawer = ({ navigation }) => {
    return (
        <ScrollView style={{ backgroundColor: 'black', flex: 1, padding: 20, width: '100%', }} contentContainerStyle={{ paddingBottom: 50, width: '100%', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.textColor, { fontSize: 22 }]}>Select Your Category</Text>

                <TouchableOpacity onPress={() => navigation.closeDrawer()}><Close name='cross' color='white' size={30} /></TouchableOpacity>
            </View>
            <View style={{ paddingRight: 45, marginTop: 35 }}>
                <SimpleCategory title={'Consumer Electronics'} Icon={ConsumerIcon} IconName={'plug'} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Military name='military-tech' color='white' size={25} />
                        <Text style={[styles.textColor, { fontSize: 18 }]}>Military Prints</Text>
                    </View>
                    <Text style={[styles.textColor, { fontSize: 20 }]}>—</Text>
                </View>
                <View style={{ paddingLeft: 25, marginVertical: 10 }}>
                    <Grayhr />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }}></View>
                            <Text style={styles.textColor}>Army</Text>
                        </View>
                        <View ><Text style={[styles.textColor, { fontSize: 20 }]}>—</Text></View>
                    </View>
                    <Grayhr />
                    <SubNestedCategory title={'160TH Soar (A)'} />
                </View>
                <Redhr />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Military name='military-tech' color='white' size={25} />
                        <Text style={[styles.textColor, { fontSize: 18 }]}>Military</Text>
                    </View>
                    <Text style={[styles.textColor, { fontSize: 20 }]}>—</Text>
                </View>

                <SubCategories title={'Navy'} />
                <SubCategories title={'Marine Crops'} />
                <SubCategories title={'Air Force'} />
                <Redhr />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Apparel name='shirt-outline' color='white' size={25} />
                        <Text style={[styles.textColor, { fontSize: 18 }]}>Apparel</Text>
                    </View>
                    <Text style={[styles.textColor, { fontSize: 20 }]}>—</Text>
                </View>
                <View style={{ paddingLeft: 25, marginVertical: 10 }}>
                    <Grayhr />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',marginVertical:10 }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }}></View>
                            <Text style={styles.textColor}>Hats</Text>
                        </View>
                        <View ><Text style={[styles.textColor, { fontSize: 20 }]}>—</Text></View>
                    </View>
                    <Grayhr />
                    <SubNestedCategory title={'Army'} />

                    <Grayhr />
                    <SubNestedCategory title={'Navy'} />
                    <Grayhr />

                    <SubNestedCategory title={'Air Force'} />
                    <Grayhr />

                    <SubNestedCategory title={'Marine'} />
                    <Grayhr />

                    <SubNestedCategory title={'Coast Guard'} />
                    <Grayhr />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',marginVertical:10 }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }}></View>
                            <Text style={styles.textColor}>Shirts</Text>
                        </View>
                        <View ><Text style={[styles.textColor, { fontSize: 20 }]}>—</Text></View>
                    </View>
                    <Grayhr />

                    <SubNestedCategory title={'Polo'} />
                    <Grayhr />

                    <SubNestedCategory title={'Long Sleeves'} />
                    <Grayhr />

                    <SubNestedCategory title={'Windbreaker'} />
                    <Grayhr />

                    <SubNestedCategory title={'T-Shirt'} />
                    <Grayhr />

                    <NestedCategory title={'Hoodies'} />
                    <Grayhr />

                    <NestedCategory title={'Sweatpants'} />
                    <Grayhr />

                    <NestedCategory title={'Jackets'} />
                    <Grayhr />

                    <NestedCategory title={'Sweatshirts'} />
                </View>
                <Redhr />

                <SimpleCategory IconName={'table-furniture'} Icon={FurnitureIcon} title={'Furniture'} />
                <SimpleCategory IconName={'table-furniture'} Icon={FurnitureIcon} title={'Home Furnishing'} />
                <SimpleCategory IconName={'health-and-safety'} Icon={Military} title={'Health/Personal Care'} />
                <SimpleCategory IconName={'knife-military'} Icon={FurnitureIcon} title={'Guns & Knives'} />
                <SimpleCategory IconName={'music-video'} Icon={Military} title={'Books/Music/Video'} />
                <SimpleCategory IconName={'coins'} Icon={ConsumerIcon} title={'Challenge Coins'} />
                <SimpleCategory IconName={'knife-military'} Icon={FurnitureIcon} title={'Military Plaques'} />
                <SimpleCategory IconName={'drink'} Icon={EntypoIcon} title={'Christmas'} />
                <SimpleCategory IconName={'drink'} Icon={EntypoIcon} title={'Drinkware'} />
                <SimpleCategory IconName={'fast-food-outline'} Icon={Apparel} title={'Food And Beverage'} />
                <SimpleCategory IconName={'basecamp'} Icon={EntypoIcon} title={'Outdoors/Camping'} />
            </View>
        </ScrollView>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    textColor: {
        color: 'white'
    }
})