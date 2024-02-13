import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ActiveDot from './activeDot'

const SubNestedCategory = ({ title }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActiveDot />
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