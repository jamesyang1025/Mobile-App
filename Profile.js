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
import axios from 'axios';

type Props = {};
export default class Profile extends Component<Props> {

    componentDidMount(){
        axios.get('https://api.github.com/users/jamesyang1025')
            .then(response => {
                this.setState({
                    avatar: response.data.avatar_url,
                    name: response.data.name,
                    username: response.data.login,
                    bio: response.data.bio,
                    website: response.data.blog,
                    email: response.data.email,
                    publicReposCount: response.data.public_repos,
                    followersCount: response.data.followers,
                    followingCount: response.data.following,
                    profileCreatedDate: response.data.created_at,

                })
            })
            .catch(error => this.setState({
                isLoading: false,
                message: 'Get request failed ' + error
            }));
    }

    render(){
        return (
            <View style={{ flex: 1}}>
                <Header
                    centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
                />
                <Text
                    
                />
            </View>
        );
    }
}


