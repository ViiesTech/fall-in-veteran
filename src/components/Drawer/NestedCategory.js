import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Grayhr from '../Grayhr'

const NestedCategory = ({title}) => {
    return (
        <View>



            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical:5}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }}></View>
                    <Text style={styles.textColor}>{title}</Text>

                </View>
                <View ><Text style={[styles.textColor, { fontSize: 20 }]}>—</Text></View>
            </View>
        </View>
    )
}

export default NestedCategory

const styles = StyleSheet.create({
    textColor: {
        color: 'white'
    }
})