import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Military from 'react-native-vector-icons/MaterialIcons' //   table-furniture  health-and-safety knife-military

import Grayhr from '../Grayhr'
const SubCategories = ({title}) => {
  return (
    <View style={{ paddingLeft: 25,marginVertical:5 }}>
    <Grayhr />
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginVertical:5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }}></View>
            <Text style={styles.textColor}>{title}</Text>

        </View>
    </View>


 
  

</View>
  )
}

export default SubCategories

const styles = StyleSheet.create({
    textColor: {
        color: 'white'
    }
})