'use strict';

//Reference: https://www.raywenderlich.com/247-react-native-tutorial-building-android-apps-with-javascript

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    ImageBackground,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import {Header} from "react-native-elements";
import axios from 'axios';
import Moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {NavigationActions} from "react-navigation";

axios.defaults.headers.common['Authorization'] = 'token 11f5a557061c349f92722d986a62af8072bc1f21';

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

    componentWillReceiveProps(nextProps){
        const username = nextProps.navigation.getParam('username', 'jamesyang1025');

        this.ApiGetProfile(username);

        this.saveData('Follwing', this.state.data);
    }

    ApiGetProfile(username) {
        axios.get('https://api.github.com/users/' + username + '?' + new Date())
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
            })
            .catch(error => this.setState({
                isLoading: false,
                message: 'Get request failed ' + error
            }));
    }

    componentDidMount(){

        const username = this.props.navigation.getParam('username', 'jamesyang1025');

        this.ApiGetProfile(username)

        this.saveData('name', this.state.name);
        this.saveData('username', this.state.username);
        this.saveData('avatar', this.state.avatar);

    }

    async saveData(key, value) {
        try{
            await AsyncStorage.setItem(key, value);
        }catch (error) {
            console.log("error" + error);
        }
    }

    render(){
        if(this.state.isLoading){
            return (
                <View style={{ flex: 1}}>
                    <Header
                        leftComponent={{icon: 'chevron-left', onPress: () => this.props.navigation.goBack(), color: '#fff', size: 32}}
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
                <ScrollView style={{ flex: 1}}>
                    <Header
                        leftComponent={{icon: 'chevron-left', onPress: () => this.props.navigation.goBack(), color: '#fff', size: 32}}
                        centerComponent={{ text: 'Profile', style: styles.header }}
                        rightComponent={{icon: 'home', onPress: () => {
                                const navigateActions = NavigationActions.setParams({key: 'Repositories', params: {username: 'jamesyang1025'},});
                                this.props.navigation.dispatch(navigateActions);
                                const navigateActions2 = NavigationActions.setParams({key: 'Following', params: {username: 'jamesyang1025'},});
                                this.props.navigation.dispatch(navigateActions2);
                                const navigateActions3 = NavigationActions.setParams({key: 'Followers', params: {username: 'jamesyang1025'},});
                                this.props.navigation.dispatch(navigateActions3);
                                const navigateActions4 = NavigationActions.setParams({key: 'Profile', params: {username: 'jamesyang1025'},});
                                this.props.navigation.dispatch(navigateActions4);
                            }, color: '#fff', size: 32}}
                    />

                    <Image source={{uri: this.state.avatar + '?' + new Date()}} style={styles.avatar}/>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.username}>{this.state.username}</Text>
                    <View style={styles.flowRight}>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('Repositories', {username: this.state.username})}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.prompt}>Repos</Text>
                                <Text style={styles.numText}>{this.state.publicReposCount}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('Following', {username: this.state.username})}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.prompt}>Following</Text>
                                <Text style={styles.numText}>{this.state.followingCount}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('Followers', {username: this.state.username})}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.prompt}>Followers</Text>
                                <Text style={styles.numText}>{this.state.followersCount}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                        <Text style={styles.prompt}>Since</Text>
                        <Text style={styles.numText}>{Moment(this.state.profileCreatedDate).format('MM/DD/YYYY')}</Text>
                    </View>
                </ScrollView>
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
        width: wp('44%'),
        height: hp('25%'),
        marginTop: hp('10%'),
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
        marginLeft: wp('2.5%'),
        fontSize: 20,
        color: '#FFFF00',
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
});


