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
export default class Profile extends Component<Props> {
    render(){
        return (
            <View style={{ flex: 1}}>
                <Header
                    centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
                />
            </View>
        );
    }
}