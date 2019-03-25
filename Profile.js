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

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            avatar: '',
            name: '',
            username: '',
            bio: '',
            website: '',
            email: '',
            publicReposCount: '',
            followersCount: '',
            followingCount: '',
            profileCreatedDate: '',

        }
    }

    componentDidMount(){
        axios.get('https://api.github.com/users/jamesyang1025')
            .then(response => {
                this.setState({
                    isLoading: false,
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
                });
                console.log(response.data);
            })
            .catch(error => this.setState({
                isLoading: false,
                message: 'Get request failed ' + error
            }));
    }

    render(){
        if(this.state.isLoading){
            return (
                <View style={{ flex: 1}}>
                    <Header
                        centerComponent={{ text: 'Profile', style: styles.header }}
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1}}>
                <Header
                    centerComponent={{ text: 'Profile', style: styles.header }}
                />
                <Image source={{uri: this.state.avatar}} style={styles.avatar} />
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.username}>{this.state.username}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        color: '#fff',
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 20,
        marginTop: 20,
        alignSelf: 'center',

    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    username: {
        fontSize: 15,
        alignSelf: 'center',
    }
});


