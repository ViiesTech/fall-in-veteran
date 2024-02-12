import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Redhr from '../Redhr'
import ConsumerIcon from 'react-native-vector-icons/FontAwesome5' // plug  coins
import Military from 'react-native-vector-icons/MaterialIcons' //   table-furniture  health-and-safety knife-military
// music-video
import Drink from 'react-native-vector-icons/Entypo' //drink
import Apparel from 'react-native-vector-icons/Ionicons' // shirt-outline fast-food-outline
import Grayhr from '../Grayhr'
const SimpleCategory = ({ title, Icon, IconName }) => {
  return (
    <View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 10, }}>

        <View style={{ height: 30, width: 30, borderRadius: 15, borderColor: 'white', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={IconName} color='white' size={20} />

        </View>
        <Text style={[styles.textColor, { fontSize: 18 }]}>{title}</Text>
      </View>

      <Redhr />
    </View>
  )
}

export default SimpleCategory

const styles = StyleSheet.create({
  textColor: {
    color: 'white'
  }
})