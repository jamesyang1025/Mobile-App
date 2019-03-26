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
    ScrollView, Linking, Button, AsyncStorage,
} from 'react-native';
import {
    NavigationActions,
} from 'react-navigation';
import {Header, ListItem} from "react-native-elements";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'token 11f5a557061c349f92722d986a62af8072bc1f21';

type Props = {};
export default class Following extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            followingChecked: false,
        }
    }

    componentWillReceiveProps(nextProps){

        const username = nextProps.navigation.getParam('username', 'jamesyang1025');

        this.ApiGetFollowing(username);

        this.saveData('Follwing', this.state.data);
    }

    ApiGetFollowing(username) {
        axios.get('https://api.github.com/users/' + username + '/following' + '?' + new Date())
            .then(response => {
                this.setState({
                    isLoading: false,
                    data: response.data,
                });
            })
            .catch(error => this.setState({
                isLoading: false,
                message: 'Get request failed ' + error
            }));
    }

    ApiFollow(username) {

        axios.put('https://api.github.com/user/following/' + username + '?' + new Date())
            .then(response => {
                this.setState({
                    isLoading: false,
                }, () => {
                    this.ApiGetFollowing(this.props.navigation.getParam('username', 'jamesyang1025'));
                    let navigateActions = NavigationActions.setParams({key: 'Profile', params: {username: 'jamesyang1025'},});
                    this.props.navigation.dispatch(navigateActions);
                })
            }).catch(error => {
                this.setState({
                    isLoading: false,
                    message: 'Put request failed ' + error,
                });
            })
    }

    ApiUnfollow(username){
        axios.delete('https://api.github.com/user/following/' + username + '?' + new Date())
            .then(response => {
                this.setState({
                    isLoading: false,
                }, () => {
                    this.ApiGetFollowing(this.props.navigation.getParam('username', 'jamesyang1025'));
                    let navigateActions = NavigationActions.setParams({key: 'Profile', params: {username: 'jamesyang1025'},});
                    this.props.navigation.dispatch(navigateActions);
                })
            }).catch(error => {
            this.setState({
                isLoading: false,
                message: 'Put request failed ' + error,
            });
        })
    }

    ApiCheckFollow(username){
        this.setState({
            isLoading: true,
        }, () => {
            axios.get('https://api.github.com/users/jamesyang1025/following/' + username + '?' + new Date())
                .then(response => {
                    this.ApiUnfollow(username);
                }).catch(error => {
                    this.ApiFollow(username);
            })
        })
    }

    async saveData(key, value) {
        try{
            await AsyncStorage.setItem(key, value);
        }catch (error) {
            console.log("error" + error);
        }
    }


    componentDidMount(){

        const username = this.props.navigation.getParam('username', 'jamesyang1025');

        this.ApiGetFollowing(username)

        this.saveData('Follwing', this.state.data);
    }

    renderItem = ({item}) => (
        <ListItem
            title={
                <View style={{flex: 1}}>
                    <Text style={styles.username}>{item.login}</Text>
                </View>
            }
            onPress={() => {
                this.props.navigation.navigate('Profile', {username: item.login});
                const navigateActions = NavigationActions.setParams({key: 'Repositories', params: {username: item.login},});
                this.props.navigation.dispatch(navigateActions);
                const navigateActions2 = NavigationActions.setParams({key: 'Following', params: {username: item.login},});
                this.props.navigation.dispatch(navigateActions2);
                const navigateActions3 = NavigationActions.setParams({key: 'Followers', params: {username: item.login},});
                this.props.navigation.dispatch(navigateActions3);
            }}
            rightElement={
                <Button title={'Follow / Unfollow'} onPress={() => {this.ApiCheckFollow(item.login)}}/>
            }
        />
    );

    keyExtractor = (item) => item.login;

    render(){
        if(this.state.isLoading){
            return (
                <ImageBackground
                    source={require('./Resources/Background.jpg')}
                    style={styles.background}
                >
                    <View style={{ flex: 1}}>
                        <Header
                            leftComponent={{icon: 'chevron-left', onPress: () => this.props.navigation.goBack(), color: '#fff', size: 32}}
                            centerComponent={{ text: 'Following', style: styles.header }}
                        />
                    </View>
                </ImageBackground>
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
                        centerComponent={{ text: 'Following', style: styles.header }}
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
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                    />
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
    username: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});