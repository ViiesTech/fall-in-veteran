import {StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../assets/utils/colors'

const ModalSection = ({title,IconName,Icon,navigation}) => {
    return (
        <TouchableOpacity onPress={navigation} style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 7 }}>
            <IconName name={Icon} color={Colors.white} size={25} />
            <Text style={styles.textColor}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ModalSection
const styles = StyleSheet.create({
    textColor: {
    color: 'white',
    fontSize: 18
  }
})
