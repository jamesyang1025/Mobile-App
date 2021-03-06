'use strict';

//Reference: https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
//Reference: https://www.raywenderlich.com/247-react-native-tutorial-building-android-apps-with-javascript

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    Linking,
    ImageBackground,
    ScrollView, AsyncStorage
} from 'react-native';
import {Header, ListItem} from "react-native-elements";
import axios from 'axios';
import {NavigationActions} from "react-navigation";

axios.defaults.headers.common['Authorization'] = 'token 11f5a557061c349f92722d986a62af8072bc1f21';

type Props = {};
export default class Repositories extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        }
    }

    componentWillReceiveProps(nextProps){

        const username = nextProps.navigation.getParam('username', 'jamesyang1025');

        this.ApiGetRepos(username);

        this.saveData('Follwing', this.state.data);
    }

    ApiGetRepos(username) {
        axios.get('https://api.github.com/users/' + username + '/repos' + '?' + new Date())
            .then(response => {
                this.setState({
                    isLoading: false,
                    data: response.data,
                });
                console.log(this.state.data);
            })
            .catch(error => {this.setState({
                isLoading: false,
                message: 'Get request failed ' + error
            });
            console.log(error.response)});
    }

    static async checkStar(ownerName, repoName) {
        try{
            const data = await axios.get('https://api.github.com/user/starred/' + ownerName + '/' + repoName + '?' + new Date());
            return data;
        }catch (error) {
            return error.response;
        }
    }


    ApiCheckStar(ownerName, repoName){
        this.setState({
            isLoading: true,
        }, () => {
            axios.get('https://api.github.com/user/starred/' + ownerName + '/' + repoName + '?' + new Date())
                .then(response => {
                    this.ApiUnstar(ownerName, repoName);
                }).catch(error => {
                    this.ApiStar(ownerName, repoName);
            })
        })
    }

    ApiStar(ownerName, repoName){
        axios.put('https://api.github.com/user/starred/' + ownerName + '/' + repoName + '?' + new Date())
            .then(response => {
                this.setState({
                    isLoading: false,
                }, () => {
                    this.ApiGetRepos(this.props.navigation.getParam('username', 'jamesyang1025'));
                })
            }).catch(error => {
                this.setState({
                    isLoading: false,
                    message: 'Put request failed ' + error,
                })
        })
    }

    ApiUnstar(ownerName, repoName){
        axios.delete('https://api.github.com/user/starred/' + ownerName + '/' + repoName + '?' + new Date())
            .then(response => {
                this.setState({
                    isLoading: false,
                }, () => {
                    this.ApiGetRepos(this.props.navigation.getParam('username', 'jamesyang1025'));
                })
            }).catch(error => {
            this.setState({
                isLoading: false,
                message: 'Put request failed ' + error,
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

        this.ApiGetRepos(username);

        this.saveData('Repositories', this.state.data);
    }

    displayColor(ownerName, repoName) {
        Repositories.checkStar(ownerName, repoName).then(data => {
            if(data.status === '204')
                return '#FFD700';
            return '#808080';
        }).catch(error => {
            console.log("error");
        })
    }

    renderItem = ({item}) => (
        <ListItem
            title={
                <View style={{flex: 1}}>
                    <Text style={styles.repoName}>{item.name}</Text>
                </View>
            }
            subtitle={
                <View style={{flex: 1}}>
                    <Text style={styles.ownerName}>{item.owner.login}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            }
            onPress={() => Linking.openURL(item.html_url)}
            rightIcon={{name: 'star', onPress: () => {this.ApiCheckStar(item.owner.login, item.name)},
                color: this.displayColor(item.owner.login, item.name)}}
        />
    );

    keyExtractor = (item) => item.name;

    render(){
        if(this.state.isLoading){
            return (
                <ImageBackground
                    source={require('./Resources/Background.jpg')}
                    style={styles.background}
                >
                    <ScrollView style={{ flex: 1}}>
                        <Header
                            leftComponent={{icon: 'chevron-left', onPress: () => this.props.navigation.goBack(), color: '#fff', size: 32}}
                            centerComponent={{ text: 'Repositories', style: styles.header }}
                        />
                    </ScrollView>
                </ImageBackground>
            );
        }
        return (
            <ImageBackground
                source={require('./Resources/Background.jpg')}
                style={styles.background}
            >
                <View style={{ flex: 1}}>
                    <Header
                        leftComponent={{icon: 'chevron-left', onPress: () => this.props.navigation.goBack(), color: '#fff', size: 32}}
                        centerComponent={{ text: 'Repositories', style: styles.header }}
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
    repoName: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    ownerName: {
        fontSize: 18,
    },
    description: {
        fontSize: 18,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    unstarColor: {
        color: '#808080',
    },
    starColor: {
        color: '#FFD700',
    }
});