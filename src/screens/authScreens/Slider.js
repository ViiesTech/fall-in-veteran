import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../assets/utils/colors';

const slides = [
    {
        key: 1,
        title: 'Freedom Is Nothing But A Chance To Be Better',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna',
        image: require('../../assets/images/splash2.png'),
        next: false
    },
    {
        key: 2,
        title: 'We Don’t Know Them All, But We Owe Them All',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna',
        image: require('../../assets/images/splash3.png'),
        next: false
    },
    {
        key: 3,
        title: 'In War, There Are No Unwounded Soldiers',
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna",
        image: require('../../assets/images/splash4.png'),
        next: true
    }
];

const Slider = ({ navigation }) => {
    const [showRealApp, setShowRealApp] = useState(false);
    const sliderRef = useRef(null);

    const _renderItem = ({ item }) => {
        return (
            <ImageBackground source={item.image} style={styles.slide}>
                <View style={{ flex: 0.5, justifyContent: 'flex-end', padding: 20 }}>
                    <Text style={{ fontSize: 25, color: Colors.white, width: '83%' }} numberOfLines={2}>{item.title}</Text>
                    <Text style={{ fontSize: 16, color: Colors.white, marginTop: 20 }}>{item.text}</Text>
                    {item.next ? (


                        <TouchableOpacity style={{ borderColor: '#002768', height: 60, width: '70%', borderWidth: 2, borderRadius: 30, marginTop: 20 }} onPress={() => {
                            sliderRef.current?.goToSlide(slides.length)
                            navigation.navigate('Welcome')
                        }
                        }>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'center', paddingHorizontal: 30 }}>

                                    <Text style={{ color: Colors.white, fontSize: 16, }}>Continue</Text>
                                </View>

                                <View style={styles.continue}>
                                    <Icon name="arrowright" size={25} color="white" />

                                </View>
                            </View>
                        </TouchableOpacity>
                    ) :
                        <TouchableOpacity onPress={() => sliderRef.current?.goToSlide(slides.indexOf(item) + 1)}>

                            <View style={styles.nextButton}>
                                <Icon name="arrowright" size={30} color="white" />

                            </View>
                        </TouchableOpacity>
                    }

                </View>
            </ImageBackground>
        );
    }

    const _renderPagination = () => null;

    const _onDone = () => {
        setShowRealApp(true);
    }

    if (showRealApp) {
        // Return your real app component here
        return null;
    } else {
        return (
            <AppIntroSlider
                ref={sliderRef}
                renderItem={_renderItem}
                renderPagination={_renderPagination}
                data={slides}
                onDone={_onDone}
            />
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
    },
    continue: {
        height: 55,
        width: 55,
        borderRadius: 27,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2.5,
        alignSelf: 'flex-end'
    },
    nextButton: {
        marginTop: 15,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderLeftWidth: 2,
        borderTopWidth: 2
    }
});

export default Slider;
