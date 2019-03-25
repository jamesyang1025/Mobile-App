'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';
import {Header} from "react-native-elements";

type Props = {};
export default class Repositories extends Component<Props> {
    render(){
        return (
            <View style={{ flex: 1}}>
                <Header
                    centerComponent={{ text: 'Repositories', style: styles.header }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        color: '#fff',
    }
});