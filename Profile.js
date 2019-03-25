'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import {Header} from "react-native-elements";
import axios from 'axios';
import Moment from 'moment';

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
            <ImageBackground
                source={require('./Resources/Background.jpg')}
                style={styles.background}
            >
                <View style={{ flex: 1}}>
                    <Header
                        centerComponent={{ text: 'Profile', style: styles.header }}
                    />

                    <Image source={{uri: this.state.avatar}} style={styles.avatar} />
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.username}>{this.state.username}</Text>
                    <View style={styles.flowRight}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Repositories')}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.prompt}>Repositories</Text>
                                <Text style={styles.numText}>{this.state.publicReposCount}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Following')}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.prompt}>Following</Text>
                                <Text style={styles.numText}>{this.state.followingCount}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Followers')}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.prompt}>Followers</Text>
                                <Text style={styles.numText}>{this.state.followersCount}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                        <Text style={styles.prompt}>Since</Text>
                        <Text style={styles.numText}>{Moment(this.state.profileCreatedDate).format('MM/DD/YYYY')}</Text>
                    </View>
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
    avatar: {
        width: 80,
        height: 80,
        marginTop: 70,
        alignSelf: 'center',

    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#F5F5DC'
    },
    username: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#A52A2A'
    },
    numText: {
        fontSize: 20,
        flexDirection: 'row',
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#FFFFF0',
    },
    prompt: {
        marginLeft: 10,
        fontSize: 20,
        color: '#FFFF00',
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 5,
    },
});


