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
    ScrollView
} from 'react-native';
import {Header, ListItem} from "react-native-elements";
import axios from 'axios';
import {NavigationActions} from "react-navigation";

axios.defaults.headers.common['Authorization'] = '11f5a557061c349f92722d986a62af8072bc1f21';

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
    }

    ApiGetRepos(username) {
        axios.get('https://api.github.com/users/' + username + '/repos')
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

    componentDidMount(){

        const username = this.props.navigation.getParam('username', 'jamesyang1025');

        this.ApiGetRepos(username);
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
            rightIcon={{name: 'star'}}
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
});