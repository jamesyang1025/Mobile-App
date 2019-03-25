'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text, ImageBackground,
} from 'react-native';
import {Header} from "react-native-elements";

type Props = {};
export default class Following extends Component<Props> {
    render(){
        return (
            <ImageBackground
                source={require('./Resources/Background.jpg')}
                style={styles.background}
            >
                <View style={{ flex: 1}}>
                    <Header
                        centerComponent={{ text: 'Following', style: styles.header }}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        color: '#fff',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
});