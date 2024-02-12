import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SubNestedCategory = ({title}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }}></View>
                <Text style={styles.textColor}>{title}</Text>

            </View>
        </View>
    )
}

export default SubNestedCategory

const styles = StyleSheet.create({
    textColor: {
        color: 'white'
    }
})